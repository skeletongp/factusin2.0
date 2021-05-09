const sqlite3 = require('sqlite3').verbose();
const { resolve } = require('path');
const path = require('path');

 
    let db = new sqlite3.Database(path.join(__dirname, '../', 'data', 'database.db'));
      let getAllProviders="Select *  From tbProveedores where Nota!='Borrado' Order By Proveedor";
  
 

    const getProviders = sqlProveedor => new Promise((resolve, reject) => {
      
      db.all(sqlProveedor, (err, row) => {
        if (err) {
          reject(err);   
        } else {
          resolve(row);
        }
      
      })
    });
    const deleteSomeProviders = (ids) => new Promise((resolve, reject) => {
        ids=ids.toString();

        let deleteSevProv="UPDATE tbProveedores set Nota='Borrado' Where ProveedorId IN ("+ids+")";
        let stm=db.prepare(deleteSevProv);
        console.log(stm.sql)
        stm.run((err, row) => {
          if (err) {
            reject(err);   
          } else {
            resolve(row)
          }
        })
      });
      const deleteOneProvider = (id) => new Promise((resolve, reject) => {
        id=id.toString();
        let deleteSevProv="UPDATE tbProveedores set Nota='Borrado' Where ProveedorId="+id+"";
        let stm=db.prepare(deleteSevProv);
        console.log(stm.sql)
        stm.run((err, row) => {
          if (err) {
            reject(err);   
          } else {
            resolve(row)
          }
        })
      });

      let sqlInsertProveedor="INSERT INTO tbProveedores (Codigo, Proveedor, Telefono, Direccion, Nota, Deuda, Correo, LastBuy, FechaRegistro) Values(?, ?,?, ?, ?, ?, ?, ?, ?)";
    const insertProvider=(sqlInsertProveedor, values)=>new Promise((resolve, reject)=>{
      let stm=db.prepare(sqlInsertProveedor);
      stm.run((values), (err, row)=>{
        if(err){
          reject(err)
        }else{
          resolve(row)
        }
      })
      stm.finalize();
    })
    let sqlEditarProveedor="UPDATE tbProveedores set Codigo=?, Proveedor=?, Telefono=?, Direccion=?, Nota=?, Correo=? Where ProveedorId=?"
    const editProvider=(values)=> new Promise ((resolve,  reject)=>{

        let stm=db.prepare(sqlEditarProveedor);
        alert(sqlEditarProveedor + values)
        stm.run((values),(err, row)=>{

            if(err){
                alert(err)
            }else{
                resolve(row)
            }
        })
        stm.finalize();
    })


    const getOneProvider = getOnlyProduct => new Promise((resolve, reject) => {
        db.all(getOnlyProduct, (err, row) => {
          if (err) {
            reject(err);   
          } else {
            resolve(row);
          }
        })
      });

    function getProveedores() {
        return getProviders(getAllProviders);
    }

    function borrarVariosProveedores(ids) {
        return deleteSomeProviders(ids)
    }
    function borrarUnProveedor(id) {
        return deleteOneProvider(id)
    }
    function insertarProveedor(values) {
        return insertProvider(sqlInsertProveedor,values);
    }
    function editarProveedor(values) {
        return editProvider(values);
    }
    function getUnProveedor(id) {
        let getOneProviders="Select *  From tbProveedores where Nota!='Borrado' AND ProveedorId="+id+" Order By Proveedor";
        return getOneProvider(getOneProviders)
    }

    module.exports.proveedores=getProveedores;
    module.exports.borrarVariosProveedores=borrarVariosProveedores;
    module.exports.borrarUnProveedor=borrarUnProveedor;
    module.exports.insertarProveedor=insertarProveedor;
    module.exports.editarProveedor=editarProveedor;
    module.exports.unProveedor=getUnProveedor;
