import mongoose from 'mongoose';

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
  cid: {
    type: Number,
    require: true
  },
  products: {
    type: Array,
    require: true,
    id: {
      type: Number,
      require: true
    },
    quantity: {
      type: Number,
      require: true
    }
  }

});

export const cartModel = mongoose.model(cartsCollection, cartSchema);