const mongoose = require("mongoose");
const Joi = require("joi");
const { sub_categorySchema } = require("./sub_category");

const categorySchema = new mongoose.Schema({
  img: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 50,
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  desc: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  sub_categories : {
    type : [sub_categorySchema],
    required : true,
  },
});

const Category = mongoose.model("Category", categorySchema);

function validateCategory(category) {
  const schema = Joi.object({
    img: Joi.string().min(0).max(50).required(),
    title: Joi.string().min(2).max(50).required(),
    desc: Joi.string().min(2).max(50).required(),
    sub_categories : Joi.array(),
  });

  return schema.validate(category);
}

module.exports.validate = validateCategory;
module.exports.Category = Category;
module.exports.categorySchema = categorySchema;