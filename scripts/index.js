//Formato de Moneda
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

//Importar módulos
const path = require("path");
const modalCat = require(path.join(
  __dirname,
  "../",
  "scripts",
  "componentes",
  "modalCategorias.js"
));
const $ = require("jquery");
const cCobrar=require('../data/porCobrar');
const menu = require(path.join(
  __dirname,
  "../",
  "scripts",
  "componentes",
  "menubar.js"
));
const data = require(path.join(__dirname, "../", "data", "inventario.js"));
const ventas = require(path.join(__dirname, "../", "data", "ventas.js"));


//Variables
let prodTotal = 0;
let prodTotalPrecio = 0;
let ProdTotalCosto = 0;
let productoCant = 0;
let servicioCant = 0;
let alContado = 0;
let aCredito = 0;
let ventaTotal = 0;

//Evento load de la ventana
window.addEventListener("load", () => {
  //Agregar modal de categorias
  document.getElementById("modalCat").innerHTML = modalCat;
  //Agregar barra de menú
  document.getElementById("menuBar").innerHTML = menu;
  $('#cargando').show();
  //Cargar estadísticas de productos
  data
    .productos()
    .then((response) => {
      datos = response;
      response.map((producto) => {
        if (producto.Tipo == "Producto") {
          productoCant++;
        } else {
          servicioCant++;
        }
        if (producto.Tipo == "Producto") {
          prodTotal++;
          prodTotalPrecio += producto.Precio * producto.Existencia;
          ProdTotalCosto += producto.Costo * producto.Existencia;
        }
      });
      document.getElementById("spTotal").innerText = prodTotal + " productos";
      document.getElementById("spTPrecio").innerHTML =
        `<span class="iconify text-success" data-icon="ant-design:up-circle-filled" data-inline="true"></span>` +
        formatter.format(prodTotalPrecio);
      document.getElementById("spTCosto").innerHTML =
        `<span class="iconify text-secondary" data-icon="ant-design:down-circle-filled" data-inline="true"></span>` +
        formatter.format(ProdTotalCosto);
      cargarVentas();
      cargaCuentas();
    })
    .catch((err) => console.log(err));
 
  //Este método no me funciona en el Inicio desde el archivo Menú.js
  //El problema es que se ejecuta antes de que el formulario se haya creado
  $("#formAddCat").on("submit", function (e) {
    e.preventDefault();
    let categoria = $("#ncategoria").val();
    let codigo = categoria.substr(0, 3).toUpperCase();
    let valores = [codigo, categoria];
    require("../data/inventario.js").insertarCategoria(valores);
    require("sweetalert2")
      .fire({
        title: codigo + " registrado",
        text: "Se ha añadido una nueva categoría",
        icon: "success",
      })
      .then((result) => {
        if (result.isConfirmed) {
          require("electron").ipcRenderer.send("abrirProductos", "arg");
        }
      });
  });

  //Cargar datos de ventas del mes actual
  function cargarVentas() {
    let hoy = new Date(Date.now());
    hoy = hoy.toLocaleDateString();
    ventas.ventas().then((response) => {
      response.map((venta) => {
        if (venta.Fecha.substr(venta.Fecha.indexOf('/')) === hoy.substr(hoy.indexOf('/'))) {
          
            alContado += venta.Pagado;
          
            aCredito += venta.Debido;
          
          ventaTotal += venta.Total;
        }
      });
      $("#spVentaTotal").html(
        `<span class="iconify" data-icon="ant-design:dollar-circle-filled" data-inline="false"></span>` +
          formatter.format(ventaTotal)
      );
      $("#spVentaContado").html(
        `<span class="iconify text-success" data-icon="ant-design:dollar-circle-filled" data-inline="true"></span>` +
          formatter.format(alContado)
      );
      $("#spVentaCredito").html(
        `<span class="iconify text-secondary" data-icon="ant-design:dollar-circle-filled" data-inline="true"></span>` +
          formatter.format(aCredito)
      );
    });
    
  }

  //Cargar datos de las cuentas pendientes
  let cxc = 0;
  let cxp=0;
  let balance=0;
  function cargaCuentas() {
  
      cCobrar.cuentas().then(response=>{
        Object.values(response).map(cuenta=>{
          cxc+=cuenta.Restante;
        })

      balance=cxc-cxp;

       $("#spBalance").html(
        `<span class="iconify" id="iconBalance" data-icon="ant-design:dollar-circle-filled" data-inline="true"></span>` +
          formatter.format(balance)
      ); 
      $("#spCxC").html(
        `<span class="iconify text-success" data-icon="ant-design:dollar-circle-filled" data-inline="false"></span>` +
          formatter.format(cxc)
      );
    
      $("#spCxP").html(
        `<span class="iconify text-danger" data-icon="ant-design:dollar-circle-filled" data-inline="true"></span>` +
          formatter.format(cxp)
      );
      if(balance>0){
        $('#iconBalance').addClass('text-success shadow-lg');
      } else{
        $('#iconBalance').addClass('text-danger shadow-lg');
      }
     

    });
  }
  //Cargar Estadísticas de Categorías
  function cargarGrafica() {
    var ctx = document.getElementById("canvasId").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Al contado", "A crédito"],
        datasets: [
          {
            data: [alContado, aCredito],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
            offset: 8
          },
          
        ],
        
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Estadísticas de Ventas",
            font: {
              size: 32,
            },
          },
        },
      },
    });
    var ctx2 = document.getElementById("canvasId2").getContext("2d");

    var myChart = new Chart(ctx2, {
      type: "bar",
    
      data: {
        labels: ["CxC", "CxP"],
        datasets: [
          {
            label: " ",
            data: [cxc, cxp],
            backgroundColor: [
             "rgba(138, 175, 211, 0.7)", 
             "rgba(255, 99, 132, 0.2)",
              
            ],
            borderColor: ["rgba(54, 162, 235, 1)","rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Balance de Cuentas",
            font: {
              size: 32,
            },
          },
        },
      },
    });
  }
  let maxButton=document.getElementById('btnMax');
  maxButton.style.display='none';
  setTimeout(() => {
    cargarGrafica();
    $('#cargando').hide();
  }, 500);
});
