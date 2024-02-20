import controller from './user.controller';
import passport from 'passport';
import express from 'express';
import { isLoggedIn } from '../auth/auth.service.js';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), isLoggedIn, controller.show);
// get current user 
// login and register routes 
router.post('/register', controller.register);
router.post('/login', controller.login);

export default router;
