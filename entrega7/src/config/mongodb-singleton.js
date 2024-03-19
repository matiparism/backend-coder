import mongoose from "mongoose";

export default class MongoSingleton {
  static #instance;
  
  constructor() {
    this.#connectMongodb();
  }

  #connectMongodb = async () => {
    try {
      await mongoose.connect(config.monogoUrl);
      console.log("Conectado a MongoDB.");
    } catch (error) {
      
    }
  }
}