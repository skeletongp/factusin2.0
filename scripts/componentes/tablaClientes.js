function llenarTabla(cliente, tbcuerpo, formatter) {
  //Crear elementos para la tabla
  let tr = document.createElement("tr");

  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let td3a = document.createElement("td");
  let td4 = document.createElement("td");
  let td6 = document.createElement("td");
  let td7 = document.createElement("td");
  let btn2 = document.createElement("a");
  let btn = document.createElement("a");

  btn.className = " text-danger p-1";
  btn.setAttribute("role", "button");
  btn.innerText = "Eliminar";
  btn.addEventListener("click", () => {
    Borrar(cliente.ClienteId);
  });

  // Asignación de estilo y valores
  btn2.className = " text-info p-1";
  btn2.innerText = "Editar";
  btn2.setAttribute("role", "button");
  btn2.addEventListener("click", () => {
    Editar(cliente.ClienteId);
  });

  td1.innerText = cliente.Codigo;
  td1.setAttribute("style", "text-align:center");
  td1.className = "bg-dark text-white";
  td2.innerText = cliente.Cliente;
  td3.innerText = cliente.Telefono;
  td3a.innerText = cliente.Correo;
  td4.innerText = formatter.format(cliente.Deuda);
  td6.appendChild(btn);
  td7.appendChild(btn2);

  //Añadiendo elementos a la fila y esta al cuerpo de la table
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td3a);
  tr.appendChild(td4);
  tr.appendChild(td6);
  tr.appendChild(td7);
  tbcuerpo.appendChild(tr);

  // Asigna fondos diferentes a filas pares e impares Recorre la tabla y
  // centraliza
  // todos los td
  $("#tablaCliente > tbody  > tr > td").each(function (index, td) {
    td.setAttribute(
      "style",
      "text-align:center; -webkit-user-select:none;  vertical-align: middle; border-bottom: solid 1px white"
    );
  });
}

module.exports.llenarTabla = llenarTabla;
