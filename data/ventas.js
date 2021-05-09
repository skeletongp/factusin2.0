const sqlite3 = require('sqlite3').verbose();
const { resolve } = require('path');
const path = require('path');

 
    let db = new sqlite3.Database(path.join(__dirname, '../', 'data', 'database.db'));
      let getAllVentas="Select v.VentaId, v.ClienteId, v.Fecha, v.Tipo, v.Subtotal, v.Pagado, v.Impuesto, v.Total, v.Debido, c.Cliente from tbVentas v inner join tbClientes c on c.ClienteId=v.ClienteId" ;
      let sqlGetVentasPorCliente="Select v.VentaId, v.ClienteId, v.Fecha, v.Tipo,sum (v.Subtotal) as Subtotal, sum(v.Pagado) as Pagado, sum(v.Impuesto) as Impuesto, "+ 
      "sum(v.Total) as Total, sum(v.Debido) as Debido, c.Cliente from tbVentas v inner join tbClientes c on c.ClienteId=v.ClienteId group By c.Cliente";
      let sqlGetVentasPorFecha="Select v.VentaId, v.ClienteId, v.Fecha, v.Tipo,sum (v.Subtotal) as Subtotal, sum(v.Pagado) as Pagado, sum(v.Impuesto) as Impuesto, "+ 
      "sum(v.Total) as Total, sum(v.Debido) as Debido, c.Cliente from tbVentas v inner join tbClientes c on c.ClienteId=v.ClienteId group By v.Fecha order by v.VentaId";



    const getVentas = getAllVentas => new Promise((resolve, reject) => {
      
      db.all(getAllVentas, (err, row) => {
        if (err) {
          reject(err);   
        } else {
          resolve(row);
        }
      
      })
    });
    const getVentasPorCliente = sqlGetVentasPorCliente => new Promise((resolve, reject) => {
      
      db.all(sqlGetVentasPorCliente, (err, row) => {
        if (err) {
          reject(err);   
        } else {
          resolve(row);
        }
      
      })
    });
    const getVentasPorFecha = sqlGetVentasPorFecha => new Promise((resolve, reject) => {
      
      db.all(sqlGetVentasPorFecha, (err, row) => {
        if (err) {
          reject(err);   
        } else {
          resolve(row);
        }
      
      })
    });

    let sqlInsertVenta="INSERT INTO tbVentas (ClienteId, Tipo, Comprobante, Fecha, Subtotal, Impuesto, Total, Pagado, Debido) Values( ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const insertVenta=(sqlInsertVenta, values)=>new Promise((resolve, reject)=>{
      let stm=db.prepare(sqlInsertVenta);
      stm.run((values), (err, row)=>{
        if(err){
          alert(err)
        }else{
          console.log('Insertado')
        }
      })
      stm.finalize();
    })

    let sqlOneClient='Select * from tbClientes Where ClienteId=';
    const getOneCliente = sqlOneClient => new Promise((resolve, reject) => {
      db.all(sqlOneClient, (err, row) => {
        if (err) {
          reject(err);   
        } else {
          resolve(row);
        }
      })
    });

    let sqlEditClient="Update tbClientes set Cliente=?, Telefono=?, Correo=?, Direccion=?, Nota=? Where ClienteId=?"
    const editCliente=(sqlEditClient, values)=>new Promise ((resolve, reject)=>{
      let stm=db.prepare(sqlEditClient);
      stm.run((values), (err, row)=>{
        if(err){
          alert (err)
        } else{
          resolve (row)
        }
      })
      stm.finalize();
    });

    let sqlDeleteClient="Update tbClientes set Estado='Borrado' Where ClienteId=?";
    const deleteCliente=((sqlDeleteClient, id)=>new Promise((resolve, reject)=>{
      let stm=db.prepare(sqlDeleteClient);
      stm.run((id), (err, row)=>{
        if(err){
          reject(err);
        }else{
          resolve(row);
        }
      })
      stm.finalize();
    }))

  function ventas() {
      return getVentas(getAllVentas);
  }
  function ventasPorCliente() {
      return getVentasPorCliente(sqlGetVentasPorCliente);
  }
  function ventasPorFecha() {
      return getVentasPorFecha(sqlGetVentasPorFecha);
  }
  function unCliente(id) {
    return getOneCliente(sqlOneClient+id);
  }
  function insertarVenta(values) {
    insertVenta(sqlInsertVenta, values)
  }
  function editarCliente(values) {
    return editCliente(sqlEditClient, values)
  }

  function borrarCliente(id) {
    return deleteCliente(sqlDeleteClient, id);
  }

  module.exports.ventas=ventas;
  module.exports.ventasPorCliente=ventasPorCliente;
  module.exports.ventasPorFecha=ventasPorFecha;
  module.exports.unCliente=unCliente;
  module.exports.insertarVenta=insertarVenta;
  module.exports.editarCliente=editarCliente;
  module.exports.borrarCliente=borrarCliente;