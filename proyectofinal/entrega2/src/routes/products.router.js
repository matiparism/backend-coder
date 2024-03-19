import { Router } from 'express';
import productsDao from '../daos/db-manager/products.dao.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    let products = await productsDao.getAllProducts()
    res.json({ status: "success", payload: products })
  } catch (error) {
    console.log("Get all products error: "+error)
  }
});

router.get('/:pid', async (req, res) => {
  try {
    let {pid} = req.params;
    let product = await productsDao.getProductByPid(pid)
    res.json({ status: "success", payload: product })
  } catch (error) {
    console.log("Get product by id error: "+error)
  }
});

router.post('/', async (req, res) => {
  try {
    let newProduct = req.body;
    if(!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.stock || !newProduct.category){
      console.error("UNO O MAS CAMPOS ESTAN VACIOS \n TODOS LOS DATOS SON OBLIGATORIOS")
      return
    }
    let addedProduct = await productsDao.createProduct(newProduct)
    res.json({ status: "success", payload: addedProduct })
  } catch (error) {
    console.log("Add product error: "+error)
  }
});

router.put('/:pid', async (req, res) => {
  try {
    let pid = req.params.pid;
    let prodToReplace = req.body;
    if(!prodToReplace.title || !prodToReplace.description || !prodToReplace.code || !prodToReplace.price || !prodToReplace.stock || !prodToReplace.category){
      console.error("UNO O MAS CAMPOS ESTAN VACIOS \n TODOS LOS DATOS SON OBLIGATORIOS")
      return
    }
    let product = await productsDao.getProductByPid(pid)
    res.json({ status: "success", payload: product })
  } catch (error) {
    console.log("Get product by id error: "+error)
  }
});

export default router;