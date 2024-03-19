import { Router } from "express";
import cookieParser from "cookie-parser";

const router = Router();

// Undsigned
// router.use(cookieParser())

// Signed
router.use(cookieParser(process.env.COOKIEPASS))

router.get('/', (req, res) => {
  res.render('index', {})
});

router.get('/setcookie', (req, res) => {
  // Unsigned
  // res.cookie('CoderCookie', 'Unsigned!!', { maxAge: 30000 }).send('Cookie asignada con exito')

  // Signed
  res.cookie('CoderCookie', 'Signed cookie!!', { maxAge: 30000 }).send('Cookie asignada con exito')
});

router.get('/getcookie', (req, res) => {
  // Unsigned
  // res.send(req.cookies)

  // Signed
  res.send(req.signedCookies)
});

router.get('/deletecookie', (req, res) => {
  // Unsigned
  res.clearCookie('CoderCookie').send('Cookie deleted!')
});

//
router.get('/session', (req, res) => {
  if (req.session.counter) {
    req.session.counter++
    res.send(`Visita número ${req.session.counter}.`)
  } else {
    req.session.counter = 1
    res.send('Te damos la bienvenida!')
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(error => {
    if (error) {
      res.json({ error: 'Error logout', msg: `Error: ${error}` })
    }
    res.send("Sesion cerrada correctamente!")
  })
});

router.get('/login', (req, res) => {
  const { username, password } = req.query
  if (username != 'pepe' || password != 'p4s5w0rd') {
    return res.status(401).send("Invalid credencials, check these!")
  } else {
    req.session.user = username;
    req.session.admin = false;
    res.send("Login Succesful!")
  }
});

// Middleware auth
const auth = (req, res, next) => {
  if (req.session.user === 'pepe' && req.session.admin) {
    return next()
  } else {
    return res.status(403).send("Unauthorized user!")
  }
};

router.get('/private', auth, (req, res) => {
  res.send("Authorized user!")
});

export default router;