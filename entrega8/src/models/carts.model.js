import { Schema, model } from 'mongoose';

const cartsCollection = "carts";

const cartSchema = new Schema({
  products: [
    {
      _id: false, // Desactiva la generación automática de _id
      id: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ]
});

export const CartModel = model(cartsCollection, cartSchema);