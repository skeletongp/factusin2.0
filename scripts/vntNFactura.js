const Swal = require("sweetalert2");
const data = require("../data/inventario");
const ventas= require("../data/ventas")
const clientes = require("../data/clientes");
const facturas = require("../data/facturas");
const path = require("path");
const csv = require("jquery-csv");
const fs = require("fs");
const cuentas = require("../data/porCobrar");

const menu = require(path.join(
  __dirname,
  "../",
  "scripts",
  "componentes",
  "menubar.js"
));

//Declaración de variables
let productSel;
let totalimpuesto = 0;
let tsubtotal = 0;
let ttotal = 0;
let today = new Date(Date.now());
let codCliente;
let clienteId;
let tipo='Al Contado';
let ruta;
let productId;
let productoCant=0;
today = today.toLocaleDateString();
let totalVenta = 0;

//Formatea los números a tipo moneda
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

//Cargar de elementos estáticos
window.addEventListener("load", () => {
  document.getElementById("menuBar").innerHTML = menu;

  document.getElementById("spanTitulo").innerText = "Nueva Factura";
  let btnBack = document.getElementById("btnBack");
  btnBack.style.display = "block";
  //Evento change al escribir el nombre Función tecla Ctrl+Backspace
  $(document).keydown((e) => {
    // ESCAPE key pressed
    if (e.keyCode == 8 && e.ctrlKey) {
      require("electron").ipcRenderer.send("goBack", "Segundo argumento");
    }
  });
});

//Métodos iniciales
llenarSelectClient();
llenarSelectProducto();
$("#spFecha").text(today);
numeroFactura();
$("#cargando").hide();
//Llenar el select de clientes
function llenarSelectClient() {
  clientes.clientes(" ").then((response) => {
    let selectCliente = document.getElementById("clienteId");
    Object.values(response).map((cliente) => {
      let opc = document.createElement("option");
      opc.setAttribute("value", cliente.ClienteId);
      opc.innerText = cliente.Cliente;
      selectCliente.appendChild(opc);
    });
  });
}
//Llenar el select de producto
function llenarSelectProducto() {
  data.productos().then((response) => {
    let selectCliente = document.getElementById("productoId");
    Object.values(response).map((producto) => {
      if (producto.Existencia > 0) {
        let opc = document.createElement("option");
        opc.setAttribute("value", producto.ProductoId);
        opc.innerText = producto.Producto +` (${formatter.format(producto.Precio)})`;
        selectCliente.appendChild(opc);
      }
    });
  });
}
//Dar formato a los selects
function setChosen() {
  $("#productoId").chosen({
    placeholder_text_single: "Seleccione un producto",
    no_results_text: "Sin resultados",
    width: "95%",
  });
  $("#clienteId").chosen({
    placeholder_text_single: "Seleccione un cliente",
    no_results_text: "Sin resultados",
    width: "95%",
  });
  $(".chosen-container-single .chosen-single").addClass("selectproduct p-2");
  $(".chosen-container-single .chosen-single").attr("style", "height: 2.39rem");
}
//Espera medio segundo para aplicar el formato
setTimeout(() => {
  setChosen();
}, 500);

//Seleccionar cliente
$("#clienteId").on("change", (e) => {
  let id = e.target.value;
  if (id != "") {
    clientes.clientes(" ").then((response) => {
      Object.values(response).map((cliente) => {
        if (cliente.ClienteId == id) {
          $("#nomCliente").text(cliente.Cliente);
          $("#telCliente").text(cliente.Telefono);
          $("#correoCliente").text(cliente.Correo);
          $("#dirCliente").text(cliente.Direccion);
          codCliente = cliente.Codigo;
          clienteId=cliente.ClienteId;
        }
      });
    });
  } else {
    $("#nomCliente").text("");
    $("#telCliente").text("");
    $("#correoCliente").text("");
    $("#dirCliente").text("");
  }
});

//Seleccionar el producto
$("#productoId").on("change", (e) => {
  id = $("#productoId").val();
  data.productos().then((response) => {
    Object.values(response).map((producto) => {
      if (producto.ProductoId == id) {
        $("#precio").val(producto.Precio);
        productSel = producto.Producto;
        productId=producto.ProductoId;
        productoCant=producto.Existencia;
        $('#prodDisponible').text(productoCant.toFixed(2));
        $("#cantidad").focus();
      }
    });
  });
});

