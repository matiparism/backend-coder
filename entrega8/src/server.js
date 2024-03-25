import express from 'express';
import morgan from 'morgan';

import { createRoles } from './controllers/roles.controller.js'

import cartsRoutes from './routes/carts.routes.js'
import productsRoutes from './routes/products.routes.js'
import authRoutes from './routes/auth.routes.js'

const server = express();
createRoles();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan('dev'));

server.get('/', (req, res) => {
  res.json("Welcome")
})

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.use("/api/auth", authRoutes);
server.use('/api/products',productsRoutes);
server.use('/api/carts',cartsRoutes);

export default server;
