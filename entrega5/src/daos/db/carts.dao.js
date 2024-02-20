import { cartModel } from '../../models/carts.model.js';

class CartsDao {
  async getAllCarts() {
    return await cartModel.find({});
  }

  async getCartById(cid) {
    return await cartModel.findCartById(cid);
  }

  async createCart(cart) {
    return await cartModel.createCart(cart);
  }

  async updateCart(cid, cart) {
    return await cartModel.findByIdAndUpdate(cid, cart);
  }

  async deleteCart(cid) {
    return await cartModel.findByIdAndDelete(cid);
  }
}

export default new CartsDao();