//Crear y añadir fila a la tabla
function addRow(producto, precio, cantidad, impuesto, total, subtotal, productoId) {
  let tr = document.createElement("tr");
  let tdProducto = document.createElement("td");
  let tdCant = document.createElement("td");
  let tdPrecio = document.createElement("td");
  let tdImpuesto = document.createElement("td");
  let tdTotal = document.createElement("td");
  let tdSubtotal = document.createElement("td");
  let tdBorrar = document.createElement("td");

  tdBorrar.innerHTML = `<span class="iconify text-danger ocultar" style="font-size: x-large;" data-icon="jam:delete-f" data-inline="true"></span>`;
  tdImpuesto.className = "tdimpuesto esconder";
  tdSubtotal.className = "tdsubtotal ";
  tdTotal.className = "tdtotal esconder";
  tdImpuesto.id = `a${impuesto}`;
  tdSubtotal.id = `a${subtotal}`;
  tdTotal.id = `a${totalimpuesto}`;
  tdTotal.id = `a${total}`;
  tdProducto.id = `p${producto}`;
  tdCant.id=`p${productoId}`;
  tdCant.className="tdcantidad";
  tdBorrar.addEventListener("click", (e) => {
    tbCuerpo.removeChild(tdBorrar.parentElement);
    sumarTotales();
  });
  producto = producto.trim();
  precio = formatter.format(precio);
  total = formatter.format(total);
  impuesto = formatter.format(impuesto);
  subtotal = formatter.format(subtotal);

  tdProducto.innerText = producto;
  tdPrecio.innerText = precio;
  tdCant.innerText = cantidad;
  tdImpuesto.innerText = impuesto;
  tdTotal.innerText = total;
  tdSubtotal.innerText = subtotal;

  tr.appendChild(tdProducto);
  tr.appendChild(tdCant);
  tr.appendChild(tdPrecio);
  tr.appendChild(tdSubtotal);
  tr.appendChild(tdImpuesto);
  tr.appendChild(tdTotal);
  tr.appendChild(tdBorrar);

  let tbCuerpo = document.getElementById("tbcuerpo");
  tbCuerpo.appendChild(tr);
}
//Hacer submit del form con el botón
document.getElementById("btnAdd").addEventListener("click", function () {
  $("#formu").trigger("submit");
  
});

//Sumar subtotal, impuesto y total
function sumarTotales() {
  totalimpuesto = 0;
  tsubtotal = 0;
  ttotal = 0;
  $(".tdimpuesto").each(function () {
    let imp = $(this).attr("id").substr(1).replace(",", "");
    totalimpuesto += parseFloat(imp);
  });
  $(".tdsubtotal").each(function () {
    let sub = $(this).attr("id").substr(1).replace(",", "");
    tsubtotal += parseFloat(sub);
  });
  $(".tdtotal").each(function () {
    let tot = $(this).attr("id").substr(1).replace(",", "");
    ttotal += parseFloat(tot);
  });
  $("#tsubtotal").text(formatter.format(tsubtotal));
  $("#timpuesto").text(formatter.format(totalimpuesto));
  $("#ttotal").text(formatter.format(ttotal));
  totalVenta = ttotal;
}

//Añadir producto a la factura
function facturarProducto() {
  let chkImpuesto = document.getElementById("chkImpuesto");
  let inputComprobante=document.getElementById('spComprobante');
  let producto = productSel;
  let cant = $("#cantidad").val();
  let precio = $("#precio").val();
  let impuesto = 0;
  let subtotal = cant * precio;
  if (chkImpuesto.checked == true) {
    impuesto = parseFloat(precio * cant) * 0.18;
  }
  let total = parseFloat(subtotal) + parseFloat(impuesto);
  validarProducto(producto);
  if(productoCant>=cant){
    addRow(producto, precio, cant, impuesto, total, subtotal, productId);
  } else{
    Swal.fire({
      title:'Stock superado',
      icon:'error'
    })
  }
  sumarTotales();
  if(totalimpuesto>0){
   inputComprobante.className='d-flex'
  }
  else{
    inputComprobante.className='d-none'
  }
  $("td").each(function () {
    $(this).attr("style", "text-align:center; padding: 2px");
  });
  $("th").each(function () {
    $(this).attr("style", "text-align:center");
  });
}

//Ejecutar métodos con el submit del form
$("#formu").on("submit", (e) => {
  e.preventDefault();
  let cant = $("#cantidad").val();
  let precio = $("#precio").val();
  if (!isNaN(cant) && !isNaN(precio) && cant > 0 && precio > 0) {
    facturarProducto();
    limpiarInputs();

  } else {
    Swal.fire({
      title: "Revise los datos",
      icon: "error",
      confirmButtonColor: "#E97F78",
    });
  }
});

//Método para limpiar inputs
function limpiarInputs() {
  $("input[type=number]").each(function () {
    $(this).val("");
  });
  $("#cantidad").val("1");

}

//Validar si el producto ya fue facturado
function validarProducto(producto) {
  $("td").each(function () {
    if ($(this).text() == producto) {
      let id = $(this).attr("id");
      let fila = document.getElementById(id);
      document.getElementById("tbcuerpo").removeChild(fila.parentElement);
    }
  });
}

