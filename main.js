function Producto(id, nombre, precio, stock) {
  this.id = id;
  this.nombre = nombre;
  this.precio = precio;
  this.stock = stock;
}

let productos = [];

// INGRESO DE PRODUCTOS Y ENVÍO AL ARRAY
function crearProducto() {
  const nombre = document.querySelector("#nombre-producto").value.trim();
  const precio = parseFloat(document.querySelector("#precio-producto").value.trim());
  const stock = parseInt(document.querySelector("#stock-producto").value.trim());

  if (!nombre || isNaN(precio) || isNaN(stock)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, completa todos los campos correctamente.',
    });
    return;
  }

  const producto = new Producto(productos.length + 1, nombre, precio, stock);
  productos.push(producto);
}

// AGREGA PRODUCTOS, LIMPIA, MUESTRA Y GUARDA EN SESSIONSTORAGE
function agregarProducto() {
  crearProducto();
  limpiarCampos();
  mostrarProductos();
  sessionStorage.setItem('productos', JSON.stringify(productos));

  Swal.fire({
    title: '¡Producto agregado!',
    text: 'El producto ha sido agregado correctamente.',
    icon: 'success',
    confirmButtonText: 'Aceptar'
  });
}

// LIMPIA LOS INPUTS
function limpiarCampos() {
  document.querySelector("#nombre-producto").value = "";
  document.querySelector("#precio-producto").value = "";
  document.querySelector("#stock-producto").value = "";
}

// ENVÍA LA INFORMACIÓN
const botonAgregar = document.getElementById("boton-agregar");
botonAgregar.addEventListener("click", agregarProducto);

// MUESTRA PRODUCTOS
function mostrarProductos() {
  const tablaProductos = document.getElementById("tabla-productos");
  const cuerpoTabla = document.createElement("tbody");

  cuerpoTabla.innerHTML = productos.map(producto => {
    return `
      <tr>
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td>${producto.stock}</td>
      </tr>
    `;
  }).join("");

  tablaProductos.innerHTML = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Stock</th>
      </tr>
    </thead>
  `;
  tablaProductos.appendChild(cuerpoTabla);
  tablaProductos.classList.add("table", "table-striped");
}

function cargarDatosDesdeJSON() {
  fetch('productos.json')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al cargar los datos');
      }
    })
    .then(data => {
      productos = data.map(producto => new Producto(producto.id, producto.nombre, producto.precio, producto.stock));
      mostrarProductos();
    })
    .catch(error => {
      console.error(error);
    });
}

function validarCampo(inputId, mensaje) {
  const input = document.getElementById(inputId);
  const valor = input.value.trim();

  if (valor === "") {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
    }).then(() => {
      input.focus();
      Swal.close();
    });
    return false;
  }

  return true;
}

const nombreProducto = document.getElementById("nombre-producto");
const precioProducto = document.getElementById("precio-producto");
const stockProducto = document.getElementById("stock-producto");

nombreProducto.addEventListener("blur", () => {
  validarCampo("nombre-producto", "Por favor, introduce el nombre del producto.");
});

precioProducto.addEventListener("blur", () => {
  validarCampo("precio-producto", "Por favor, introduce el precio del producto.");
});

stockProducto.addEventListener("blur", () => {
  validarCampo("stock-producto", "Por favor, introduce la cantidad actual del producto.");
});

cargarDatosDesdeJSON();
mostrarProductos();