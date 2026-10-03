const productService = require('../services/productService');
const { productValidation } = require('../validations/productValidation');
const { uploadToCloudinary } = require('../utils/cloudinaryUpload');

const getProducts = async (req, res) => {
  try {
    const result = await productService.getAllProducts(req.query);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { error } = productValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    if (!req.file) return res.status(400).json({ message: 'Image file is required' });

    const imageUrl = await uploadToCloudinary(req.file.path);
    const product = await productService.createProduct(req.body, imageUrl);

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    let imageUrl;
    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file.path);
    }

    const product = await productService.updateProduct(req.params.id, req.body, imageUrl);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await productService.deleteProduct(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};