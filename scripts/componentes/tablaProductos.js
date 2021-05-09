function llenarTabla(producto, tbcuerpo, formatter, abrirEdicion, preguntarBorrar) {
     //Crear elementos para la tabla
     let tr = document.createElement("tr");
     let td0 = document.createElement("td");
     td0.className = "bg-dark text-light";
     td0.setAttribute("scope", "row");

     let select = document.createElement("input");
     select.setAttribute("type", "checkbox");
     select.className = "chkbox";
     select.setAttribute("id", "a" + producto.ProductoId);
     select.addEventListener("change", (e) => {
       productoMarcado(e.target);
     });
     select.setAttribute("role", "button");

     let td1 = document.createElement("td");
     let td2 = document.createElement("td");
     let td3 = document.createElement("td");
     let td3a = document.createElement("td");
     let td4 = document.createElement("td");
     let td5 = document.createElement("td");
     let td6 = document.createElement("td");
     let td7 = document.createElement("td");
     let btn2 = document.createElement("a");
     let btn = document.createElement("a");

     btn.className = " text-danger p-1";
     btn.setAttribute('role', 'button')
     btn.innerText = "Eliminar";
     btn.addEventListener("click", () => {
       preguntarBorrar(producto.ProductoId);
     });

     // Asignación de estilo y valores
     btn2.className = " text-info p-1";
     btn2.innerText = "Editar";
     btn2.setAttribute("data-toggle", "modal");
     btn2.setAttribute("data-target", "#modalEditar");
     btn2.setAttribute("role", "button");
     btn2.addEventListener("click", () => {
       abrirEdicion(producto.ProductoId);
     });
     td0.appendChild(select);

     td1.innerText = producto.Codigo;
     td1.setAttribute("style", "text-align:center");
     td2.innerText = producto.Producto;
     td3.innerText = formatter.format(producto.Precio);
     td3a.innerText = formatter.format(producto.Costo);
     td4.innerText = producto.Categoria;
     td5.innerText = producto.Existencia.toFixed(2);
     td6.appendChild(btn);
     td7.appendChild(btn2);

     //Añadiendo elementos a la fila y esta al cuerpo de la table
     tr.appendChild(td0);
     tr.appendChild(td1);
     tr.appendChild(td2);
     tr.appendChild(td4);
     tr.appendChild(td3);
     tr.appendChild(td3a);
     tr.appendChild(td5);
     tr.appendChild(td6);
     tr.appendChild(td7);
     tbcuerpo.appendChild(tr);

     // Asigna fondos diferentes a filas pares e impares Recorre la tabla y
     // centraliza
     // todos los td
     $("#tablaProducto > tbody  > tr > td").each(function (index, td) {
       td.setAttribute(
         "style",
         "width:fit-content;text-align:center; -webkit-user-select:none"
       );
     });
    
}

module.exports.llenarTabla=llenarTabla;