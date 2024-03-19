import { Router } from 'express';
import userModel from '../models/user.model.js'

const router = Router();

//Registro
router.post('/register', async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  console.log("Registro en proceso")
  console.log(req.body);

  //Validador de usuario existente
  const exist = await userModel.findOne({ email });
  if(exist) {
    return res.status(400).send({ satus: 'error', message: "Usuario existente" })
  }

  const user = {
    first_name,
    last_name,
    email,
    age,
    password
  }

  const result = await userModel.create(user);
  res.send({ status: "Sucess", message: `Usuario creado con ID: ${result.id}}` });
})

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email, password });

  if(!user) return res.status(401).send({ status: 'error', error: "Credenciales invalidas" })

  req.session.user = {
    name: `${ user.first_name } ${user.last_name}`,
    email: user.email,
    age: user.age
  }

  res.send({ status: "sucess", payload: req.session.user, message: "¡Bienvenido!" });
})

export default router;