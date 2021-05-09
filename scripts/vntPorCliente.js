const Swal = require("sweetalert2");
const data = require("../data/ventas");
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

  document.getElementById("spanTitulo").innerText = "Ventas Realizadas";
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
    order: [[0, 'asc']],
    language: {
      decimal: "",
      emptyTable: "No se encontraron registros",
      info: "Mostrando de _START_ a _END_ de _TOTAL_ registros",
      infoEmpty: "Mostrando 0 de 0 registros",
      infoFiltered: "(filtrado de _MAX_ registros en total)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar _MENU_ registros",
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
    columns: [null, null, null, null,null],
  };
  $("#cargando").show();

  //Cargar todos los productos
  function getAllFacturas() {
    let tbcuerpo = document.getElementById("tbcuerpo");
    data.ventasPorCliente().then((row) => {
      tbcuerpo.innerHTML = null;

      Object.values(row).map((venta) => {
        if (venta.VentaId > 0) {
          //Crear elementos para la tabla
          let tr = document.createElement("tr");
          let td1 = document.createElement("td");
          let td1a = document.createElement("td");
          let td2 = document.createElement("td");
          let td3 = document.createElement("td");
          let td4 = document.createElement("td");
         
          td1.innerText = venta.Cliente;
          td1a.innerText=formatter.format(venta.Total);
          td2.innerText = formatter.format(venta.Pagado);
          td3.innerText = formatter.format(venta.Debido);
          td4.innerText=formatter.format(venta.Impuesto);
         
          //Añadiendo elementos a la fila y esta al cuerpo de la table
          tr.appendChild(td1);
          tr.appendChild(td1a);
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
  function verDetalles(venta) {
      $('#mTitulo').text(venta.Cliente);
      $('#mFecha').text(venta.Fecha);
      $('#mTotal').text(formatter.format(venta.Total));
      $('#mImpuesto').text(formatter.format(venta.Impuesto));
      $('#mSubtotal').text(formatter.format(venta.Subtotal));
      $('#mPagado').text(formatter.format(venta.Pagado));
      $('#mDebe').text(formatter.format(venta.Debido));
     
  }
});
