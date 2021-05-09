
function crearTarjeta(
    contentDiv,
    codigo,
    nombre,
    telefono,
    correo,
    deuda,
    lastBuy,
    id
  ) {
    //Crear elementos
    let contain = document.createElement("div");
    let cuerpo = document.createElement("div");
    let header = document.createElement("div");
    let text = document.createElement("div");
    let titulo = document.createElement("h4");
    let body = document.createElement("div");
  
    //Asignar clases
    contain.className = "col-md-16 p-1 mt-1";
    cuerpo.className = "card";
    header.className = "card-header card-header-text card-header-info p-1";
    text.className = "card-text";
    titulo.className = "card-title  w-100";
    body.className = "card-body p-1";
    header.setAttribute('style','border-radius:1.3rem; text-align: center')
  
    //Asignar valores
    titulo.innerText = `(${codigo})- ${nombre}`;
    
    let contenido = `<ul class="list-group">
      <li class="list-group-item d-flex align-items-center p-1" style="font-size:large; font-weight: bold">
      <span class="badge badge-light text-info  material-icons md-36 m-1" style="font-size:x-large">&#xe61d</span>
      ${telefono}
      </li>
      <li class="list-group-item d-flex align-items-center p-1" style="font-size:medium; font-weight: bold">
      <span class="badge badge-light text-info  material-icons md-36 m-1" style="font-size:x-large">&#xe0e6</span>
      ${correo}
      </li>
      <div class="d-flex">
      <li class="list-group-item d-flex align-items-center p-1" style="font-size:medium; font-weight: bold" 
      role="button"  data-toggle="popover" data-content="Deuda Actual" data-trigger="hover" data-placement="top">
      <span class="badge badge-light text-info material-icons md-36 m-1" style="font-size:x-large">&#xf1b6</span>
      ${deuda}
      </li>
      <li class="list-group-item d-flex align-items-center p-1 dl-2" style="font-size:medium; font-weight: bold"
      role="button"  data-toggle="popover" data-content="Última Compra" data-trigger="hover" data-placement="top">
      <span class="badge badge-light text-info  material-icons md-36 m-1" style="font-size:x-large">&#xe916</span>
      ${lastBuy}
      </li>
       </div>
       <div class=" m-auto">  
       <span role="button"  data-toggle="popover" data-content="Editar" data-trigger="hover" data-placement="top" 
       onclick="Editar(${id})"class="badge text-info  material-icons md-36 m-1" style=" font-size:x-large">&#xe3c9</span>
       
       <span role="button"  data-toggle="popover" data-content="Borrar" data-trigger="hover" data-placement="top"
       id="b${id}" onclick="Borrar(${id})" class="badge text-danger  material-icons md-36 m-1" style=" font-size:x-large">&#xe872</span>
      
       <span role="button"  data-toggle="popover" data-content="Detalles" data-trigger="hover" data-placement="top"
       onclick="Borrar(${id})" class="badge text-success  material-icons md-36 m-1" style=" font-size:x-large">&#xe8f4</span>
       </div>
    </ul>`;
    
    body.innerHTML = contenido;
    

    //Cargar elementos
    text.appendChild(titulo);
    
    header.appendChild(text);
    
    cuerpo.appendChild(header);
    
    cuerpo.appendChild(body);
    
    contain.appendChild(cuerpo);
    
    contentDiv.appendChild(contain);

   
$('[data-toggle="popover"]').popover()

  }

  module.exports.crearTarjeta=crearTarjeta;