import { UserModel } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import config from '../config/env.config.js'

export const signup = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    roles,
    age } = req.body;

  const newUser = new UserModel({
    first_name,
    last_name,
    email,
    password: await UserModel.encryptPass(password),
    roles,
    age
  })

  const savedUser = await newUser.save();
  
  const token = jwt.sign({id: savedUser._id}, config.JWT_SECRET,{
    expiresIn: 60*60*24 //ss*mm*hh
  })
  
  console.log(newUser);
  res.status(200).json({token});
}

export const signin = async (req, res) => {
  
  res.json('signin')
}