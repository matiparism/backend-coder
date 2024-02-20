import { readFileSync, promises } from "fs";
// Definimos la clase ProductManager
class CartsManager {
  // Constructor de la clase
  constructor(path) {
    this.path = path; //Recibe un argumento 'path', que es la ruta al archivo donde se almacenan los carritos.
    // Intentamos leer el archivo, si el archivo existe y su contenido es un JSON válido, lo parseamos a un objeto.
    try {
      let carts = readFileSync(this.path, "utf-8");
      this.carts = JSON.parse(carts);
    } catch {
      // Si hay un error, inicializamos products como un array vacío
      this.carts = [];
    }
  }
  
  // Método para agregar un nuevo carrito.
  addCart = async (products) => {
    // Verificamos que todos los campos estén presentes.
    if (!products) {
      console.error("UNO O MAS CAMPOS ESTAN VACIOS \n TODOS LOS DATOS SON OBLIGATORIOS")
      return
    }
    else {
      // Generamos un nuevo ID para el carrito.
      const id_cart = this.carts.length > 0 ? this.carts[this.carts.length - 1].id_cart + 1 : 1
      // Creamos el nuevo carrito.
      const new_cart = {
        id_cart, 
        products
      }
      console.log(new_cart);
      // Agregamos el nuevo carrito a la lista de carritos.
      this.carts.push(new_cart)
      // Convertimos el array a una cadena en formato JSON.
      // Guardamos la lista de carritos en el archivo.
      await promises.writeFile(this.path, JSON.stringify(this.carts, null, 2))
    }
  }
  
  // Método para obtener la lista de carritos desde un archivo.
  async getCarts() {
    try {
      return this.carts
    }
    catch (error) {
      console.log(error);
    }
  }
  // Método para actualizar un carrito existente
  updateCart = async (id_cart, products) => {
    try {
      // Verificamos que el ID del carrito exista.
      const currentCartsList = await this.getCarts()
      const new_carts_list = currentCartsList.map(element => {
        if (element.id_cart === id_cart) {
          const updatedCart = {
            ...element,
            products
          }
          return updatedCart
        } else {
          return element
        }
      })
      // Convertimos el array a una cadena en formato JSON.
      // Guardamos la nueva lista de carritos en el archivo.
      await promises.writeFile(this.path, JSON.stringify(new_carts_list, null, 2))
    } catch (error) {
      console.error(error);
    }
  }

  // Método para actualizar todos los carritos
  updateAllCarts = async () => {
    const all_carts = await this.getCarts();
    for (let cart of all_carts) {
      await this.updateCart(cart.id, product.title, product.description, product.price, product.thumbnail, product.code, true, product.stock);
    }
  }

  // Método para eliminar un carrito
  deleteCart = async (id) => {
    const all_carts = await this.getCarts()
    // Creamos una nueva lista de carritos que excluye el carrito con el ID dado.
    const carts_not_found = all_carts.filter(element => element.id !== id)
    // Convertimos la lista a una cadena en formato JSON.
    // Guardamos la nueva lista de carritos en el archivo.
    await promises.writeFile(this.path, JSON.stringify(carts_not_found, null, 2))
  }

  // Método para obtener un carrito por su ID
  getCartbyId = async (id_cart) => {
    // Buscamos el carrito con el ID dado en la lista de carritos.
    const found = this.carts.find(element => element.id_cart === id_cart)
    console.log(this.carts)
    // Devolvemos el carrito encontrado.
    return found
  }
}

export default CartsManager;
