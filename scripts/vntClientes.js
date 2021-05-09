const Swal = require("sweetalert2");
const data = require("../data/clientes");
const tjtCliente = require("../scripts/componentes/tarjetaCliente.js");
const tbCliente = require("../scripts/componentes/tablaClientes");
const modalCliente = require("../scripts/componentes/modalAddCliente.js");
const modalEditCliente = require("../scripts/componentes/modalEditCliente");

const path = require("path");
const csv = require("jquery-csv");
const menu = require(path.join(
  __dirname,
  "../",
  "scripts",
  "componentes",
  "menubar.js"
));


const modalCat = require(path.join(
  __dirname,
  "../",
  "scripts",
  "componentes",
  "modalCategorias.js"
));

let options = {
  language: {
    decimal: "",
    emptyTable: "No se encontraron clientes",
    info: "Mostrando de _START_ a _END_ de _TOTAL_ clientes",
    infoEmpty: "Mostrando 0 de 0 clientes",
    infoFiltered: "(filtrado de _MAX_ clientes en total)",
    infoPostFix: "",
    thousands: ",",
    lengthMenu: "Mostrar _MENU_ clientes",
    loadingRecords: "Cargando...",
    processing: "Procesando...",
    search: "Buscar ",
    zeroRecords: "Sin coincidencias",
    paginate: {
      first: "Inicio",
      last: "Fin",
      next: "Siguiente >",
      previous: "< Anterior",
    },
    aria: {
      sortAscending: ": activate to sort column ascending",
      sortDescending: ": activate to sort column descending",
    },
  },
  formOptions: {
    inline: {
      onBlur: true,
    },
  },
  lengthMenu: [
    [10, 25, 50, -1],
    [10, 25, 50, "Todos"],
  ],
  columns: [
  
    null,
    null,
    null,
    null,
    null,
    {
      orderable: false,
    },
    {
      orderable: false,
    },
  ],
  order: [1, "asc"],
};

// Formatea los valores a tipo moneda
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

//Cargar estáticos

document.getElementById("menuBar").innerHTML = menu;
document.getElementById("spanTitulo").innerText = "Clientes- Listado general";
$('[data-toggle="popover"]').popover();
let btnBack = document.getElementById("btnBack");
btnBack.style.display = "block";
document.getElementById("divInsertar").innerHTML = modalCliente;
document.getElementById("modalEditar").innerHTML = modalEditCliente;

//Cargar Clientes
function cargarClientes(keyword) {
  let contentDiv = document.getElementById("contentDiv");
  contentDiv.innerHTML = null;
  data.clientes(keyword).then((row) => {
    Object.values(row).map((cliente) => {
      if (diasActivo(cliente.LastBuy) < 1601 && cliente.Estado!=='Borrado') {

    tbCliente.llenarTabla(cliente, tbcuerpo, formatter);
      }
    });
    //Paginar tabla (condición para no recargar paginación)

      if ($.fn.dataTable.isDataTable("#tablaCliente") == false) {
        $("#tablaCliente").DataTable(options);

        }
      
  });
  
}
function diasActivo(ultimaCompra) {
  let lastBuy = new Date(ultimaCompra);
  let today = new Date(Date.now());
  let diferencia = Math.abs(today - lastBuy);
  let dias = diferencia / (1000 * 3600 * 24);
  return Math.round(dias);
}


function Borrar(id) {
  alert(id);
}
function Editar(id) {
  $("#modalEditarCliente").modal("show");
  cargarModal(id);
}

cargarClientes(" ");

//Calcular código del proveedor
let lastIndex = 0;
function newCode(name) {
  name = name.substring(0, 3);
  name = name.toUpperCase();
  data.clientes(" ").then((response) => {
    response.map((cliente) => {
      if (cliente.ClienteId > lastIndex) {
        lastIndex = cliente.ClienteId;
      }
    });
    lastIndex++;
    $("#codigo").val(name + lastIndex);
  });
}
//Confirmar registro de cliente
function confirmarRegistro(formData, proveedor) {
  Swal.fire({
    title: "¿Todo Correcto?",
    text: "Registrar el cliente ingresado",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Continuar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      data.insertarCliente(formData);
      Swal.fire({
        title: proveedor + " registrado",
        text: "El cliente se ha registrado con éxito",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          require("electron").ipcRenderer.send("reloadClient", "arg");
        }
      });
    }
  });
}
$("input").each(function () {
  $(this).attr("style", "text-align:center");
});

//Cargar modal de Edición
function cargarModal(id) {
  data.unCliente(id).then((row) => {
    Object.values(row).map((cliente) => {
      $("#ecodigo").val(cliente.Codigo);
      $("#enombre").val(cliente.Cliente);
      $("#etelefono").val(cliente.Telefono);
      $("#ecorreo").val(cliente.Correo);
      $("#edireccion").val(cliente.Direccion);
      $("#enota").val(cliente.Nota), $("#eid").val(cliente.ClienteId);
    });
  });
}

$("#cargando").hide();

//Evento change al escribir el nombre
document.getElementById("nombre").addEventListener("change", function (e) {
  let nombre = e.target.value;
  newCode(nombre);
});

//Insertar registro con el submit del form
var form = document.getElementById("formInsertar");
var frm = $("#formInsertar");
try {
  frm.on("submit", (e) => {
    e.preventDefault();

    var formData = [
      $("#codigo").val().toString(),
      $("#nombre").val().toString(),
      $("#telefono").val(),
      $("#direccion").val(),
      $("#correo").val(),
      $("#nota").val(),
      0,
      $("#fecha").val().replaceAll("-", "/"),
      $("#fecha").val().replaceAll("-", "/"),
    ];
    confirmarRegistro(formData, $("#codigo").val().toString());
  });
} catch (error) {
  console.log(error);
}
//Editar registro con el submit del form
$("#modalEditar").on("submit", (e) => {
  e.preventDefault();
  let formData = [
    $("#enombre").val(),
    $("#etelefono").val(),
    $("#ecorreo").val(),
    $("#edireccion").val(),
    $("#enota").val(),
    $("#eid").val(),
  ];
  Swal.fire({
    title: "¿Desea editar el cliente?",
    text: "Confirme si desea actualizar estos datos.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Continuar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      data.editarCliente(formData);
      Swal.fire({
        title: "Registro actualizado",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          require("electron").ipcRenderer.send("reloadClient", "arg");
        }
      });
    }
  });
});
function Borrar(id) {
  Swal.fire({
    title: "¿Desea eliminar el cliente?",
    text: "Los datos relacionados con el cliente no se perderán",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Continuar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      data.borrarCliente(id);
      Swal.fire({
        title: "Cliente Eliminado",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          require("electron").ipcRenderer.send("reloadClient", "arg");
        }
      });
    }
  });
}

