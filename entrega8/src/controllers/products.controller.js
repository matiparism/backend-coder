import { ProductModel } from "../models/products.model.js"

export const addProduct = async (req, res) => {
  const {
  title,
  description,
  code,
  price,
  stock,
  category,
  thumbnails } = req.body;

  const newProduct = new ProductModel({
  title,
  description,
  code,
  price,
  stock,
  category,
  thumbnails });

  const addedProduct = await newProduct.save()

  res.status(201).json(addedProduct)
}

/* export const getProducts = async (req, res) => {
  const products = await ProductModel.find();
  res.json(products);
} */

export const getProducts = async (req, res) => {
  try {
    const { page = 1, pagination = 20 } = req.query;

    const products = await ProductModel.find()
      .skip((page - 1) * pagination)
      .limit(parseInt(pagination));

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getProductById = async (req, res) => {
  const product = await ProductModel.findById(req.params.prodid);
  res.status(200).json(product);
}

export const updateProduct = async (req, res) => {
  const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.prodid, req.body, { new: true });
  res.status(200).json(updatedProduct);
}

export const deleteProduct = async (req, res) => {
  const deletedProduct = await ProductModel.findByIdAndDelete(req.params.prodid);
  res.status(200).json(`Product ${deletedProduct.title} - DELETED`);
}