const mongoose = require("mongoose");
const Joi = require("joi");
const { categorySchema } = require("./category");
const { sub_categorySchema } = require("./sub_category");

const productSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 50,
  },
  img2: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 50,
  },  
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  isNew: {
    type: Boolean,
    required: true,
    default: false,
  },
  oldPrice: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  categories : {
    type : [categorySchema],
    required : false,
  },
  sub_category : {
    type : sub_categorySchema,
    required : false,
  },
  productType : {
    type : String,
    enum: ["NORMAL", "TRENDING", "FEATURED"],
    default : "NORMAL",
  }
});

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = Joi.object({
    img: Joi.string().min(0).max(50).required(),
    img2: Joi.string().min(0).max(50),
    title: Joi.string().min(2).max(50).required(),
    isNew: Joi.boolean().default(false).required(),
    oldPrice: Joi.number().default(0),
    price: Joi.number().default(0),
    categories : Joi.array(),
    sub_category : Joi.string(),
    productType : Joi.string().valid("NORMAL", "TRENDING", "FEATURED"),
  });

  return schema.validate(product);
}

module.exports.validate = validateProduct;
module.exports.Product = Product;
