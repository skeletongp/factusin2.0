
module.exports = `
<link rel="stylesheet" href="../material-kit-master/assets/css/material-kit.css">
<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>

<div style="z-index: 125;">
    <div id="mySidenav" class="sidenav" style="background-color:rgba(44, 62, 80)">
        <ul class="navbar-nav ml-auto">
            <!--Facturación-->
            <li class="nav-item dropdown">
                <a style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                    class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                    aria-expanded="false"> <span class="iconify mr-2" data-icon="whh:invoice" data-inline="false"></span> Facturación</a>
                <div class="dropdown-menu">
                    <span style="font-size:medium; font-weight: bold; -webkit-user-select: none; -webkit-user-select: none"
                        role="button" class="dropdown-item" id="btnNuevaFactura" onclick="openNFactura()"> <span class="iconify mr-2" data-icon="el:file-new" data-inline="false"></span>
                        Facturar</span>
                    <div class="dropdown-divider"></div>
                    <span style="font-size:medium; font-weight: bold; -webkit-user-select: none; -webkit-user-select: none"
                        role="button" class="dropdown-item" id="btnCotizar" onclick="openCotizar()"> <span class="iconify mr-2" data-icon="el:file-new" data-inline="false"></span>
                        Cotizar</span>
                    <div class="dropdown-divider"></div>
                    <span style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                        class="dropdown-item" onclick="openFacturas()" id="btnFacturaVentas"><span class="iconify mr-2" data-icon="fa-solid:history" data-inline="false"> </span> Historial</span>
                    <div class="dropdown-divider"></div>
                    <span style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                        class="dropdown-item" id="btnRecurrentes" onclick="openRecurrentes()"> <span class="iconify mr-2" data-icon="el:refresh" data-inline="false"></span> Fact. recurrentes</span>
                    <div class="dropdown-divider"></div>
                    <span style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                        class="dropdown-item" id="btnCotizaciones" onclick="openCotizaciones()"> <span class="iconify mr-2" data-icon="ic:round-request-quote" data-inline="true" style="font-size:x-large"></span>Cotizaciones</span>
                    <div class="dropdown-divider"></div>
                    <span style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                        class="dropdown-item" id="btnNotas" onclick="openNotaCredito()"> <span class="iconify mr-2"
                            style="font-size: large; margin: 0;" data-icon="mdi:credit-card-refresh-outline"
                            data-inline="true"></span> Notas de crédito</span>
                </div>
            </li>
            <!--Ventas-->
            <li class="nav-item dropdown">
                <a style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                    class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                    aria-expanded="false"><span class="iconify mr-2" data-icon="fa-solid:file-invoice-dollar" data-inline="false"></span> Ventas</a>
                <div class="dropdown-menu">
                    <span
                        style="font-size:medium; font-weight: bold; -webkit-user-select: none; -webkit-user-select: none"
                        role="button" class="dropdown-item" id="btnVentas" onclick="openVentas()"> <span class="iconify mr-2"
                            style="font-size: large; margin: 0;" data-icon="fa-solid:history" data-inline="true"></span>
                        Historial</span>
                    <div class="dropdown-divider"></div>
                    <span style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                        class="dropdown-item" id="btnPorClientes" onclick="openPorCliente()"><span class="iconify mr-2"
                            style="font-size: x-large; margin: 0;" data-icon="bx:bxs-user" data-inline="true"></span>
                        Por cliente</span>
                    <div class="dropdown-divider"></div>
                    <span style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                        class="dropdown-item" id="btnPorFecha" onclick="openPorFecha()"> <span class="iconify mr-2"
                            style="font-size: large; margin: 0;" data-icon="bi:calendar-date-fill"
                            data-inline="true"></span> Por fecha</span>
                    <div class="dropdown-divider"></div>
                    
                </div>
            </li>
            <!--Inventario-->
            <li class="nav-item dropdown">
                <a style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                    class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                    aria-expanded="false"><span class="iconify mr-2" data-icon="ic:twotone-inventory" data-inline="false" style="font-size:large"></span> Inventario</a>
                <div class="dropdown-menu">
                    <span style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                        class="dropdown-item" onclick="openProductos()"> <span class="iconify mr-2" data-icon="carbon:product" data-inline="true" style="font-size: x-large"></span> Productos</span>
                    <div class="dropdown-divider"></div>
                    <span style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                        class="dropdown-item" onclick="openServicios()"><span class="iconify mr-2" data-icon="ic:outline-miscellaneous-services" data-inline="true" style="font-size: x-large"></span> Servicios </span>
                    <div class="dropdown-divider"></div>
                    <span style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                        class="dropdown-item" onclick="openCategorias()" ><span class="iconify mr-2" data-icon="carbon:categories" data-inline="true" style="font-size: x-large"></span> Categorías</span>
                    <div class="dropdown-divider"></div>
                    <span style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                        class="dropdown-item" onclick="openGeneralCosto()"><span class="iconify mr-2" data-icon="ic:sharp-price-check" data-inline="true" style="font-size: x-large"></span> General</span>
                    <div class="dropdown-divider"></div>
                </div>
            </li>
            <li class="nav-item dropdown">
                <a style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                    class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                    aria-expanded="false"><span class="iconify mr-2" data-icon="fa-solid:user-tag" data-inline="true"></span> Clientes</a>
                <div class="dropdown-menu">
                    <span style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                        class="dropdown-item" id="btnRegistro" onclick="openClientes()">Registro</span>
                    <div class="dropdown-divider"></div>
                    <span style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                        class="dropdown-item" id="btnClientesNuevos">Clientes nuevos</span>
                    <div class="dropdown-divider"></div>
                    <span style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                        class="dropdown-item" id="btnClientesInactivos">Clientes inactivos</span>
                    <div class="dropdown-divider"></div>
   
                </div>
            </li>
            <li class="nav-item dropdown">
                <a style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                    class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                    aria-expanded="false"><span class="iconify mr-2" data-icon="fa:truck" data-inline="false"></span> Proveedores</a>
                <div class="dropdown-menu">
                    <span style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                        class="dropdown-item" id="btnListado" onclick="openProveedores()">Listado</span>
                    <div class="dropdown-divider"></div>
                    <span style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                        class="dropdown-item" id="btnProveedores" onclick="openPNew()">Proveedores nuevos</span>
                    <div class="dropdown-divider"></div>
                    <span style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                        class="dropdown-item" id="btnInactivos" onclick="openPInactive()">Inactivos</span>
                    <div class="dropdown-divider"></div>
                   
                </div>
            </li>

            
            <li class="nav-item dropdown">
                <a style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                    class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                    aria-expanded="false"><span class="iconify mr-2" data-icon="fa:bank" data-inline="false"></span> Cuentas</a>
                <div class="dropdown-menu">
                    <span style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                        class="dropdown-item" id="btnPorCobrar" onclick="openPorCobrar()">Por Cobrar</span>
                    <div class="dropdown-divider"></div>
                    <span style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                        class="dropdown-item" id="btnProveedores" onclick="openCxP()">Por Pagar</span>
                    <div class="dropdown-divider"></div>
                    <span style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                        class="dropdown-item" id="btnInactivos" onclick="openPInactive()">Historial</span>
                    <div class="dropdown-divider"></div>
                   
                </div>
            </li>
            <li class="nav-item dropdown">
            <a style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                aria-expanded="false"><span class="iconify mr-2" data-icon="fa:shopping-cart" data-inline="false"></span> Compras</a>
            <div class="dropdown-menu">
                <span style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                    class="dropdown-item" id="btnPorCobrar" onclick="openPorCobrar()">Añadir</span>
                <div class="dropdown-divider"></div>
                <span style="font-size:medium; font-weight: bold; -webkit-user-select: none" role="button"
                    class="dropdown-item" id="btnProveedores" onclick="openCxP()">Registro</span>
                <div class="dropdown-divider"></div>
               
               
            </div>
        </li>
        </ul>
    </div>


    
    <nav class="navbar navbar-expand-lg py-1 px-2 shadow center bg-dark ocultar"
        style="position: fixed; width: 100%; z-index:120;  background-color:#0B1E2E">
        
        <span class="iconify mr-2" role="button" id="btnBack" data-icon="typcn:arrow-back" style="font-size: xx-large; color: white; margin-right:1rem; display:none;" data-inline="true" onclick="goBack(this)"></span>
        <span style="font-size:xx-large; font-weight: bold; -webkit-user-select: none; left: 0;" role="button"
            class="navbar-brand mr-auto" onclick="openNav()"><span id="icon-menu" class="material-icons">&#xe3c7;</span>
        </span>

      
        <span style="font-size:x-large; font-weight: bold;  width: 100%; text-align: center; -webkit-app-region: drag;"
            class="navbar-brand m-auto" id="spanTitulo" >Home- Resumen General</span>

            <div class="d-flex" style="width: fit-content; rigth: 0;">
      
           <div class="d-flex" style="border-bottom: solid 2px white; 100%">
            <span class="iconify mr-2" role="button" data-icon="dashicons:arrow-down-alt2" style="font-size: xx-large; color: white; margin-right:1rem" data-inline="true" onclick="minWin()"></span>
            <span class="iconify mr-2" role="button" id="btnMax" data-icon="dashicons:admin-page" style="font-size: x-large; color: white; margin-right:1rem" data-inline="true" onclick="maxWin(this)"></span>
            <span class="iconify mr-2" role="button" data-icon="dashicons:no-alt" style="font-size: xx-large; color: white" data-inline="true" onclick="closeWin()"></span>
           </div>
        </div>

</div>
<script type="text/javascript" src="../scripts/menu.js"></script>
<div id="divReloj" class="bg-light">
            <link rel="stylesheet" href="../css/reloj.css">
            <div class="shadow-lg px-3 pt-2">
                <span id="spHora"> 00:</span>
                <span id="spMinuto">00:</span>
                <span id="spSegundo">00:</span>
                <span id="spTanda">AM</span>
                <div>
                    <span id="spFecha"></span>
                </div>
            </div>
         

        </div>
</nav>
</div>
<!-- Copyright -->


`

let today = new Date(Date.now());

setInterval(() => {
  let dt = new Date();
  if(dt.getHours()<10){
    $('#spHora').text("0"+dt.getHours()+" :")
  } else{
    $('#spHora').text(+dt.getHours()+" :")
  }
  if(dt.getMinutes()<10){
    $('#spMinuto').text("0"+dt.getMinutes()+" :")
  } else{
    $('#spMinuto').text(+dt.getMinutes()+" :")
  }
  if(dt.getSeconds()<10){
    $('#spSegundo').text("0"+dt.getSeconds()+" :")
  } else{
    $('#spSegundo').text(+dt.getSeconds()+" :")
  }
  var options = { weekday: "long", 
                  year: "numeric", 
                  month: "short", 
                  day: "numeric" }; 
 $('#spTanda').text(dt.getHours() < 12 ? "AM" : "PM");
 $('#spFecha').text(today.toLocaleDateString("es-DO", options))
}, 1000);