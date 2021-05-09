const Swal = require("sweetalert2");
const data = require("../data/facturas");
const path = require("path");
const csv = require("jquery-csv");
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

//Cargar el Nav Menu, cambiar título y mostrar botón back
window.addEventListener("load", () => {
  document.getElementById("menuBar").innerHTML = menu;

  document.getElementById("spanTitulo").innerText = "Facturas Guardadas";
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
  getAllFacturas();

  //Opciones de paginación
  let options = {
    order:[],
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
    columns: [null, null, null,{ orderable: false }],
  };
  $("#cargando").show();

  //Cargar todos los productos
  function getAllFacturas() {
    let tbcuerpo = document.getElementById("tbcuerpo");
    data.facturas().then((row) => {
      tbcuerpo.innerHTML = null;

      Object.values(row).map((factura) => {
        if (factura.FacturaId > 0) {
          //Crear elementos para la tabla
          let tr = document.createElement("tr");
          let td1 = document.createElement("td");
          let td2 = document.createElement("td");
          let td3 = document.createElement("td");
          let td4 = document.createElement("td");
          let abrir = document.createElement("a");

          // Asignación de estilo y valores
          td4.setAttribute("role", "button");
          td4.setAttribute("data-trigger", "hover");
          td4.setAttribute("data-toggle", "popover");
          td4.setAttribute("title", "Abrir Factura");

          abrir.className = "text-info";
          abrir.innerText = "Abrir";
          abrir.setAttribute("style", "font-weight: bold");
          abrir.addEventListener("click", () => {
            var opciones =
              "menubar=no,location=yes,resizable=yes,scrollbars=yes,status=yes,frame=true";
            window.open(
              path
                .join(
                  __dirname,
                  "../",
                  "scripts",
                  "facturas",
                  factura.Ruta.replaceAll("/", "_")
                )
                .replace(/\\/g, "/"),
              factura.Ruta,
              opciones
            );
          });
          td1.innerText = factura.Fecha;
          td2.innerText = factura.Cliente;
          td3.innerText = formatter.format(factura.Monto);
          td4.appendChild(abrir);

          //Añadiendo elementos a la fila y esta al cuerpo de la table
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
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
});
