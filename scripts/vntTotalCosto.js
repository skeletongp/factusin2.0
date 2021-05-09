const Swal = require('sweetalert2');
const data = require('../data/inventario');
const path = require('path');
const csv = require('jquery-csv');
const modalCat = require(path.join(__dirname, '../', 'scripts', 'componentes', 'modalCategorias.js'));

const menu = require(path.join(__dirname, '../', 'scripts', 'componentes', 'menubar.js'));

//Cargar el Nav Menu, cambiar título y mostrar botón back
window.addEventListener('load', () => {

  document
    .getElementById('menuBar')
    .innerHTML = menu;

  document
    .getElementById('spanTitulo')
    .innerText = "Inventario General";
  let btnBack = document.getElementById('btnBack');
  btnBack.style.display = 'block';
  //Evento change al escribir el nombre Función tecla Ctrl+Backspace
  $(document).keydown((e) => {
    // ESCAPE key pressed
    if (e.keyCode == 8 && e.ctrlKey) {
      require('electron')
        .ipcRenderer
        .send('goBack', "Segundo argumento");
    }
  });

  // Formatea los valores a tipo moneda
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'

  });

  //Cargar datos iniciales
  getAllProductos();
  //Opciones de paginación
  let options = {
    'language': {
      "decimal": "",
      "emptyTable": "No se encontraron productos",
      "info": "Mostrando de _START_ a _END_ de _TOTAL_ productos",
      "infoEmpty": "Mostrando 0 de 0 productos",
      "infoFiltered": "(filtrado de _MAX_ productos en total)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "Mostrar _MENU_ productos",
      "loadingRecords": "Cargando...",
      "processing": "Procesando...",
      "search": "Buscar ",
      "zeroRecords": "Sin coincidencias",
      "paginate": {
        "first": "Inicio",
        "last": "Fin",
        "next": "Siguiente >",
        "previous": "< Anterior"
      },
      "aria": {
        "sortAscending": ": activate to sort column ascending",
        "sortDescending": ": activate to sort column descending"
      }
    },
    'formOptions': {
      'inline': {
        'onBlur': true
      }
    },
    'lengthMenu': [
      [
        10, 25, 50, -1
      ],
      [10, 25, 50, 'Todos']
    ],
    'columns': [
      {
        'orderable': false
      },
      null,
      null,
      null,
      null,
      null
    ],
    "order": [1, 'asc']
  }
  $("#cargando").show();

  //Cargar todos los productos
  function getAllProductos() {
    let tbcuerpo = document.getElementById('tbcuerpo');
    let totalPrecio = 0;
    let totalCosto = 0;
    let totalUtilidad = 0;
    data
      .productos()
      .then(row => {
        tbcuerpo.innerHTML = null;

        Object
          .values(row)
          .map(producto => {
            if (producto.Tipo === 'Producto' && producto.Existencia > 0) {
              //Crear elementos para la tabla
              let tr = document.createElement('tr');
              let td1 = document.createElement('td');
              let td2 = document.createElement('td');
              let td3 = document.createElement('td');
              let td3a = document.createElement('td');
              let td4 = document.createElement('td');
              let td5 = document.createElement('td');

              // Asignación de estilo y valores
              td3.setAttribute('role', 'button')
              td3.setAttribute('data-trigger', 'hover');
              td3.setAttribute('data-toggle', 'popover');
              td3.setAttribute('title', formatter.format(producto.Precio));
             
              td3a.setAttribute('role', 'button')
              td3a.setAttribute('data-toggle', 'popover');
              td3a.setAttribute('data-trigger', 'hover');
              td3a.setAttribute('title', 'Costo por Unidad');
              td3a.setAttribute('data-content', formatter.format(producto.Costo));
              
              td5.setAttribute('role', 'button')
              td5.setAttribute('data-toggle', 'popover');
              td5.setAttribute('data-trigger', 'hover');
              td5.setAttribute('title', 'En existencia');
              td5.setAttribute('data-content', producto.Existencia);
              
              td1.innerText = producto.Codigo;
              td2.innerText = producto.Producto;
              td3.innerText = formatter.format(producto.Precio * producto.Existencia);
              td3a.innerText = formatter.format(producto.Costo * producto.Existencia);
              td4.innerText = producto.Categoria;
              td5.innerText = formatter.format((producto.Precio - producto.Costo) * producto.Existencia);

              //Añadiendo elementos a la fila y esta al cuerpo de la table
              tr.appendChild(td1);
              tr.appendChild(td2);
              tr.appendChild(td4);
              tr.appendChild(td3);
              tr.appendChild(td3a);
              tr.appendChild(td5);
              tbcuerpo.appendChild(tr);

              // Asigna fondos diferentes a filas pares e impares Recorre la tabla y
              // centraliza
              // todos los td
              $('#tablaProducto > tbody  > tr > td').each(function (index, td) {
                td.setAttribute('style', 'width:fit-content;text-align:center; -webkit-user-select:none');

              });
              totalPrecio += (producto.Precio * producto.Existencia);
              totalCosto += (producto.Costo * producto.Existencia);
              totalUtilidad += (producto.Precio - producto.Costo)*producto.Existencia;
            }
          });
        document
          .getElementById('totalPrecio')
          .innerText = formatter.format(totalPrecio);
        document
          .getElementById('totalCosto')
          .innerText = formatter.format(totalCosto);
        document
          .getElementById('totalUtilidad')
          .innerText = formatter.format(totalUtilidad);
        document
          .getElementById('totalPrecio')
          .setAttribute('style', 'font-weight:bold; text-align:center');
        document
          .getElementById('totalCosto')
          .setAttribute('style', 'font-weight:bold; text-align:center');
        document
          .getElementById('totalUtilidad')
          .setAttribute('style', 'font-weight:bold; text-align:center');
        document
          .getElementById('lbTotal')
          .setAttribute('style', 'font-weight:bold; text-align:center; font-size:large');
        //Paginar tabla (condición para no recargar paginación)
        if ($.fn.dataTable.isDataTable('#tablaProducto') == false) {
          $('#tablaProducto').DataTable(options);
        }
  $("#cargando").hide();

        document
          .querySelector('#tablaProducto_filter')
          .style
          .display = 'flex'
        document
          .querySelector('#tablaProducto_filter input')
          .className += 'shadow-lg'
        document
          .querySelector('#tablaProducto_filter label')
          .className = 'text-info font-weight-bold';

      });


  };

})
