import jwt from 'jsonwebtoken';
import config from '../config/env.config.js';
import { UserModel } from '../models/user.model.js';


// Middleware para verificar si el usuario está autenticado
export const isAuthenticated = async (req, res, next) => {
  
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

export const isAdmin = (req, res, next) => {
  const user = req.user;

  if (!user || !user.roles || !user.roles.includes('admin')) {
    return res.status(403).json({ message: 'Forbidden - Admin access required' });
  }

  next();
};

/* if (req.user) {
    next(); // Si el usuario está autenticado, continúa con el siguiente middleware
  } else {
    res.status(401).send('Acceso denegado. Debes iniciar sesión para acceder a este recurso.');
  }
// Middleware para verificar si el usuario es administrador
export const isAdmin = (req, res, next) => {
  // Supongamos que 'req.user' contiene la información del usuario actual
  if (req.user && req.user.role === 'admin') {
    next(); // Si el usuario es administrador, continúa con el siguiente middleware
  } else {
    res.status(403).send('Acceso denegado. Solo los administradores pueden acceder a este recurso.');
  }
}*/