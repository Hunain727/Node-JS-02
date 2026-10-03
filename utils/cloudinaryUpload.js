const fs = require('fs');
const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'ecommerce_products',
    });
    // Temporary file remove karna server se
    fs.unlinkSync(filePath);
    return result.secure_url;
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw error;
  }
};

module.exports = { uploadToCloudinary };