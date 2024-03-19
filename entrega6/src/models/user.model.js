import mongoose from "mongoose";

const userCollection = "user"

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  },
  age: {
    type: Number,
    require: true
  }
})

export default mongoose.model(userCollection, userSchema);

