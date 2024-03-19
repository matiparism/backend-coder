import { Schema, model } from 'mongoose';

const cartsCollection = "carts";

const cartSchema = new Schema({
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

export const CartModel = model(cartsCollection, cartSchema);