let montoPagado=0;
function asignarMonto() {
  Swal.fire({
    customClass: {
      popup: "ocultar",
    },
    title: "Monto pagado",
    input: "number",
    inputValue: Math.ceil(totalVenta),
    inputAttributes: {
      autocapitalize: "off",
      min: 0,
      placeholder: "Ingresa monto",
    },
    showCancelButton: true,
    confirmButtonText: "Cobrar",
    preConfirm: (monto) => {
      if(monto>0){
        montoPagado = monto;
      }
     
      calcularPago();
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.close();
      setTimeout(() => {
        confirmarAccion();
      }, 500);
    }
  });
}
function calcularPago() {
  document.getElementById("pagado").innerText =
    "Pagó: " + formatter.format(montoPagado);
  if (montoPagado < totalVenta) {
    document.getElementById("resta").innerText =
      "Debe: " + formatter.format(totalVenta - montoPagado);
      tipo='Semicrédito';
      subirDeuda(clienteId, totalVenta - montoPagado )
      insertarCuenta(clienteId, totalVenta-montoPagado, today, totalVenta-montoPagado)
  } else if (montoPagado > totalVenta) {
    document.getElementById("resta").innerText =
      "Devuelta: " + formatter.format(montoPagado - totalVenta);
      tipo='Al Contado'
  }
  if(montoPagado==0){
    tipo='Crédito';
  }
 
    $('#spImpuesto').html(
      'Subt.: '+formatter.format(tsubtotal)+'<br>'+
      'ITBIS: '+formatter.format(totalimpuesto)+'<br>'+
      'Total: '+formatter.format(ttotal)
    );
  
}
function confirmarAccion() {
  Swal.fire({
    title: "¿Desea imprimir la factura?",
    showCancelButton: true,
    confirmButtonText: `Imprimir`,
    confirmButtonColor:'#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: "Sólo guardar",
  }).then((result) => {
    guardarVenta();
    if (result.isConfirmed) {
   setTimeout(() => {
    window.print();
   }, 500);
    } else {
      guardarFactura();
      insertarFactura();
    }
  });
}
window.onafterprint = () => {
  guardarFactura();
  insertarFactura();
};
function cobrarFactura() {
  $(".ocultar").each(function () {
    $(this).attr("data-html2canvas-ignore", "true");
    
  });
  $('#totalesFactura').attr("data-html2canvas-ignore", "true");
  let nfc=document.getElementById('NFC');
  if(nfc.value==""){
  nfc.value="N/A";
  }
  if (totalVenta > 0 && $("#nomCliente").text() != "") {
  $("#cargando").show();

  descontarProducto();

    asignarMonto();
  } else {
    Swal.fire({
      title: "Faltan datos",
      icon: "error",
      confirmButtonColor: "#3085d6",
    });
  $("#cargando").hide();

  }
}

$("#cantidad").on("keypress", function (e) {
  if (e.which === 13) {
    $("#btnAdd").trigger("click");
    $("#productoId").trigger("focus");
  }
});

//Guardar la factura en path.join(__dirname, 'scripts','facturas',nombre)
function guardarFactura() {
  var element = document.body;
  var filename =
    codCliente +
    "_" +
    'fct_'+
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
  ruta=filename+'.pdf';
  html2pdf().set(opt).from(element).save();

  setTimeout(() => {
    Swal.fire({
      title:'Factura guardada',
      icon:'success'
    }).then(()=>{
      require("electron").ipcRenderer.send("reloadNFactura", "arg");
    })
  }, 1500);
}

//Determinar número de factura
function numeroFactura() {
  const dir = path.join(__dirname, "../", "scripts", "facturas");
  numFact = 0;
  fs.readdir(dir, (err, files) => {
   if(!err){
    numFact = files.length + 1;
    $("#spFactura").text(numFact);
   } else{
     alert(err)
   }
  });
}
function guardarVenta() {
  let debido=0;
  if(totalVenta-montoPagado>0){
    debido=totalVenta-montoPagado;
  }
  let datosVentas=[clienteId, tipo, 'N/A',today, tsubtotal, totalimpuesto, ttotal, montoPagado, debido.toFixed(2)];
  ventas.insertarVenta(datosVentas);
}
function insertarFactura() {
  let datosFactura=[clienteId, totalVenta, today, ruta, tipo]
  facturas.insertarFactura(datosFactura);
}
function descontarProducto() {
  $(".tdcantidad").each(function () {
    let id=$(this).attr("id").substr(1);
    let cant=$(this).text();
    let dataDiscount=[cant, id];
    data.descontarProducto(dataDiscount);
  })
}
function subirDeuda(clienteId, Deuda) {
  let datosDeuda=[Deuda, clienteId];
  clientes.subirDeuda(datosDeuda);
}
function insertarCuenta(cliente, monto, fecha, restante) {
  let datosCuenta=[ monto, fecha, restante, cliente];
  cuentas.insertarCuenta(datosCuenta);
}