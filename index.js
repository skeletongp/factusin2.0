// / Importación de módulos
const { app, Menu, ipcMain, BrowserWindow, globalShortcut } = require("electron");

const electron = require("electron");
const path = require("path");
const url = require("url");

let ventana;
let estado=false;
const { session } = require('electron')


Menu.setApplicationMenu(null)
/*if (process.env.NODE.ENV !== 'production') {
  require('electron-reload')(__dirname, 'main', {})
}*/

// -----------------------------------------------------------------------------
// / /
// -----------------------------------------------------------------------------
// / /
// -----------------------------------------------------------------------------
// / / Creación de ventanas

//Ventana principal
let mainWindow;
function createWindow(width, height) {
  width = 1280;
  height = 860;
  mainWindow = new BrowserWindow({
    minHeight: height,
    minWidth: width,
    height: height,
    width: width,
    maxHeight: height,
    maxWidth: width,
    frame: false,
    maximizable:false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "html", "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  mainWindow.setMenu(null);

  ventana = mainWindow;
  
  mainWindow.on("ready-to-show", () => {

    mainWindow.show();
  });
}

//Productos
let productWindow;
function createProductWindow(width, height) {
  width = 1280;
  height = 860;
  productWindow = new BrowserWindow({
    minHeight: height,
    minWidth: width,
    height: height,
    show: false,
    width: width,
    
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });
  productWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "html", "vntProductos.html"),
      slashes: true,
    })
  );
  productWindow.setMenu(null);
  productWindow.on("ready-to-show", () => {
    productWindow.show();
    if(ventana.isMaximized()){
      productWindow.maximize();
    }
      
    ventana.destroy();
    ventana = BrowserWindow.getFocusedWindow();
  });
}

//Inventario General
let vntTotalCosto;
function createTotalCostoWindow(width, height) {
  width = 1280;
  height = 860;
  vntTotalCosto = new BrowserWindow({
    minHeight: height,
    minWidth: width,
    height: height,
    show: false,
    width: width,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });
  vntTotalCosto.loadURL(
    url.format({
      pathname: path.join(__dirname, "html", "vntTotalCosto.html"),
      slashes: true,
    })
  );
  vntTotalCosto.setMenu(null);
  vntTotalCosto.on("ready-to-show", () => {
    vntTotalCosto.show();
    if(ventana.isMaximized()){
      vntTotalCosto.maximize();
    }
    ventana.destroy();
    ventana = BrowserWindow.getFocusedWindow();
  });
}

//Proveedores
let provideWindow;
function createProvideWindow(width, height) {
  width = 1280;
  height = 860;
  provideWindow = new BrowserWindow({
    minHeight: height,
    minWidth: width,
    height: height,
    width: width,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });
  provideWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "html", "vntProveedores.html"),
      slashes: true,
    })
  );
  provideWindow.setMenu(null);
  provideWindow.on("ready-to-show", () => {
    provideWindow.show();
    if(ventana.isMaximized()){
      provideWindow.maximize();
    }
    ventana.destroy();
    ventana = BrowserWindow.getFocusedWindow();
  });
}

//Servicios
let serviceWindow;
function createServiceWindow(width, height) {
  width = 1280;
  height = 860;
  serviceWindow = new BrowserWindow({
    minHeight: height,
    minWidth: width,
    height: height,
    width: width,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });
  serviceWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "html", "vntServicios.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  serviceWindow.setMenu(null);
  serviceWindow.on("ready-to-show", () => {
    serviceWindow.show();
    if(ventana.isMaximized()){
      serviceWindow.maximize();
    }
    ventana.destroy();
    ventana = BrowserWindow.getFocusedWindow();
  });
}

