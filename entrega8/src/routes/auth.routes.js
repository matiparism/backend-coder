import { Router } from 'express';
const router = Router();
import * as authController from '../controllers/auth.controller.js';
import { isAdmin, isAuthenticated } from '../middleware/auth.middleware.js'

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);

router.post('/products', isAdmin, (req, res) => {
  // Solo los administradores pueden crear productos
  res.json({ message: 'Esta es una ruta protegida para crear productos', user: req.user });
});

router.put('/api/products/:id', isAdmin, (req, res) => {
  // Solo los administradores pueden actualizar productos
  res.json({ message: 'Esta es una ruta protegida para actualizar productos', user: req.user });
});

router.delete('/products/:id', isAdmin, (req, res) => {
  // Solo los administradores pueden eliminar productos
  res.json({ message: 'Esta es una ruta protegida para eliminar productos', user: req.user });
});

router.post('/chat', isAuthenticated, (req, res) => {
  // Solo los usuarios autenticados pueden enviar mensajes al chat
  res.json({ message: 'Esta es una ruta protegida para el chat', user: req.user });
});

router.post('/cart', isAuthenticated, (req, res) => {
  // Solo los usuarios autenticados pueden agregar productos a su carrito
  res.json({ message: 'Esta es una ruta protegida para el carrito', user: req.user });
});

export default router;
