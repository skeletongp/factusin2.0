const sqlite3 = require('sqlite3').verbose();
const { resolve } = require('path');
const path = require('path');

 
    let db = new sqlite3.Database(path.join(__dirname, '../', 'data', 'database.db'));
      let getAllProductos="Select P.ProductoId, P.Codigo, P.Producto, P.Precio, P.Costo, C.Categoria, PP.Pr" +
    "oveedor, P.Existencia, P.Nota, P.Tipo from tbProductos P Inner Join tbCategorias" +
    " C on P.Categoria=C.CategoriaId Inner Join tbProveedores PP on P.ProveedorId=PP." +
    "ProveedorId ORDER BY P.Producto";

    let getOnlyProduct="Select P.ProductoId, P.Codigo, P.Producto, P.Precio, P.Costo, C.Categoria, PP.Pr" +
    "oveedor, P.Existencia, P.Nota, P.Tipo from tbProductos P Inner Join tbCategorias" +
    " C on P.Categoria=C.CategoriaId Inner Join tbProveedores PP on P.ProveedorId=PP." +
    "ProveedorId Where P.ProductoId=";

    const getProducts = getAllProductos => new Promise((resolve, reject) => {
      
      db.all(getAllProductos, (err, row) => {
        if (err) {
          reject(err);   
        } else {
          resolve(row);
        }
      
      })
    });

    let getAllCategories="Select * From tbCategorias ORDER BY Categoria";
    const getCategories = getAllCategories => new Promise((resolve, reject) => {
      db.all(getAllCategories, (err, row) => {
        if (err) {
          reject(err);   
        } else {
          resolve(row);
        }
      })
    });

    let getAllProviders="Select * From tbProveedores Where Nota!='Borrado' ORDER BY Proveedor";
    const getProviders = getAllProviders => new Promise((resolve, reject) => {
      db.all(getAllProviders, (err, row) => {
        if (err) {
          reject(err);   
        } else {
          resolve (row);
        }
      })
    });
    
    let getAllActCat="Select C.Categoria, C.Codigo, COUNT (P.Categoria) as Cantidad from tbCategorias C LEFT JOIN tbProductos P on P.Categoria=C.CategoriaId  GROUP BY C.Categoria order by Cantidad DESC";
    const getActiveCategories = getAllActCat => new Promise((resolve, reject) => {
      db.all(getAllActCat, (err, row) => {
        if (err) {
          reject(err);   
        } else {
          resolve (row);
        }
      })
    });

    const deleteProduct = (deleteOneProduct) => new Promise((resolve, reject) => {
      let stm=db.prepare(deleteOneProduct);
      stm.run((err, row) => {
        if (err) {
          reject(err);   
        } else {
          console.log('Borrado')
        }
      })
    });
    const deleteSomeProducts = (ids) => new Promise((resolve, reject) => {
      ids=ids.toString();
      let deleteSevProduct="Delete from tbProductos Where ProductoId IN ("+ids+")";
      let stm=db.prepare(deleteSevProduct);
      console.log(stm.sql)
      stm.run((err, row) => {
        if (err) {
          reject(err);   
        } else {
          resolve(row)
        }
      })
    });

    const getOneProduct = getOnlyProduct => new Promise((resolve, reject) => {
      db.all(getOnlyProduct, (err, row) => {
        if (err) {
          reject(err);   
        } else {
          resolve(row);
        }
      })
    });
    let insertedProducto="INSERT INTO tbProductos (Codigo, Producto, Precio, Costo, Categoria, ProveedorId, Existencia, Nota, Tipo, FechaRegistro) Values(?, ?, ?,?, ?, ?, ?, ?, ?, ?)";
    const insertProduct=(insertedProducto, values)=>new Promise((resolve, reject)=>{
      let stm=db.prepare(insertedProducto);
      stm.run((values), (err, row)=>{
        if(err){
          reject(err)
        }else{
          console.log('Insertado')
        }
      })
      stm.finalize();
    })
    let insertedCat="INSERT INTO tbCategorias (Codigo, Categoria) Values(?, ?)";
    const insertCat=(insertedCat, values)=>new Promise((resolve, reject)=>{
      let stm=db.prepare(insertedCat);
      stm.run((values), (err, row)=>{
        if(err){
          reject(err)
        }else{
          console.log('Insertado')
        }
      })
      stm.finalize();
    })

    const insertSevProduct=(values)=>new Promise((resolve, reject)=>{
      let insertedProducto="INSERT INTO tbProductos (Codigo, Producto, Precio, Costo, Categoria, ProveedorId, Existencia, Nota, Tipo, FechaRegistro) Values(?, ?, ?,?, ?, ?, ?, ?, ?, ?)";
      let stm=db.prepare(insertedProducto);
      let cantidad=values.length;
      for (let index = 1; index < cantidad; index++) {
        const element = values[index];
        stm.run((element), (err, row)=>{
          if(err){
            alert(err)
          }else{
            console.log('Insertado')
          }
        })
      }
      stm.finalize();
    })

    
    let editedProducto="UPDATE tbProductos set Codigo=?, Producto=?, Precio=?, Costo=?, Categoria=?, ProveedorId=?, Existencia=?, Nota=?, Tipo=? Where ProductoId=?";
    const editProduct=(editedProducto, values)=>new Promise((resolve, reject)=>{
      let stm=db.prepare(editedProducto);
      stm.run((values), (err, row)=>{
        if(err){
          reject(err)
        }else{
          console.log('Actualizado')
        }
      })
      stm.finalize();
    })

    let sqlDiscountProducto="Update tbProductos set Existencia=Existencia-? Where ProductoId=?"
    const discountProduct=(sqlDiscountProducto, values)=> new Promise((resolve, reject)=>{
      let stm=db.prepare(sqlDiscountProducto);
      stm.run((values), (err, row)=>{
        if(err){
          alert(err)
        }else{
          resolve(row)
        }
      })
    })

    let deleteOneProduct="Delete from tbProductos Where ProductoId=";

    const categorias = getCategories(getAllCategories);
    const proveedores = getProviders(getAllProviders);
    


    function productos() {
      return getProducts(getAllProductos);
    }

    function  activeCategorias() {
      return getActiveCategories(getAllActCat);
    }
    function borrarProducto(id) {
          deleteProduct(deleteOneProduct+id);
    }
    function borrarVariosProductos(aBorrar) {
   
      deleteSomeProducts( aBorrar);
    
    }
    function getProducto(id) {
      return getOneProduct(getOnlyProduct+id);
    }
    
    function insertProducto(values) {
       insertProduct(insertedProducto,values)
    }
    function insertCategoria(values) {
       insertCat(insertedCat,values)
    }
    function insertSevProducto(values) {
      insertSevProduct(values)
   }
    function editProducto(values) {
      editProduct(editedProducto, values)
   }
   function descontarProducto(values) {
     discountProduct(sqlDiscountProducto, values);
   }
    module.exports.productos=productos;
    module.exports.categorias=categorias;
    module.exports.proveedores=proveedores;
    module.exports.borrarProducto=borrarProducto;
    module.exports.borrarVariosProducto=borrarVariosProductos;
    module.exports.unProducto=getProducto;
    module.exports.insertarProducto=insertProducto;
    module.exports.insertarCategoria=insertCategoria;
    module.exports.insertarVariosProducto=insertSevProducto;
    module.exports.editarProducto=editProducto;
    module.exports.categoriasActivas=activeCategorias;
    module.exports.descontarProducto=descontarProducto;
   
