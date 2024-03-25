import {Schema, model} from "mongoose";

const roleCollection = "roles"

const roleSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  })

export const RoleModel = model(roleCollection, roleSchema);