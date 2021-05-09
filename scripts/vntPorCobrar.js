const Swal = require("sweetalert2");
const data = require("../data/porCobrar");
const factura= require('../data/facturas')
const path = require("path");
const csv = require("jquery-csv");
const  clientes  = require("../data/clientes");
const modalCat = require(path.join(
  __dirname,
  "../",
  "scripts",
  "componentes",
  "modalCategorias.js"
));

const menu = require(path.join(
  __dirname,
  "../",
  "scripts",
  "componentes",
  "menubar.js"
));

let today = new Date(Date.now());
today = today.toLocaleDateString();
let restante=0;
let clienteId;
let monto;
let ruta;
//Cargar el Nav Menu, cambiar título y mostrar botón back
window.addEventListener("load", () => {
  document.getElementById("menuBar").innerHTML = menu;

  document.getElementById("spanTitulo").innerText = "Cuentas por Cobrar";
  let btnBack = document.getElementById("btnBack");
  btnBack.style.display = "block";
  //Evento change al escribir el nombre Función tecla Ctrl+Backspace
  $(document).keydown((e) => {
    // ESCAPE key pressed
    if (e.keyCode == 8 && e.ctrlKey) {
      require("electron").ipcRenderer.send("goBack", "Segundo argumento");
    }
  });

  // Formatea los valores a tipo moneda
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  //Cargar datos iniciales
  getAllCuentas();

  //Opciones de paginación
  let options = {
    language: {
      decimal: "",
      emptyTable: "No se encontraron facturas",
      info: "Mostrando de _START_ a _END_ de _TOTAL_ facturas",
      infoEmpty: "Mostrando 0 de 0 productos",
      infoFiltered: "(filtrado de _MAX_ facturas en total)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ facturas",
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
    columns: [null, null, null, null,{ orderable: false }],
  };
  $("#cargando").show();

  //Cargar todos los productos
  function getAllCuentas() {
    let tbcuerpo = document.getElementById("tbcuerpo");
    data.cuentas().then((row) => {
      tbcuerpo.innerHTML = null;
      Object.values(row).map((cuenta) => {
        if (cuenta.Restante > 0) {

          //Crear elementos para la tabla
          let tr = document.createElement("tr");
          let td1 = document.createElement("td");
          let td2 = document.createElement("td");
          let td3 = document.createElement("td");
          let td3a = document.createElement("td");
          let td4 = document.createElement("td");
          let cobrar = document.createElement("a");

          // Asignación de estilo y valores
          td4.setAttribute("role", "button");
          td4.setAttribute("data-trigger", "hover");
          td4.setAttribute("data-toggle", "popover");
          td4.setAttribute("title", "Abrir Factura");

          cobrar.className = "text-info";
          cobrar.innerText = "Cobrar";
          cobrar.setAttribute("style", "font-weight: bold");
          cobrar.setAttribute('data-toggle','modal');
          cobrar.setAttribute('data-target','#modalCobrar')
          cobrar.addEventListener("click", () => {
           $('#tituloModal').text(cuenta.Cliente);
           $('#dInicial').val(formatter.format(cuenta.Monto));
           $('#dRestante').val(formatter.format(cuenta.Restante));
           $('#hideId').val('a'+cuenta.CuentaId);
           $('#hideClienteId').val('a'+cuenta.ClienteId);
            restante=cuenta.Restante;
          });
          td1.innerText = cuenta.Fecha;
          td2.innerText = cuenta.Cliente;
          td3.innerText = formatter.format(cuenta.Monto);
          td3a.innerText = formatter.format(cuenta.Restante);
          td4.appendChild(cobrar);

          //Añadiendo elementos a la fila y esta al cuerpo de la table
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td3a);
          tr.appendChild(td4);
          tbcuerpo.appendChild(tr);

          // Asigna fondos diferentes a filas pares e impares Recorre la tabla y
          // centraliza
          // todos los td
          $("#tablaProducto > tbody  > tr > td").each(function (index, td) {
            td.setAttribute(
              "style",
              "width:fit-content;text-align:center; -webkit-user-select:none"
            );
          });
        }
      });
      if ($.fn.dataTable.isDataTable("#tablaProducto") == false) {
        $("#tablaProducto").DataTable(options);
      }
      $("#cargando").hide();

      document.querySelector("#tablaProducto_filter").style.display = "flex";
      document.querySelector("#tablaProducto_filter input").className +=
        "shadow-lg";
      document.querySelector("#tablaProducto_filter label").className =
        "text-info font-weight-bold";
    });
  }
  $('#cobrarCuenta').on('click',function () {
   $('#formCuenta').trigger('submit');
  })
  $('#formCuenta').on('submit', function (e) {
    e.preventDefault();
    Swal.fire({
      title:'¿Cobrar el monto ingresado?',
      confirmButtonText:'Proceder',
      cancelButtonText: 'Cancelar',
      showCancelButton: 'true'
    }).then(result=>{
      if(result.isConfirmed){
        cobrarDeuda();
      }
    })
  })

  function cobrarDeuda() {
    let monto=$('#dMonto').val();
    let cuentaId=$('#hideId').val().substr(1);
    let clienteId=$('#hideClienteId').val().substr(1);
    if(monto>0 && monto<=restante){
      data.cuentas().then((row)=>
      {
      Object.values(row).map(cuenta=>{
          if(cuenta.CuentaId==cuentaId){
            guardarTicket(cuenta);
          }
        })
   
    });
      let datosCuenta=[monto, cuentaId];
      data.cobrarCuenta(datosCuenta);
      datosCuenta=[monto, clienteId];
      
    
      setTimeout(() => { 
        clientes.bajarDeuda(datosCuenta);
      }, 1000);
      
 
     
    }else{
      Swal.fire(`${monto} no es una cantidad válida`)
    }
  }
  function guardarTicket(cuenta) {
    clienteId=cuenta.ClienteId;
    monto=$('#dMonto').val();
    var element = `   <div class="m-auto" style="width: 25rem;">
    <table class="table  table-sm ">
      <thead class="" class="text-center">
        <tr class="text-center">
         <th class="p-2" scope="col" colspan="4" style="font-size: xx-large; font-weight: bold;">Ticket de pago</th>
        </tr>
      </thead>
      <tr style="height: 2.5rem;"></tr>

      <tbody>
        <tr> 
          <th scope="col" colspan="3"  >
          <span style="font-size: x-large; "> ${cuenta.Cliente}</span> <br>
          <span style="font-size: large; ">${cuenta.Telefono}</span> <br>
          <span style="font-size: large; ">${cuenta.Direccion}</span> <br>
         </th>
         <th class="text-right">
           <span >${today}</span> <br>
           <span>Cod. Cliente:</span><br>
           <span>${cuenta.Codigo}</span>
         </th>
        </tr>
        <tr style="height: 1.5rem;"></tr>
        <tr style="border-top: 1.5px solid silver">
          <td colspan="2" style="font-weight:bold;">Deuda Inicial</td>
          <td colspan="2" class="text-right ">${formatter.format(cuenta.Monto)}</td>
        </tr>
        <tr>
          <td colspan="2" style="font-weight:bold;">Deuda Actual</td>
          <td colspan="2" class="text-right">${formatter.format(cuenta.Restante)}</td>
        </tr>
        <tr style="height: 1.5rem;"></tr>

        <tr style="border-top: 1.5px solid silver">
          <td colspan="2" style="font-weight:bold;">Monto Abonado</td>
          <td colspan="2" class="text-right">${formatter.format($('#dMonto').val())}</td>
        </tr>
        <tr>
          <td colspan="2" style="font-weight:bold;">Saldo Restante</td>
          <td colspan="2" class="text-right" style="font-weight: bold; text-decoration: underline;">${formatter.format(cuenta.Restante-$('#dMonto').val())}</td>
        </tr>
      </tbody>
    </table>
    <style>
    tr{
      border: none;
    }
    </style>
  </div>`
  var filename =
    cuenta.Codigo +
    "_" +
    'recu_'+
    today +
    "_" +
    Math.ceil(Math.random(4) * 10) +
    Math.random(4);
    filename=filename.replace('.','_');
  var opt = {
    margin: [0,0,0.3,0],
    filename: filename,
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 4 },
   
    jsPDF: {
      unit: "in",
      format: "letter",
      orientation: "portrait",
    },
  };
  html2pdf().set(opt).from(element).save();
  ruta =filename;
  guardarRecurrente();
imprimirTicket(element)
  }
  
  
  
  function imprimirTicket(elem)
  {
    let divTicket= document.getElementById('divTicket');
  divTicket.innerHTML=elem;
     $('#divTicket').print();
     setTimeout(() => {
      Swal.fire({
        title:'Ticket Guardado',
        icon:'success'
      }).then(()=>{
        require("electron").ipcRenderer.send("goBack", "arg");
      })
    }, 1500);
  }
  function guardarRecurrente() {
    let datosRecurrente=[clienteId, monto, today, ruta]
    factura.insertarRecurrente(datosRecurrente);
  }
});
