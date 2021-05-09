const sqlite3 = require("sqlite3").verbose();
const { resolve } = require("path");
const path = require("path");

let db = new sqlite3.Database(
  path.join(__dirname, "../", "data", "database.db")
);
let sqlGetAllFacturas =
  "Select *, c.Cliente from tbFacturas f inner join tbClientes c on c.ClienteId=f.ClienteId Order By FacturaId Desc";

const getAllFacturas = (sqlGetAllFacturas) =>
  new Promise((resolve, reject) => {
    db.all(sqlGetAllFacturas, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
let sqlGetAllCotizaciones =
  "Select *, c.Cliente from tbCotizaciones f inner join tbClientes c on c.ClienteId=f.ClienteId Order By CotizacionId Desc";
const getAllCotizaciones = (sqlGetAllCotizaciones) =>
  new Promise((resolve, reject) => {
    db.all(sqlGetAllCotizaciones, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });

let sqlGetAllRecurrentes =
  "Select *, c.Cliente from tbCobros f inner join tbClientes c on c.ClienteId=f.ClienteId";
const getAllRecurrentes = (sqlGetAllRecurrentes) =>
  new Promise((resolve, reject) => {
    db.all(sqlGetAllRecurrentes, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });

let sqlInsertFactura =
  "INSERT INTO tbFacturas (ClienteId, Monto, Fecha, Ruta, Tipo) Values(?, ?, ?, ?, ?)";
const insertFactura = (sqlInsertFactura, values) =>
  new Promise((resolve, reject) => {
    let stm = db.prepare(sqlInsertFactura);
    stm.run(values, (err, row) => {
      if (err) {
        alert(err);
      } else {
        console.log("Insertado");
      }
    });
    stm.finalize();
  });
let sqlInsertCotizacion =
  "INSERT INTO tbCotizaciones (ClienteId, Monto, Fecha, Ruta) Values(?, ?, ?, ?)";
const insertCotizacion = (sqlInsertCotizacion, values) =>
  new Promise((resolve, reject) => {
    let stm = db.prepare(sqlInsertCotizacion);
    stm.run(values, (err, row) => {
      if (err) {
        alert(err);
      } else {
        console.log("Insertado");
      }
    });
    stm.finalize();
  });
let sqlInsertRecurrente =
  "INSERT INTO tbCobros (ClienteId, Monto, Fecha, Ruta) Values(?, ?, ?, ?)";
const insertRecurrente = (sqlInsertRecurrente, values) =>
  new Promise((resolve, reject) => {
    let stm = db.prepare(sqlInsertRecurrente);
    stm.run(values, (err, row) => {
      if (err) {
        alert(err);
      } else {
        console.log("Insertado");
      }
    });
    stm.finalize();
  });

function facturas() {
  return getAllFacturas(sqlGetAllFacturas);
}

function cotizaciones() {
  return getAllCotizaciones(sqlGetAllCotizaciones);
}

function recurrentes() {
  return getAllRecurrentes(sqlGetAllRecurrentes);
}

function insertarFactura(values) {
  insertFactura(sqlInsertFactura, values);
}

function insertarCotizacion(values) {
  insertCotizacion(sqlInsertCotizacion, values);
}
function insertarRecurrente(values) {
  insertRecurrente(sqlInsertRecurrente, values)
}
module.exports.facturas = facturas;
module.exports.cotizaciones = cotizaciones;
module.exports.recurrentes = recurrentes;
module.exports.insertarFactura = insertarFactura;
module.exports.insertarCotizacion = insertarCotizacion;
module.exports.insertarRecurrente = insertarRecurrente;
