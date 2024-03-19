// Importamos los módulos necesarios
import express from 'express';
import mongoose from 'mongoose';
import { __dirname } from './dirname.js';
import path from 'path';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import dotenv from 'dotenv';


// Creamos una instancia de la aplicación Express
const app = express();

// Configuramos la conexión a la base de datos MongoDB
dotenv.config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;
// const MongoUrl = `mongodb+srv://${user}:${password}@${cluster}`


mongoose.set('strictQuery', true);

// Intentamos conectar a la base de datos y manejamos posibles errores
mongoose
  .connect('mongodb+srv://agvispc:Neil.96864@cluster0.modbxsw.mongodb.net/ecommerce')
  .then(() => console.log("DB conected"))
  .catch((err) => console.log(err));

// Configuramos el middleware para analizar solicitudes JSON
app.use(express.json());

// Configuramos el middleware para parsear los datos en las solicitudes POST con formato 'application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: true }))

// Importamos las rutas de productos
import viewsRouter from './routes/views.router.js';

// Configuramos el motor de plantillas Handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);

// Configuramos el motor de vistas y el directorio de vistas
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, '/views'));

// Usamos las rutas de productos
app.use("/", viewsRouter);

// Configuramos el directorio de archivos estáticos
app.use(express.static(path.join(__dirname, '/public')));

// Configuramos la conexión a la base de datos
const db = mongoose.connection;

// Manejamos los errores de conexión a la base de datos
db.on('error', (error) => {
  console.error(`Error de conexion a la base de datos: ${error.message}`);
})

// Confirmamos la conexión exitosa a la base de datos
db.once('open', () => {
  console.log('Conexion exitosa a la base de datos');
})

// Configuramos el middleware para manejar solicitudes no encontradas
app.use((req, res) => {
  res.status(404).send("Error - pagina no encontrada");
});

// Definimos el puerto en el que el servidor escuchará las solicitudes
const PORT = 8000;

// Iniciamos el servidor y escuchamos en el puerto especificado
const httpServer = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);

// Configuramos Socket.IO para manejar conexiones de clientes
const io = new Server(httpServer, {
  connectionStateRecovery: {}
});

// Manejamos eventos de conexión y desconexión de usuarios, así como la lista de productos
io.on('connection', (socket) => {
  console.log('a user has connected!')

  socket.on('disconnect', () => {
    console.log('an user has disconnected')
  })
  socket.on('carts-list', (carts) => {
    io.emit('carts-list', carts)
  })

  socket.on('products-list', (products) => {
    io.emit('products-list', products)
  })


})
