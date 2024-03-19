// Importamos los módulos necesarios
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import passport from 'passport';
import authPassport from './config/auth.js';
import config from './config/env.config.js'
import __dirname from './dirname.js';

// Creamos una instancia de la aplicación Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('hbs', handlebars.engine({
  extname: ".hbs",
  defaultLayout: "main",
  partialsDir: `${__dirname}/views`,
  handlebars: allowInsecurePrototypeAccess(Handlebars),
}));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'hbs');
app.use(express.static(`${__dirname}/public`))

// Configuramos el middleware para manejar solicitudes no encontradas
app.use((req, res) => {
  res.status(404).send("Error - pagina no encontrada");
});

const cookiepass = config.COOKIEPASS;
const MongoUrl = config.MONGO_URL

mongoose.set('strictQuery', true);

// Intentamos conectar a la base de datos y manejamos posibles errores
mongoose
  .connect(MongoUrl)
  .then(() => console.log("DB conected"))
  .catch((err) => console.log(err));

app.use(session({
  store: MongoStore.create({
    mongoUrl: MongoUrl,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl: 60
  }),
  secret: cookiepass,
  resave: false,
  saveUninitialized: true
}));

authPassport();
app.use(passport.initialize());
app.use(passport.session());


// Definimos el puerto en el que el servidor escuchará las solicitudes
const PORT = config.SERVER_PORT;

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
