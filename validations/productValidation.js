const Joi = require('joi');

const productValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
    category: Joi.string().required(),
    stock: Joi.number().integer().min(0).required(),
  });
  return schema.validate(data);
};

module.exports = { productValidation };