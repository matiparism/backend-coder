import { productModel } from '../../models/products.model.js';

class ProductsDao {
  async getAllProducts() {
    return await productModel.find({});
  }

  async getProductById(pid) {
    return await productModel.findById(pid);
  }

  async createProduct(product) {
    return await productModel.createProduct(product);
  }

  async updateProduct(pid, product) {
    return await productModel.findByIdAndUpdate(pid, product);
  }

  async deleteProduct(pid) {
    return await productModel.findByIdAndDelete(pid);
  }
}

export default new ProductsDao();

