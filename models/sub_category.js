const mongoose = require("mongoose");
const Joi = require("joi");

const sub_categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  }
});

const Sub_Category = mongoose.model("Sub_Category", sub_categorySchema);

function validateSub_Category(sub_category) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(50).required(),
  });

  return schema.validate(sub_category);
}

module.exports.validate = validateSub_Category;
module.exports.Sub_Category = Sub_Category;
module.exports.sub_categorySchema = sub_categorySchema;
