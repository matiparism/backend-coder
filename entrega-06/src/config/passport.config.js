import passport from "passport";
import userModel from '../services/db/models/user.js';
//Para usar JWT como estrategia.
// import jwtStrategy from 'passport-jwt'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import config from './env.config.js';

const jwtCookieToken = config.JWT_SECRET;

const initializePassport = () => {
  //TODO generar las reglas para extraer el token y las autorizaciones necesarias.
  passport.use(
    'jwt',
    new JwtStrategy({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: jwtCookieToken
    },
      async (jwt_payload, done) => {
        try {
          const user = await userModel.findById(jwt_payload.id);
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          } // Si el usuario existe, retorna el usuario
          return done(null, jwt_payload)
        } catch (error) {
          return done(error)
        }
      }
    )
  )
}

//Funciones de Serializacion y Desserializacion
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    let user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    console.error("Error deserializando el usuario: " + error);
  }
});

/**
 * Metodo utilitario en caso de necesitar extraer cookies con Passport
 * @param {*} req el request object de algun router.
 * @returns El token extraido de una Cookie
 */
const cookieExtractor = req => {
  let token = null;
  console.log("Entrando a Cookie Extractor");
  if (req && req.cookies) { //Validamos que exista el request y las cookies.
    console.log("Cookies presentes: ");
    console.log(req.cookies);
    token = req.cookies[jwtCookieToken]; //-> Tener presente este nombre es el de la Cookie.
    console.log("Token obtenido desde Cookie:");
    console.log(token);
  }
  return token;
};

export default initializePassport;