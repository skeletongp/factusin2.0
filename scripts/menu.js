

//Eventos click de los botones


  function openProductos() {
    require('electron').ipcRenderer.send('abrirProductos', "Segundo argumento");



  }
  
  function openServicios() {
    require('electron').ipcRenderer.send('abriServicios', "Segundo argumento");
  }

  
  function openProveedores() {
    require('electron').ipcRenderer.send('abrirProveedores', "Segundo argumento");
  }

  function openGeneralCosto() {
    require('electron').ipcRenderer.send('abrirTotalCosto', "Segundo argumento");
  }
  function openPInactive() {
    require('electron').ipcRenderer.send('abrirProveedoresInactivos', "Segundo argumento");
  }
  function openPNew() {
    require('electron').ipcRenderer.send('abrirProveedoresNuevos', "Segundo argumento");
  }
  function openClientes() {
    require('electron').ipcRenderer.send('abrirClientes', "Segundo argumento");
  }
  function openNFactura() {
    require('electron').ipcRenderer.send('abrirNFactura', "Segundo argumento");
  }
  function openFacturas() {
    require('electron').ipcRenderer.send('abrirFacturas', "Segundo argumento");
  }
  function openCotizar() {
    require('electron').ipcRenderer.send('abrirCotizar', "Segundo argumento");
  }
  function openPorCobrar() {
    require('electron').ipcRenderer.send('abrirPorCobrar', "Segundo argumento");
  }
  function openCotizaciones() {
    require('electron').ipcRenderer.send('abrirCotizaciones', "Segundo argumento");
  }
  function openRecurrentes() {
    require('electron').ipcRenderer.send('abrirRecurrentes', "Segundo argumento");
  }
  function openVentas() {
    require('electron').ipcRenderer.send('abrirVentas', "Segundo argumento");
  }
  function openPorCliente() {
    require('electron').ipcRenderer.send('abrirPorCliente', "Segundo argumento");
  }
  function openPorFecha() {
    require('electron').ipcRenderer.send('abrirPorFecha', "Segundo argumento");
  }
  function openNotaCredito() {
    require('sweetalert2').fire({
      title: 'Lo Siento',
      text:'Esta función aún está en desarrollo',
      icon:'error'
    })
    //require('electron').ipcRenderer.send('abrirPorFecha', "Segundo argumento");
  }


  function openCategorias() {
    $('#btnModalCat').trigger('click');
  }

  
  function openHome() {
    require('electron').ipcRenderer.send('abrirInicio', "Segundo argumento");
  }
  function minWin() {
    require('electron').ipcRenderer.send('minWin', "Segundo argumento");
  }
  function maxWin(e) {
    require('electron').ipcRenderer.send('maxWin', "Segundo argumento");
  }
  function closeWin() {
    require('electron').ipcRenderer.send('closeWin', "Segundo argumento");
  }
  
  function goBack(e) {
     require('electron').ipcRenderer.send('goBack', "Segundo argumento");
    
  }
  document
.getElementById('modalCat')
.innerHTML = require(require('path').join(__dirname, '../', 'scripts', 'componentes', 'modalCategorias.js'));

function openNav() {
  let nav = document.getElementById("mySidenav");
  if (nav.style.width < "230px") {
      nav.style.width = "230px";
      document.getElementById('icon-menu').innerHTML = '&#xe5cd;'
  } else {
      nav.style.width = "0px";
      document.getElementById('icon-menu').innerHTML = '&#xe3c7;'
  }
}

//Cargar estadísticas de categorías
require('../data/inventario.js')
.categoriasActivas()
.then(categorias => {
    let encabezado=`<li class="list-group-item d-flex justify-content-between align-items-left bg-light" style="font-size: large; font-weight:bold">
    Código y Nombre    <span >Productos</span>  </li>`
    let lista=document.createElement('ul');
    let modalBody=document.getElementById('bodyCategoria')
    lista.className='list-group'
    lista.innerHTML=encabezado;
  categorias.map(cat=>{
    let listItem = document.createElement('li');
    listItem.className="list-group-item d-flex align-items-center"
    let listSpan = document.createElement('span');
    listSpan.className="badge bg-secondary badge-pill ml-auto";
    listSpan.style.fontSize="medium";
    listItem.style.fontSize="medium";
    listSpan.innerText=cat.Cantidad;
    let datos=cat.Codigo+`<span class="iconify mr-3 text-info ml-1" data-icon="bx:bxs-arrow-from-left" style="font-size:large; font-weight:bold" data-inline="true"></span>`+cat.Categoria;
    listItem.innerHTML=datos;
    listItem.appendChild(listSpan);
    lista.appendChild(listItem);
  })
  modalBody.appendChild(lista);
})

//Cerrar menú al dar click fuera de él
$(window).on('click',(e )=>{
  if(e.target.className!=='sidenav' && e.target.className!='nav-item dropdown' && e.target.id!='icon-menu' ){
    let nav = document.getElementById("mySidenav");
    nav.style.width = "0px";
      document.getElementById('icon-menu').innerHTML = '&#xe3c7;'
  }
})
//Insertar categoría desde el submit
$(document).ready(()=>{
  $('#formAddCat').on('submit', function (e) {

    e.preventDefault();
    alert('hol')
    let categoria = $('#ncategoria').val();
    let codigo = categoria
      .substr(0, 3)
      .toUpperCase();
    let valores = [codigo, categoria];
    require('../data/inventario.js').insertarCategoria(valores);
    require('sweetalert2')
      .fire({
      title: codigo + ' registrado',
      text: 'Se ha añadido una nueva categoría',
      icon: 'success'
    })
      .then(result => {
        if (result.isConfirmed) {
          require('electron')
            .ipcRenderer
            .send('goBack', 'arg');
        }
      
  })
      
  
  })
  
})
$('[data-toggle="popover"]').popover()

//

