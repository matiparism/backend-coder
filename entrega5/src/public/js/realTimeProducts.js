import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js'
const socket = io()

const productsList = document.getElementById("products-list");

// Escuchar el evento "products list" desde el servidor
socket.on('products-list', (products) => {
  console.log(products)

  productsList.innerHTML = '';
  // Obtener la lista de carritos del DOM
    products.forEach((product) => {
      // Crear un elemento de lista y establecer su contenido
      const listItem = document.createElement("li");
      listItem.innerHTML = `${product.title} - Price: ${product.price}`;
  
      // Agregar el elemento de lista a la lista en el DOM
      productsList.appendChild(listItem);
    });  
});