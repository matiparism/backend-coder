import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js'
const socket = io()

const cartsList = document.getElementById("carts-list");

// Escuchar el evento "carts-list" desde el servidor
socket.on('carts-list', (carts) => {
  console.log(carts)

  cartsList.innerHTML = '';
  // Obtener la lista de productos del DOM
    carts.forEach((cart) => {
      // Crear un elemento de lista y establecer su contenido
      const listItem = document.createElement("li");
      listItem.innerHTML = `${cart.cid} - Productos: ${cart.products}`;
  
      // Agregar el elemento de lista a la lista en el DOM
      productsList.appendChild(listItem);
    });  
});

