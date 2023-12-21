const ProductManager = require("./ProductManager.js");
const Product = require("./ProductManager.js");

console.log("// Crear una nueva instancia de ProductManager");
const productManager = new ProductManager();

console.log("// Llamar a getProducts, debería devolver un array vacío")
console.log(productManager.getProducts()); // []

console.log("// Definir un nuevo producto")
productManager.addProduct(new Product( "producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25));
// Variante 1
productManager.addProduct(new Product(
  "Producto Prueba 1",
  "Este es el primer producto de prueba",
  100,
  "Sin imagen",
  "def456",
  30
));

// Variante 2
productManager.addProduct(new Product(
  "Producto Prueba 2",
  "Este es el segundo producto de prueba",
  300,
  "Sin imagen",
  "ghi789",
  35
));

// Variante 3
productManager.addProduct(new Product(
  "Producto Prueba 3",
  "Este es el tercer producto de prueba",
  400,
  "Sin imagen",
  "jkl012",
  40
));

console.log("// Llamar a getProducts de nuevo, debería devolver el array con el nuevo producto")
console.log(productManager.getProducts());

console.log("// Intentar añadir el mismo producto de nuevo, debería registrar un mensaje de error")
productManager.addProduct(new Product(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
));

console.log("// Obtener un producto por id, debería devolver el producto si existe, de lo contrario registrar No encontrado")
console.log("// Devuelve el producto por id")
console.log(productManager.getProductById(1));
console.log("// Registra No encontrado")
console.log(productManager.getProductById(999));