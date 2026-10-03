const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const verifyToken = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// Protected routes
router.post('/', verifyToken, upload.single('image'), productController.createProduct);
router.put('/:id', verifyToken, upload.single('image'), productController.updateProduct);
router.delete('/:id', verifyToken, productController.deleteProduct);

module.exports = router;