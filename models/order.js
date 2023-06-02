const mongoose = require("mongoose");
const Joi = require("joi");
const { productSchema } = require("./product");

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 50,
  },
  stripeId: {
    type: String,
    required: false,
    minlength: 0,
    maxlength: 250,
  },
  products : {
    type : [new mongoose.Schema({
      id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      img: {
        type: String,
        required : false
      },
      desc: {
        type: String,
        required : false
      },
      title: {
        type: String,
        required: true,
        minlength: 0,
        maxlength: 50,
        trim: true,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
      quantity: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
    }),],
    required : true,
  }
});

const Order = mongoose.model("Order", orderSchema);

function validateOrder(order) {
  const schema = Joi.object({
    email: Joi.email().min(0).max(50),
    stripeId: Joi.string().min(0).max(250),
    products: Joi.array(),
  });

  return schema.validate(order);
}

module.exports.validate = validateOrder;
module.exports.Order = Order;
