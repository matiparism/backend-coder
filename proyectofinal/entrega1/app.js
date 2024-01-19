// Importar el módulo 'express' para crear la aplicación web
const express = require('express');
// Crear una instancia de la aplicación Express
const app = express();
// Configurar body-parser para analizar solicitudes JSON
app.use(express.json());

// Importar el módulo 'path' para trabajar con rutas de archivos y directorios
const path = require('path');

app.use(express.static('public'));

// Importar las rutas de productos
const productsRoutes = require('./routes/products.routes.js');
const cartsRoutes = require('./routes/carts.routes.js');

// Middleware para parsear los datos en las solicitudes POST con formato 'application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: true }));

// Usar las rutas de productos
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

// Middleware para manejar solicitudes no encontradas
app.use((req, res) => {
	res.status(404).send('Error - pagina no encontrada');
});

// Puerto en el que el servidor escuchará las solicitudes
const PORT = 8080;
// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
