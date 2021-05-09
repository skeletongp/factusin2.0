const sqlite3 = require('sqlite3').verbose();
const { resolve } = require('path');
const path = require('path');

 
    let db = new sqlite3.Database(path.join(__dirname, '../', 'data', 'database.db'));
      let getAllClientes="Select * from tbClientes" ;

    

    const getClientes = getAllClientes => new Promise((resolve, reject) => {
      
      db.all(getAllClientes, (err, row) => {
        if (err) {
          reject(err);   
        } else {
          resolve(row);
        }
      
      })
    });

    let sqlInsertCliente="INSERT INTO tbClientes (Codigo, Cliente, Telefono, Direccion, Correo, Nota, Deuda, LastBuy, FechaRegistro) Values( ?, ?,?, ?, ?, ?, ?, ?, ?)";
    const insertCliente=(sqlInsertCliente, values)=>new Promise((resolve, reject)=>{
      let stm=db.prepare(sqlInsertCliente);
      stm.run((values), (err, row)=>{
        if(err){
          reject(err)
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

    let sqlIncrementarCuenta="Update tbClientes set Deuda=Deuda+? Where ClienteId=?";
    const upDeuda=((sqlIncrementarCuenta, values)=> new Promise((resolve,reject)=>{
      let  stm=db.prepare(sqlIncrementarCuenta);
      stm.run((values),(err, row)=>{
        if(err){
          reject(err);
        }else{
          resolve(row);
        }
      })
      stm.finalize();
    }))

    let sqlDecrementarDeuda="Update tbClientes set Deuda=Deuda-? Where ClienteId=?";
    const downDeuda=((sqlDecrementarDeuda, values)=> new Promise((resolve,reject)=>{
      let  stm=db.prepare(sqlDecrementarDeuda);
      stm.run((values),(err, row)=>{
        if(err){
          alert(err);
        }else{
          resolve(row);
        }
      })
      stm.finalize();
    }))

  function clientes(keyword) {
      return getClientes(getAllClientes);
  }
  function unCliente(id) {
    return getOneCliente(sqlOneClient+id);
  }
  function insertarCliente(values) {
    insertCliente(sqlInsertCliente, values)
  }
  function editarCliente(values) {
    return editCliente(sqlEditClient, values)
  }

  function borrarCliente(id) {
    return deleteCliente(sqlDeleteClient, id);
  }

  function subirDeuda(values) {
    upDeuda(sqlIncrementarCuenta, values)
  }

  function bajarDeuda(values) {
    downDeuda(sqlDecrementarDeuda, values)
  }
  module.exports.clientes=clientes;
  module.exports.unCliente=unCliente;
  module.exports.insertarCliente=insertarCliente;
  module.exports.editarCliente=editarCliente;
  module.exports.borrarCliente=borrarCliente;
  module.exports.subirDeuda=subirDeuda;
  module.exports.bajarDeuda=bajarDeuda;