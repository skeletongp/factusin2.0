const sqlite3 = require('sqlite3').verbose();
const { resolve } = require('path');
const path = require('path');

 
    let db = new sqlite3.Database(path.join(__dirname, '../', 'data', 'database.db'));
    
    let getAllAccounts="Select cc.CuentaId, cc.Monto, cc.Fecha, cc.Restante, c.Cliente, c.Telefono, c.Codigo, " 
    +"c.Direccion, c.Correo, c.Deuda, c.LastBuy, c.FechaRegistro, c.ClienteId from tbCxC cC Inner Join tbClientes c Where cC.Cliente=c.ClienteId" ;

    

    const getAccounts = getAllAccounts => new Promise((resolve, reject) => {
      
      db.all(getAllAccounts, (err, row) => {
        if (err) {
          alert(err);   
        } else {
          resolve(row);
        }
      
      })
    });
    const insertCuenta=((values)=>new Promise((resolve, reject)=>{
      let sqlUpdateAccounts="UPDATE tbCxC SET Monto=Monto+?, Fecha=?, Restante=Restante+? WHERE  Cliente=?;"
      let sqlInsertAccounts="INSERT INTO tbCxC (Monto, Fecha, Restante, Cliente) VALUES (?, ?, ?, ?);"
        let stm=db.prepare(sqlInsertAccounts);
        stm.run((values),(err, row)=>{
            if(err){
                let stm2=db.prepare(sqlUpdateAccounts);
                stm2.run((values),(err, row)=>{
                  if(err){
                    reject(err)
      
                  }else{
                      resolve(row)
                  }
              })
            }else{
                resolve(row)
            }
        })
        stm.finalize();
    }))

    const sqlCobrarCuenta="Update tbCxC set Restante=Restante-? Where CuentaId=?";
    const cobrarAccount=((values)=> new Promise((resolve, reject)=>{
      let stm=db.prepare(sqlCobrarCuenta);
      stm.run((values),(err, row)=>{
        if(err){
          alert(err)
        } else{
          resolve(row);
        }
      })
      stm.finalize();
    }))



    function cuentas() {
        return getAccounts(getAllAccounts);
    }

    function insertarCuenta(values) {
        return insertCuenta(values)
    }
    function cobrarCuenta(values) {
      return cobrarAccount(values);
    }
    
    module.exports.cuentas=cuentas;
    module.exports.insertarCuenta=insertarCuenta;
    module.exports.cobrarCuenta=cobrarCuenta;