//Proveedores Inactivos
let pInactivosWindoe;
function createpInactiveWindow(width, height) {
  width = 1280;
  height = 860;
  pInactivosWindoe = new BrowserWindow({
    minHeight: height,
    minWidth: width,
    height: height,
    width: width,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });
  pInactivosWindoe.loadURL(
    url.format({
      pathname: path.join(__dirname, "html", "vntProveedoresInactivos.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  pInactivosWindoe.setMenu(null);
  pInactivosWindoe.on("ready-to-show", () => {
    pInactivosWindoe.show();
    if(ventana.isMaximized()){
      pInactivosWindoe.maximize();
    }
    ventana.destroy();
    ventana = BrowserWindow.getFocusedWindow();
  });
}

//Proovedores nuevos
let pNuevosWindow;
function createpNuevosWindow(width, height) {
  width = 1280;
  height = 940;
  pNuevosWindow = new BrowserWindow({
    minHeight: height,
    minWidth: width,
    height: height,
    width: width,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });
  pNuevosWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "html", "vntProveedoresNuevos.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  pNuevosWindow.setMenu(null);
  pNuevosWindow.on("ready-to-show", () => {
    pNuevosWindow.show();
    if(ventana.isMaximized()){
      pNuevosWindow.maximize();
    }
    ventana.destroy();
    ventana = BrowserWindow.getFocusedWindow();
  });
}

//Clientes
let clientWindow;
function createClientesWindow(width, height) {
  width = 1280;
  height = 860;
  clientWindow = new BrowserWindow({
    minHeight: height,
    minWidth: width,
    height: height,
    width: width,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });
  clientWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "html", "vntClientes.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  clientWindow.setMenu(null);
  clientWindow.on("ready-to-show", () => {
    clientWindow.show();
    if(ventana.isMaximized()){
      clientWindow.maximize();
    }
    ventana.destroy();
    ventana = BrowserWindow.getFocusedWindow();
  });
}

//Nueva Factura
let nFacturaWindow;
function createNFacturaWindow(width, height) {
  width = 1280;
  height = 860;
  nFacturaWindow = new BrowserWindow({
    minHeight: height,
    minWidth: width,
    height: height,
    width: width,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });
  nFacturaWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "html", "vntNFactura.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  nFacturaWindow.setMenu(null);
  nFacturaWindow.on("ready-to-show", () => {
    nFacturaWindow.show();
    if(ventana.isMaximized()){
      nFacturaWindow.maximize();
    }
    ventana.destroy();
    ventana = BrowserWindow.getFocusedWindow();
  });
}
//Historial de facturas
let facturasWindow;
function createFacturasWindows(width, height) {
  width = 1280;
  height = 860;
  facturasWindow = new BrowserWindow({
    minHeight: height,
    minWidth: width,
    height: height,
    width: width,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });
  facturasWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "html", "vntFacturas.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  facturasWindow.setMenu(null);
  facturasWindow.on("ready-to-show", () => {
    facturasWindow.show();
    if(ventana.isMaximized()){
      facturasWindow.maximize();
    }
    ventana.destroy();
    ventana = BrowserWindow.getFocusedWindow();
  });
}

//Ventana de Cotización
let cotizarWindow;
function createCotizarWindow(width, height) {
  width = 1280;
  height = 860;
  cotizarWindow = new BrowserWindow({
    minHeight: height,
    minWidth: width,
    height: height,
    width: width,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });
  cotizarWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "html", "vntCotizar.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  cotizarWindow.setMenu(null);
  cotizarWindow.on("ready-to-show", () => {
    cotizarWindow.show();
    if(ventana.isMaximized()){
      cotizarWindow.maximize();
    }
    ventana.destroy();
    ventana = BrowserWindow.getFocusedWindow();
  });
}

//Ventana Por Cobrar
let porCobrarWindow;
function createPorCobrarWindow(width, height) {
  width = 1280;
  height = 860;
  porCobrarWindow = new BrowserWindow({
    minHeight: height,
    minWidth: width,
    height: height,
    width: width,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });
  porCobrarWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "html", "vntPorCobrar.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  porCobrarWindow.setMenu(null);
  porCobrarWindow.on("ready-to-show", () => {
    porCobrarWindow.show();
    if(ventana.isMaximized()){
      porCobrarWindow.maximize();
    }
    ventana.destroy();
    ventana = BrowserWindow.getFocusedWindow();
  });
}
//Ventana de Cotizaciones
let cotizacionWindow;
function createCotizacionesWindows(width, height) {
  width = 1280;
  height = 860;
  cotizacionWindow = new BrowserWindow({
    minHeight: height,
    minWidth: width,
    height: height,
    width: width,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });
  cotizacionWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "html", "vntCotizaciones.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  cotizacionWindow.setMenu(null);
  cotizacionWindow.on("ready-to-show", () => {
    cotizacionWindow.show();
    if(ventana.isMaximized()){
      cotizacionWindow.maximize();
    }
    ventana.destroy();
    ventana = BrowserWindow.getFocusedWindow();
  });
}
//Ventana de Pagos Recurrentes
let recurrenteWindow;
function createRecurrenteWindow(width, height) {
  width = 1280;
  height = 860;
  recurrenteWindow = new BrowserWindow({
    minHeight: height,
    minWidth: width,
    height: height,
    width: width,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });
  recurrenteWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "html", "vntRecurrentes.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  recurrenteWindow.setMenu(null);
  recurrenteWindow.on("ready-to-show", () => {
    recurrenteWindow.show();
    if(ventana.isMaximized()){
      recurrenteWindow.maximize();
    }
    ventana.destroy();
    ventana = BrowserWindow.getFocusedWindow();
  });
}
//Ventana de Ventas Generales
let ventasWindow;
function createVentasWindow(width, height) {
  width = 1280;
  height = 860;
  ventasWindow = new BrowserWindow({
    minHeight: height,
    minWidth: width,
    height: height,
    width: width,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });
  ventasWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "html", "vntVentas.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  ventasWindow.setMenu(null);
  ventasWindow.on("ready-to-show", () => {
    ventasWindow.show();
    if(ventana.isMaximized()){
      ventasWindow.maximize();
    }
    ventana.destroy();
    ventana = BrowserWindow.getFocusedWindow();
  });
}
//Ventana de Ventas Por Cliente
let porClienteWindow;
function createPorClienteWindow(width, height) {
  width = 1280;
  height = 860;
  porClienteWindow = new BrowserWindow({
    minHeight: height,
    minWidth: width,
    height: height,
    width: width,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });
  porClienteWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "html", "vntPorCliente.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  porClienteWindow.setMenu(null);
  porClienteWindow.on("ready-to-show", () => {
    porClienteWindow.show();
    if(ventana.isMaximized()){
      porClienteWindow.maximize();
    }
    ventana.destroy();
    ventana = BrowserWindow.getFocusedWindow();
  });
}
//Ventana de Ventas Por Fecha
let porFechaWindow;
function createPorFechaWindow(width, height) {
  width = 1280;
  height = 860;
  porFechaWindow = new BrowserWindow({
    minHeight: height,
    minWidth: width,
    height: height,
    width: width,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });
  porFechaWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "html", "vntPorFecha.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  porFechaWindow.setMenu(null);
  porFechaWindow.on("ready-to-show", () => {
    porFechaWindow.show();
    if(ventana.isMaximized()){
      porFechaWindow.maximize();
    }
    ventana.destroy();
    ventana = BrowserWindow.getFocusedWindow();
  });
}
//Abrirventanas

ipcMain.on("abrirProductos", (e, arg) => {
  if (BrowserWindow.getFocusedWindow() != productWindow) {
    createProductWindow();
  }
});
ipcMain.on("abrirProveedores", (e, arg) => {
  if (BrowserWindow.getFocusedWindow() != provideWindow) {
    createProvideWindow();
  }
});

ipcMain.on("abriServicios", (e, arg) => {
  if (BrowserWindow.getFocusedWindow() != serviceWindow) {
    createServiceWindow();
  }
});
ipcMain.on("abrirTotalCosto", (e, arg) => {
  if (BrowserWindow.getFocusedWindow() != vntTotalCosto) {
    createTotalCostoWindow();
  }
});

ipcMain.on("abrirProveedoresInactivos", (e, arg) => {
  if (BrowserWindow.getFocusedWindow() != pInactivosWindoe) {
    createpInactiveWindow();
  }
});
ipcMain.on("abrirProveedoresNuevos", (e, arg) => {
  if (BrowserWindow.getFocusedWindow() != pNuevosWindow) {
    createpNuevosWindow();
  }
});
ipcMain.on("abrirClientes", (e, arg) => {
  if (BrowserWindow.getFocusedWindow() != vntTotalCosto) {
    createClientesWindow();
  }
});
ipcMain.on("abrirNFactura", (e, arg) => {
  if (BrowserWindow.getFocusedWindow() != nFacturaWindow) {
    createNFacturaWindow();
  }
});
ipcMain.on("abrirFacturas", (e, arg) => {
  if (BrowserWindow.getFocusedWindow() != facturasWindow) {
    createFacturasWindows();
  }
});

ipcMain.on("abrirCotizar", (e, arg) => {
  if (BrowserWindow.getFocusedWindow() != cotizarWindow) {
    createCotizarWindow();
  }
});

ipcMain.on("abrirPorCobrar", (e, arg) => {
  if (BrowserWindow.getFocusedWindow() != porCobrarWindow) {
    createPorCobrarWindow();
  }
});
ipcMain.on("abrirCotizaciones", (e, arg) => {
  if (BrowserWindow.getFocusedWindow() != cotizacionWindow) {
    createCotizacionesWindows();
  }
});
ipcMain.on("abrirRecurrentes", (e, arg) => {
  if (BrowserWindow.getFocusedWindow() != recurrenteWindow) {
    createRecurrenteWindow();
  }
});
ipcMain.on("abrirVentas", (e, arg) => {
  if (BrowserWindow.getFocusedWindow() != ventasWindow) {
    createVentasWindow();
  }
});
ipcMain.on("abrirPorCliente", (e, arg) => {
  if (BrowserWindow.getFocusedWindow() != porClienteWindow) {
    createPorClienteWindow();
  }
});
ipcMain.on("abrirPorFecha", (e, arg) => {
  if (BrowserWindow.getFocusedWindow() != porFechaWindow) {
    createPorFechaWindow();
  }
});


//Recargar ventanas
ipcMain.on("reloadProduct", (e, arg) => {
  ventana = BrowserWindow.getFocusedWindow();
  createProductWindow();
});

ipcMain.on("reloadProvider", (e, arg) => {
  ventana = BrowserWindow.getFocusedWindow();
  createProvideWindow();
});

ipcMain.on("reloadService", (e, arg) => {
  ventana = BrowserWindow.getFocusedWindow();
  createServiceWindow();
});

ipcMain.on("reloadClient", (e, arg) => {
  ventana = BrowserWindow.getFocusedWindow();
  createClientesWindow();
});

ipcMain.on("reloadNFactura", (e, arg) => {
  ventana = BrowserWindow.getFocusedWindow();
  createNFacturaWindow();
});

ipcMain.on("reloadCotizaciones", (e, arg) => {
  ventana = BrowserWindow.getFocusedWindow();
  createCotizarWindow();
});
ipcMain.on("reloadCxC", (e, arg) => {
  ventana = BrowserWindow.getFocusedWindow();
  createPorCobrarWindow();
});
// / / Eventos del menú

ipcMain.on("minWin", (e, arg) => {
  BrowserWindow.getFocusedWindow().minimize();
});
ipcMain.on("maxWin", (e, arg) => {
  if (BrowserWindow.getFocusedWindow().isMaximized()) {
    BrowserWindow.getFocusedWindow().restore();
  } else {
    if(BrowserWindow.getFocusedWindow!=mainWindow){
      BrowserWindow.getFocusedWindow().maximize();
    }
  }
});

ipcMain.on("goBack", (e, arg) => {
  let ventana = BrowserWindow.getFocusedWindow();
  if (BrowserWindow.getFocusedWindow() != mainWindow) {
    createWindow();
    ventana.close();
  }
});
ipcMain.on("closeWin", (e, arg) => {
  let ventana = BrowserWindow.getFocusedWindow();

  ventana.close();
});
// -----------------------------------------------------------------------------
// / /
// -----------------------------------------------------------------------------
// / /
// -----------------------------------------------------------------------------
// / / Eventos de la App
app.name = "Factusin 2.0";
app.on("ready", () => {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  createWindow(width, height);
  globalShortcut.register("Alt+P", () => {
    if (BrowserWindow.getFocusedWindow() != productWindow) {
      createProductWindow();
    }
  });
  globalShortcut.register("Alt+S", () => {
    if (BrowserWindow.getFocusedWindow() != serviceWindow) {
      createServiceWindow();
    }
  });
  globalShortcut.register("Alt+C", () => {
    if (BrowserWindow.getFocusedWindow() != clientWindow) {
      createClientesWindow();
    }
  });
  globalShortcut.register("Alt+N", () => {
    if (BrowserWindow.getFocusedWindow() != nFacturaWindow) {
      createNFacturaWindow();
    }
  });
  globalShortcut.register("Control+Alt+U", () => {
    if (BrowserWindow.getFocusedWindow() == productWindow) {
      productWindow.webContents.send("subirProductos", "arg");
    }
  });
  globalShortcut.register("Alt+Q", () => {
    BrowserWindow.getFocusedWindow().openDevTools();
  });

  //Al descargar una factura, la guarda automáticamente
  session.defaultSession.on('will-download', (event, item, webContents) => {
    let nombre=item.getFilename();
    if(nombre.includes("fct")){
      item.setSavePath(path.join(__dirname, 'scripts','facturas',nombre))
    } else if(nombre.includes("cot")){
      item.setSavePath(path.join(__dirname, 'scripts','cotizaciones',nombre))
    }else if(nombre.includes("recu")){
      item.setSavePath(path.join(__dirname, 'scripts','facturas', 'recurrentes',nombre))
    }
  })
});

app.on("window-all-closed", () => {
  app.exit();
});
app.on("activate", () => {
  createWindow();
});
