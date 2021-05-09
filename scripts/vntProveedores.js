const Swal = require('sweetalert2');
const data = require('../data/proveedores.js')
const path = require('path');
const menu = require(path.join(__dirname, '../', 'scripts', 'componentes', 'menubar.js'));
const modalCat = require(path.join(__dirname, '../', 'scripts', 'componentes', 'modalCategorias.js'));
const modalAddProvider = require(path.join(__dirname, '../', 'scripts', 'componentes', 'modaladdProvider.js'));
const modalEditProvider = require(path.join(__dirname, '../', 'scripts', 'componentes', 'modalEditProvider.js'));

let aBorrar = [];
let haySeleccionado = false;

//Cargar el Nav Menu, cambiar título y mostrar botón back
window.addEventListener('load', () => {

  document
    .getElementById('menuBar')
    .innerHTML = menu;
  document
    .getElementById('modalInsert')
    .innerHTML = modalAddProvider;
  document
    .getElementById('modalEdit')
    .innerHTML = modalEditProvider;
  document
    .getElementById('modalCat')
    .innerHTML = modalCat;
  document
    .getElementById('spanTitulo')
    .innerText = "Listado de proveedores ";
  let btnBack = document.getElementById('btnBack');
  btnBack.style.display = 'block';

  //Evento change al escribir el nombre
  document
    .getElementById('nombre')
    .addEventListener('change', function (e) {
      let nombre = e.target.value;
      newCode(nombre);
    })

  //Función tecla Ctrl+Backspace
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
  getAllProviders();

  //Opciones de paginación
  let options = {
    'language': {
      "decimal": "",
      "emptyTable": "No se encontraron contactos",
      "info": "Mostrando de _START_ a _END_ de _TOTAL_ proveedores",
      "infoEmpty": "Mostrando 0 de 0 proveedores",
      "infoFiltered": "(filtrado de _MAX_ proveedores en total)",
      "infoPostFix": "",
      "thousands": ",",
      "lengthMenu": "Mostrar _MENU_ proveedores",
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
      null, {
        'orderable': false
      }, {
        'orderable': false
      }
    ],
    "order": [2, 'asc']
  }
  //Cargar todos los proveedors
  function getAllProviders() {
    let tbcuerpo = document.getElementById('tbcuerpo');
    data
      .proveedores()
      .then(row => {
        tbcuerpo.innerHTML = null;

        Object
          .values(row)
          .map(proveedor => {
            if (diasActivo(proveedor.LastBuy) < 61) {
              //Crear elementos para la tabla
              let tr = document.createElement('tr');
              let td0 = document.createElement('td');
              td0.className = "bg-dark text-light";
              td0.setAttribute('scope', 'row');
              let id = "a" + proveedor.ProveedorId
              tr.id = id;
              let select = document.createElement('input')
              select.setAttribute('type', 'checkbox');
              select.className = 'chkbox';
              select.setAttribute('id', "a" + proveedor.ProveedorId);
              select.addEventListener('change', (e) => {
                proveedorMarcado(e.target);

              })
              select.setAttribute('role', 'button')

              let td1 = document.createElement('td');
              let td2 = document.createElement('td');
              let td3 = document.createElement('td');
              let td4 = document.createElement('td');
              let td5 = document.createElement('td');
              let td6 = document.createElement('td');
              let td7 = document.createElement('td');
              let btn2 = document.createElement('a');
              let btn = document.createElement('a');

              btn.className = " text-danger p-1";
              btn.innerText = "Eliminar"
              btn.addEventListener('click', () => {
                preguntarBorrar(proveedor.ProveedorId);
              })
              // Asignación de estilo y valores
              btn2.className = " text-info  p-1";
              btn2.innerText = "Editar";
              btn2.setAttribute('data-toggle', 'modal');
              btn2.setAttribute('data-target', '#modalEditar');

              //Ver detalles al dar click en la fila
              tr.setAttribute('role', 'button');
              tr.setAttribute('data-toggle', 'popover');
              tr.setAttribute('data-container', 'body');
              tr.setAttribute('data-placement', 'top');
              tr.setAttribute('data-trigger', 'hover');
              tr.setAttribute('data-content', 'Última entrada: ' + proveedor.LastBuy);

              btn2.addEventListener('click', () => {
                abrirEdicion(proveedor.ProveedorId)
              })

              td0.appendChild(select);

              td1.innerText = proveedor.Codigo;
              td1.setAttribute('style', 'text-align:center')
              td2.innerText = proveedor.Proveedor;
              td3.innerText = proveedor.Telefono;
              td4.innerText = proveedor.Correo;
              td5.innerText = formatter.format(proveedor.Deuda);
              td6.appendChild(btn);
              td7.appendChild(btn2);

              //Añadiendo elementos a la fila y esta al cuerpo de la tabla
              tr.appendChild(td0);
              tr.appendChild(td1);
              tr.appendChild(td2);
              tr.appendChild(td3);
              tr.appendChild(td4);
              tr.appendChild(td5);
              tr.appendChild(td6);
              tr.appendChild(td7);
              tbcuerpo.appendChild(tr);
              $('#' + id).popover();
              // Asigna fondos diferentes a filas pares e impares Recorre la tabla y
              // centraliza
              // todos los td
              $('#tablaProveedor > tbody  > tr > td').each(function (index, td) {
                td.setAttribute('style', 'width:fit-content;text-align:center; -webkit-user-select:none');

              });
            }
          });

        //Paginar tabla (condición para no recargar paginación)
        if ($.fn.dataTable.isDataTable('#tablaProveedor') == false) {
          $('#tablaProveedor').DataTable(options);
        }
        let searchIcon = `<span class="iconify" data-icon="dashicons:search" data-inline="true" style="font-size:x-large"></span>`
        document
          .querySelector('#tablaProveedor_filter')
          .style
          .display = 'flex'
        document
          .querySelector('#tablaProveedor_filter input')
          .className += 'shadow-lg'
        document
          .querySelector('#tablaProveedor_filter label')
          .className = 'text-info ';
        document
          .querySelector('#tablaProveedor_filter label')
          .setAttribute('style', 'font-weight: bold; font-size: large')

      });

    divCarga.style.display = 'none';

  };

  //Calcular tiempo desde la última compra
  function diasActivo(ultimaCompra) {
    let lastBuy = new Date(ultimaCompra);
    let today = new Date(Date.now());
    let diferencia = Math.abs(today - lastBuy);
    let dias = diferencia / (1000 * 3600 * 24)
    return Math.round(dias);
  }

  //Validar si hay un proveedor marcado
  function proveedorMarcado(chk) {
    let selects = document.querySelectorAll('.chkbox');
    aBorrar = [];
    selects.forEach(element => {
      if (element.checked) {
        aBorrar.push(element.getAttribute('id').substr(1))
      }
    });
    ValidarBorrarTodos();
    if (haySeleccionado) {
      document
        .getElementById('btnBorrarTodo')
        .style
        .display = 'inline';
      document
        .getElementById('cantSel')
        .innerText = aBorrar.length

    } else {
      document
        .getElementById('btnBorrarTodo')
        .style
        .display = 'none';
      document
        .getElementById('cantSel')
        .innerText = ""

    }
  }
  $('#btnBorrarTodo').on('click', () => {
    borrarTodo()
  })

  //Seleccionar todos los proveedores
  $('#selTodo').on('click', (e) => {
    let chkbox = document.querySelectorAll('.chkbox');
    let state = document
      .getElementById('selTodo')
      .checked;
    chkbox.forEach(element => {
      element.checked = state;
    });
    ValidarBorrarTodos();
    if (haySeleccionado) {
      document
        .getElementById('btnBorrarTodo')
        .style
        .display = 'inline';

    } else {
      document
        .getElementById('btnBorrarTodo')
        .style
        .display = 'none';

    }
    proveedorMarcado();
  })
  //Borrar todo
  function borrarTodo() {
    Swal
      .fire({
      title: '¿Desea eliminar los proveedors seleccionados?',
      text: "Una vez borrados, no podrá recuperarlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: "Cancelar"
    })
      .then((result) => {
        if (result.isConfirmed) {
          data.borrarVariosProveedores(aBorrar)
          alert(aBorrar.toString())

          Swal
            .fire({title: 'proveedor borrado', text: 'El proveedor se ha eliminado del inventario', icon: 'success'})
            .then(result => {
              if (result.isConfirmed) {
                require('electron')
                  .ipcRenderer
                  .send('reloadProduct', 'arg');

              }
            })
        }

      })
  }

  //Activiar/Desactivar botón de Borrar Todos
  function ValidarBorrarTodos() {
    let selects = document.querySelectorAll('.chkbox');
    haySeleccionado = false;
    selects.forEach(element => {
      if (element.checked) {
        haySeleccionado = true;
      }
    });
  }

  // Confirmar borrado de proveedor
  function preguntarBorrar(proveedor) {
    Swal
      .fire({
      title: '¿Desea eliminar el proveedor?',
      text: "Una vez borrado, no podrá recuperarlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: "Cancelar"
    })
      .then((result) => {
        if (result.isConfirmed) {
          data.borrarUnProveedor(proveedor);

          Swal
            .fire({title: 'Proveedor borrado', text: 'El proveedor se ha eliminado del registro', icon: 'success'})
            .then(result => {
              if (result.isConfirmed) {
                require('electron')
                  .ipcRenderer
                  .send('reloadProduct', 'arg');
              }
            })
        }
      })

  }

  //Confirmar Edición de proveedor
  function preguntarEditar(formData, proveedor) {
    Swal
      .fire({
      title: '¿Desea editar el proveedor?',
      text: "Confirme que desea editar los datos del proveedor",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: "Cancelar"
    })
      .then((result) => {
        if (result.isConfirmed) {
          data.editarProveedor(formData, proveedor);
          Swal
            .fire({
            title: proveedor + ' actualizado',
            text: 'El proveedor se ha actualizado con éxito',
            icon: 'success'
          })
            .then(result => {
              if (result.isConfirmed) {
                require('electron')
                  .ipcRenderer
                  .send('reloadProvider', 'arg');
              }
            })

        }
      })

  }

  //Confirmar registro de proveedor
  function confirmarRegistro(formData, proveedor) {
    Swal
      .fire({
      title: '¿Todo Correcto?',
      text: "Registrar el proveedor ingresado",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: "Cancelar"
    })
      .then((result) => {
        if (result.isConfirmed) {
          data.insertarProveedor(formData);
          Swal
            .fire({
            title: proveedor + ' registrado',
            text: 'El proveedor se ha registrado con éxito',
            icon: 'success'
          })
            .then(result => {
              if (result.isConfirmed) {
                require('electron')
                  .ipcRenderer
                  .send('reloadProvider', 'arg')

              }
            })
        }
      })

  }

  //Cargar modal de edición
  function abrirEdicion(e) {
    data
      .unProveedor(e)
      .then(result => {

        result.map(proveedor => {
          $('#eid').val(proveedor.ProveedorId);
          $('#enombre').val(proveedor.Proveedor);
          $('#etelefono').val(proveedor.Telefono);
          $('#ecodigo').val(proveedor.Codigo);
          $('#ecorreo').val(proveedor.Correo);
          $('#edireccion').val(proveedor.Direccion);
          $('#enota').val(proveedor.Nota);
        })
      })
  }

  //Calcular código del proveedor
  let lastIndex = 0;
  function newCode(name) {
    name = name.substring(0, 3);
    name = name.toUpperCase();
    data
      .proveedores()
      .then(response => {
        response.map(prov => {
          if (prov.ProveedorId > lastIndex) {
            lastIndex = prov.ProveedorId + 1;

          }
        })
        $('#codigo').val(name + lastIndex);

      });
  }

  //Insertar registro con el submit del form
  var form = document.getElementById('formInsertar');
  var frm = $('#formInsertar');
  try {
    frm.on('submit', (e) => {

      e.preventDefault();

      var formData = [
        $("#codigo")
          .val()
          .toString(),
        $("#nombre")
          .val()
          .toString(),
        $("#telefono").val(),
        $("#direccion").val(),
        $("#nota")
          .val()
          .replaceAll(',', ';'),
        0,
        $("#correo").val(),
        $('#fecha').val(),
        $('#fecha').val()
      ];
      confirmarRegistro(formData, $("#codigo").val().toString())
    });

  } catch (error) {
    console.log(error)
  }

  //Editar registro con el submit del form
  var frm2 = $('#formEditar');
  let form2 = document.getElementById('formEditar');
  try {
    frm2.on('submit', (function (e) {
      e.preventDefault();

      var formData = [
        $("#ecodigo")
          .val()
          .toString(),
        $("#enombre")
          .val()
          .toString(),
        $("#etelefono").val(),
        $("#edireccion").val(),
        $("#enota")
          .val()
          .toString(),
        $("#ecorreo").val(),
        $('#eid').val()
      ];

      preguntarEditar(formData, $("#ecodigo").val().toString());

      $('#modalEditar').modal('hide')

    }));

  } catch (error) {
    console.log(error)
  }
  $('#recarga').on('click', () => {
    require('electron')
      .ipcRenderer
      .send('abrirProveedoresInactivos', 'arg');
  })
})
