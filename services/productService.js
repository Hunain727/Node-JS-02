const Product = require('../models/Product');

const getAllProducts = async (query) => {
  const { category, search, page = 1, limit = 10 } = query;
  const filter = {};

  if (category) filter.category = category;
  if (search) filter.title = { $regex: search, $options: 'i' };

  const skip = (page - 1) * limit;

  const products = await Product.find(filter).skip(skip).limit(Number(limit));
  const total = await Product.countDocuments(filter);

  return { products, total, page: Number(page), pages: Math.ceil(total / limit) };
};

const getProductById = async (id) => {
  return await Product.findById(id);
};

const createProduct = async (productData, imageUrl) => {
  return await Product.create({ ...productData, image: imageUrl });
};

const updateProduct = async (id, updateData, imageUrl) => {
  const payload = { ...updateData };
  if (imageUrl) payload.image = imageUrl;
  return await Product.findByIdAndUpdate(id, payload, { new: true });
};

const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};