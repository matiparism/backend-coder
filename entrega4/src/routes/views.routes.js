import { Router } from 'express';

const router = Router();

/* router.get("/", (req, res) => {
  res.render("index", {});
}); */
router.get('/', (req, res) => {
	res.render('home.hbs');
});
router.get('/realtimeproducts', (req, res) => {
	res.render('realTimeProducts.hbs');
});

export default router;
