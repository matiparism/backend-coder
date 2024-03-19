import { readFileSync, promises } from "fs";
// Definimos la clase ProductManager
class ProductsManager {
  // Constructor de la clase
  constructor(path) {
    this.path = path; //Recibe un argumento 'path', que es la ruta al archivo donde se almacenan los productos.
    // Intentamos leer el archivo, si el archivo existe y su contenido es un JSON válido, lo parseamos a un objeto.
    try {
      let products = readFileSync(this.path, "utf-8");
      this.products = JSON.parse(products);
    } catch {
      // Si hay un error, inicializamos products como un array vacío
      this.products = [];
    }
  }
  // Método para agregar un nuevo producto.
  addProduct = async (title, description, code, price, stock, category, thumbnail) => {
        console.log(title, description, code, price, stock, category, thumbnail)
    // Verificamos que todos los campos estén presentes.
    if (!title || !description || !code || !price || !stock || !category) {
      console.error("UNO O MAS CAMPOS ESTAN VACIOS \n TODOS LOS DATOS SON OBLIGATORIOS")
      return
    }
    else {
      // Verificamos que el código del producto no esté repetido.
      const repeted_code = this.products.find(element => element.code === code)
      if (repeted_code) {
        console.error("EL CODIGO INGRESADO YA EXISTE")
        return
      }
      else {
        // Si todos los argumentos están presentes y el código del producto no está repetido, procedemos a crear el nuevo producto.
        // Generamos un nuevo ID para el producto.
        const id = await this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1
        const status = true;
        // Creamos el nuevo producto.
        const new_product = {
          id, title, description, code, price, status, stock, category, thumbnail
        }
        console.log(new_product);
        // Agregamos el nuevo producto a la lista de productos.
        this.products.push(new_product)
        // Convertimos el array a una cadena en formato JSON.
        // Guardamos la lista de productos en el archivo.
        await promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
      }
    }
  }
  // Método para obtener la lista de productos desde un archivo.
  async getProducts() {
    try {
      return this.products
    }
    catch (error) {
      console.log(error);
    }
  }
  // Método para actualizar un producto existente
  updateProduct = async (id, title, description, code, price, status, stock, category, thumbnail) => {
    try {
      // Verificamos que el ID del producto no esté repetido.
      const currentProductsList = await this.getProducts()
      const new_products_list = currentProductsList.map(element => {
        if (element.id === id) {
          const updatedProduct = {
            ...element,
            title, description, code, price, status, stock, category, thumbnail
          }
          return updatedProduct
        } else {
          return element
        }
      })
      // Convertimos el array a una cadena en formato JSON.
      // Guardamos la nueva lista de productos en el archivo.
      await promises.writeFile(this.path, JSON.stringify(new_products_list, null, 2))
    } catch (error) {
      console.error(error);
    }
  }

  // Método para actualizar todos los productos
  updateAllProducts = async () => {
    const all_products = await this.getProducts();
    for (let product of all_products) {
      await this.updateProduct(product.id, product.title, product.description, product.price, product.thumbnail, product.code, true, product.stock);
    }
  }

  // Método para eliminar un producto
  deleteProduct = async (id) => {
    const all_products = await this.getProducts()
    // Creamos una nueva lista de productos que excluye el producto con el ID dado.
    const products_not_found = all_products.filter(element => element.id !== id)
    // Convertimos la lista a una cadena en formato JSON.
    // Guardamos la nueva lista de productos en el archivo.
    await promises.writeFile(this.path, JSON.stringify(products_not_found, null, 2))
  }

  // Método para obtener un producto por su ID
  getProductbyId = async (id) => {
    // Buscamos el producto con el ID dado en la lista de productos.
    const found = this.products.find(element => element.id === id)
    // Devolvemos el producto encontrado.
    return found
  }
}

  export default ProductsManager;