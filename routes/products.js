const { validate, Product } = require("../models/product");
const { Category } = require("../models/category");
const { Sub_Category } = require("../models/sub_category");
const mongoose = require("mongoose");
const express = require("express");
const { forEach } = require("lodash");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find().sort({ title: 1 });
  res.send(products);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let categories = [];

  for (const categoryId of req.body.categories) {
    try {
      const a = await Category.findById(categoryId);
      categories.push(a);
    } catch (ex) {
      return res.status(404).send("Category with the given id does not exist");
    }
  }

  let sub_category = null;

  try {
    sub_category = await Sub_Category.findById(req.body.sub_category);
  } catch (ex) {
    return res
      .status(404)
      .send("Sub Category with the given id does not exist");
  }

  let product = new Product({
    img: req.body.img,
    img2: req.body.img2,
    title: req.body.title,
    isNew: req.body.isNew,
    oldPrice: req.body.oldPrice,
    price: req.body.price,
    categories: categories,
    sub_category: sub_category,
    productType: req.body.productType,
  });

  product = await product.save();
  res.send(product);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let categories = [];

  for (const categoryId of req.body.categories) {
    try {
      const a = await Category.findById(categoryId);
      categories.push(a);
    } catch (ex) {
      return res.status(404).send("Category with the given id does not exist");
    }
  }

  let sub_category = null;

  try {
    sub_category = await Sub_Category.findById(req.body.sub_category);
  } catch (ex) {
    return res
      .status(404)
      .send("Sub Category with the given id does not exist");
  }

  let product;
  try {
    product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        img: req.body.img,
        img2: req.body.img2,
        title: req.body.title,
        isNew: req.body.isNew,
        oldPrice: req.body.oldPrice,
        price: req.body.price,
        categories: categories,
        sub_category: sub_category,
        productType: req.body.productType,
      },
      {
        new: true,
      }
    );
  } catch (ex) {
    return res.status(404).send(ex, "product with given id does not exist");
  }
  res.send(product);
});

router.delete("/:id", async (req, res) => {
  let product;
  try {
    product = await Product.findByIdAndRemove(req.params.id);
  } catch (ex) {
    return res.status(404).send("product with given id does not exist");
  }

  res.send(product);
});

router.get("/:id", async (req, res) => {
  let product;
  try {
    product = await Product.findById(req.params.id);
  } catch (ex) {
    return res.status(404).send("product with the given id does not exist");
  }

  res.send(product);
});

module.exports = router;
