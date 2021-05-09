const Swal = require("sweetalert2");
const data = require("../data/inventario");
const llenarTabla = require("../scripts/componentes/tablaProductos.js");
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
const modalAddProduct = require(path.join(
  __dirname,
  '../',
  "scripts",
  "componentes",
  "modalAddProduct.js"
));
const modalEditProduct = require(path.join(
  __dirname,
  '../',
  "scripts",
  "componentes",
  "modalEditProduct.js"
));

let hoy = new Date(Date.now());
hoy = hoy.toLocaleDateString("en-ZA");

let aBorrar = [];
let haySeleccionado = false;

//Cargar el Nav Menu, cambiar título y mostrar botón back
window.addEventListener("load", () => {
  document.getElementById("menuBar").innerHTML = menu;

  document.getElementById("modalAgregar").innerHTML = modalAddProduct;
  document.getElementById("modalActualizar").innerHTML = modalEditProduct;
  document.getElementById("spanTitulo").innerText = "Productos en inventario ";

  let btnBack = document.getElementById("btnBack");
  btnBack.style.display = "block";
  //Evento change al escribir el nombre
  document.getElementById("nombre").addEventListener("change", function (e) {
    let nombre = e.target.value;
    newCode(nombre);
  });

  //Función tecla Ctrl+Backspace
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

  //Opciones de paginación
  let options = {
    language: {
      decimal: "",
      emptyTable: "No se encontraron productos",
      info: "Mostrando de _START_ a _END_ de _TOTAL_ productos",
      infoEmpty: "Mostrando 0 de 0 productos",
      infoFiltered: "(filtrado de _MAX_ productos en total)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ productos",
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
      {
        orderable: false,
      },
      null,
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
    order: [2, "asc"],
  };
  //Cargar todos los productos
  function getAllProductos() {
    let tbcuerpo = document.getElementById("tbcuerpo");
    data.productos().then((row) => {
      tbcuerpo.innerHTML = null;

      Object.values(row).map((producto) => {
        if (producto.Tipo === "Producto" && producto.Existencia > 0) {
          llenarTabla.llenarTabla(producto, tbcuerpo, formatter, abrirEdicion, preguntarBorrar);
        }

      });
      $("#cargando").hide();

      //Paginar tabla (condición para no recargar paginación)
      if ($.fn.dataTable.isDataTable("#tablaProducto") == false) {
        $("#tablaProducto").DataTable(options);
      }
      let searchIcon = `<span class="iconify" data-icon="dashicons:search" data-inline="true" style="font-size:x-large"></span>`;
      document.querySelector("#tablaProducto_filter").style.display = "flex";
      document.querySelector("#tablaProducto_filter input").className +=
        "shadow-lg";
      document.querySelector("#tablaProducto_filter label").className =
        "text-info font-weight-bold";
      document
        .querySelector("#tablaProducto_filter label")
        .setAttribute("style", "font-weight: bold; font-size: large");
    });

  }

  //Abrir input file
  $("#subirCSV").on("click", function () {
    $("#file-input").trigger("click");
  });

  //Evento de cuando se elige un archivo
  $("#file-input").on("input", (e) => {
    require("jquery").ajax({
      url: $("#file-input")[0].files[0].path,
      dataType: "text",
      success: (data) => {
        leerArchivo(data);
      },
    });
  });

  require("electron").ipcRenderer.on("subirProductos", (e, arg) => {
    $("#subirCSV").trigger("click");
  });

  function leerArchivo(dato) {
    let contenido = $.csv.toArrays(dato, {
      delimite: "´",
      separator: ";",
    });
    data.insertarVariosProducto(contenido);
    Swal.fire({
      title: "Productos añadidos",
      text: "Se han agregado " + contenido.length + " productos al inventario",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        require("electron").ipcRenderer.send("reloadProduct", "arg");
      }
    });
  }

  //Validar si hay un producto marcado
  function productoMarcado(chk) {
    let selects = document.querySelectorAll(".chkbox");
    aBorrar = [];
    selects.forEach((element) => {
      if (element.checked) {
        aBorrar.push(element.getAttribute("id").substr(1));
      }
    });
    ValidarBorrarTodos();
    if (haySeleccionado) {
      document.getElementById("btnBorrarTodo").style.display = "inline";
      document.getElementById("cantSel").innerText = aBorrar.length;
    } else {
      document.getElementById("btnBorrarTodo").style.display = "none";
      document.getElementById("cantSel").innerText = "";
    }
  }
  $("#btnBorrarTodo").on("click", () => {
    borrarTodo();
  });

  //Seleccionar todos los productos
  $("#selTodo").on("click", (e) => {
    let chkbox = document.querySelectorAll(".chkbox");
    let state = document.getElementById("selTodo").checked;
    chkbox.forEach((element) => {
      element.checked = state;
    });
    ValidarBorrarTodos();
    if (haySeleccionado) {
      document.getElementById("btnBorrarTodo").style.display = "inline";
    } else {
      document.getElementById("btnBorrarTodo").style.display = "none";
    }
    productoMarcado();
  });
  //Borrar todo
  function borrarTodo() {
    Swal.fire({
      title: "¿Desea eliminar los productos eliminados?",
      text: "Una vez borrados, no podrá recuperarlo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        data.borrarVariosProducto(aBorrar);
        Swal.fire({
          title: "Producto borrado",
          text: "El producto se ha eliminado del inventario",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            require("electron").ipcRenderer.send("reloadProduct", "arg");
          }
        });
      }
    });
  }

  //Activiar/Desactivar botón de Borrar Todos
  function ValidarBorrarTodos() {
    let selects = document.querySelectorAll(".chkbox");
    haySeleccionado = false;
    selects.forEach((element) => {
      if (element.checked) {
        haySeleccionado = true;
      }
    });
  }

  //Cargar Categorias
  function getAllCategories() {
    data.categorias.then((row) => {
      let selCat = document.getElementById("categoria");
      let selCat2 = document.getElementById("ecategoria");
      row.map((cat) => {
        let opt = document.createElement("option");
        opt.value = cat.CategoriaId;
        opt.innerText = cat.Categoria;
        selCat.appendChild(opt);
        let opt1 = document.createElement("option");
        opt1.value = cat.CategoriaId;
        opt1.innerText = cat.Categoria;
        selCat2.appendChild(opt1);
      });
    });
  }

  //Cargar proveedores
  function getAllProviders() {
    data.proveedores.then((row) => {
      let selProv = document.getElementById("proveedor");
      let selProv2 = document.getElementById("eproveedor");
      row.map((prov) => {
        let opt = document.createElement("option");
        opt.value = prov.ProveedorId;
        opt.innerText = prov.Proveedor;
        selProv.appendChild(opt);
        let opt1 = document.createElement("option");
        opt1.value = prov.ProveedorId;
        opt1.innerText = prov.Proveedor;
        selProv2.appendChild(opt1);
      });
    });
  }

  // Confirmar borrado de producto
  function preguntarBorrar(producto) {
    Swal.fire({
      title: "¿Desea eliminar el producto?",
      text: "Una vez borrado, no podrá recuperarlo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        data.borrarProducto(producto);
        Swal.fire({
          title: "Producto borrado",
          text: "El producto se ha eliminado del inventario",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            require("electron").ipcRenderer.send("reloadProduct", "arg");
          }
        });
      }
    });
  }

  //Confirmar Edición de producto
  function preguntarEditar(formData, producto) {
    Swal.fire({
      title: "¿Desea editar el producto?",
      text: "Confirme que desea editar los datos del producto",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        data.editarProducto(formData);
        Swal.fire({
          title: producto + " actualizado",
          text: "El producto se ha actualizado con éxito",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            require("electron").ipcRenderer.send("reloadProduct", "arg");
          }
        });
      }
    });
  }

  //Confirmar registro de producto
  function confirmarRegistro(formData, producto) {
    Swal.fire({
      title: "¿Todo Correcto?",
      text: "Registrar el producto ingresado",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        data.insertarProducto(formData);
        Swal.fire({
          title: producto + " registrado",
          text: "El producto se ha registrado con éxito",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            form.reset();
            require("electron").ipcRenderer.send("reloadProduct", "arg");
          }
        });
      }
    });
  }

  //Mostrar modal de edición
  function abrirEdicion(e) {
    data.unProducto(e).then((result) => {
      result.map((producto) => {
        $("#eid").val(producto.ProductoId);
        $("#enombre").val(producto.Producto);
        $("#eprecio").val(producto.Precio);
        $("#ecodigo").val(producto.Codigo);
        $("#ecosto").val(producto.Costo);
        $(`#eproveedor option:contains(${producto.Proveedor})`).prop(
          "selected",
          true
        );
        $(`#ecategoria option:contains(${producto.Categoria})`).prop(
          "selected",
          true
        );
        $(`#etipo option:contains(${producto.Tipo})`).prop("selected", true);
        $("#eexistencia").val(producto.Existencia);
        $("#enota").val(producto.Nota);
      });
    });
  }

  //Calcular código del producto
  let lastIndex = 0;
  function newCode(name) {
    name = name.substring(0, 3);
    name = name.toUpperCase();
    data.productos().then((response) => {
      response.map((prod) => {
        if (prod.ProductoId > lastIndex) {
          lastIndex = prod.ProductoId;
        }
      });
      $("#codigo").val(name + lastIndex);
    });
  }

  //Insertar registro con el submit del form
  var form = document.getElementById("formInsertar");
  var frm = $("#formInsertar");
  try {
    frm.on("submit", (e) => {
      e.preventDefault();

      var formData = [
        $("#codigo").val().toString(),
        $("#nombre").val().toString(),
        $("#precio").val(),
        $("#costo").val(),
        $("#categoria").val().toString(),
        $("#proveedor").val(),
        $("#existencia").val(),
        $("#nota").val().toString(),
        "Producto",
        hoy,
      ];
      confirmarRegistro(formData, $("#codigo").val().toString());
    });
  } catch (error) {
    console.log(error);
  }

  //Editar registro con el submit del form
  var frm2 = $("#formEditar");
  let form2 = document.getElementById("formEditar");
  try {
    frm2.on("submit", function (e) {
      e.preventDefault();

      var formData = [
        $("#ecodigo").val().toString(),
        $("#enombre").val().toString(),
        $("#eprecio").val(),
        $("#ecosto").val(),
        $("#ecategoria").val().toString(),
        $("#eproveedor").val(),
        $("#eexistencia").val(),
        $("#enota").val().toString(),
        $("#etipo").val().toString(),
        $("#eid").val(),
      ];

      preguntarEditar(formData, $("#ecodigo").val().toString());

      $("#modalEditar").modal("hide");
    });
  } catch (error) {
    console.log(error);
  }
  $("#cargando").show();
 setTimeout(() => {
  getAllProductos();
  getAllCategories();
  getAllProviders();
 }, 500);
});
