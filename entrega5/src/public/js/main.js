import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js'
const socket = io()

const form = document.getElementById("form");
const productsList = document.getElementById("products-list");
const cartsList = document.getElementById("carts-list");

// Escuchar el evento "productList" desde el servidor
socket.on('products-list', (products) => {
  console.log(products)

  productsList.innerHTML = '';
  // Obtener la lista de productos del DOM
    products.forEach((product) => {
      // Crear un elemento de lista y establecer su contenido
      const listItem = document.createElement("li");
      listItem.innerHTML = `${product.title}`;
  
      // Agregar el elemento de lista a la lista en el DOM
      productsList.appendChild(listItem);
    });  
});

socket.on('carts-list', (carts) => {
  console.log(carts)

  cartsList.innerHTML = '';
  // Obtener la lista de productos del DOM
    carts.forEach((cart) => {
      // Crear un elemento de lista y establecer su contenido
      const listItem = document.createElement("li");
      listItem.innerHTML = `${cart.id_cart} ${cart.products}`;
      
  
      // Agregar el elemento de lista a la lista en el DOM
      cartsList.appendChild(listItem);
    });  
});


// Manejador para la presentación del element (Agregar Producto)
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form)

  // Emitir un evento de Socket.IO para agregar un nuevo producto
  socket.emit("crateProduct", formData);
  form.reset();
});



