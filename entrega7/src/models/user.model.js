import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'

const userCollection = "users"

const userSchema = new Schema({
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
  roles: [{
    ref: 'roles',
    type: Schema.Types.ObjectID
  }],
  age: {
    type: Number,
    require: true
  }
}, {
  versionKey: false,
}
)

userSchema.statics.encryptPass = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePass = async (password, receivedPass) => {
  return await bcrypt.compare(password, receivedPass)
}
export const UserModel = model(userCollection, userSchema);

