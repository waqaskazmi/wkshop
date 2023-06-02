const { validate, Category } = require("../models/category");
const { Sub_Category } = require("../models/sub_category");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find().sort({ title: 1 });
  res.send(categories);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let sub_categories = [];
  for(const sub_categoryId of req.body.sub_categories){
    try{
      const a = await Sub_Category.findById(sub_categoryId);
      sub_categories.push(a);
    }
    catch (ex) {
      return res.status(404).send("Sub Category with the given id does not exist");
    }
  };  

  let category = new Category({
    img: req.body.img,
    title: req.body.title,
    desc: req.body.desc,
    sub_categories : sub_categories,
  });

  category = await category.save();
  res.send(category);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let sub_categories = [];
  for(const sub_categoryId of req.body.sub_categories){
    try{
      const a = await Sub_Category.findById(sub_categoryId);
      sub_categories.push(a);
    }
    catch (ex) {
      return res.status(404).send("Sub Category with the given id does not exist");
    }
  };

  let category;
  try {
    category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        img: req.body.img,
        title: req.body.title,
        desc: req.body.desc,
        sub_categories : sub_categories,
      },
      {
        new: true,
      }
    );
  } catch (ex) {
    return res.status(404).send(ex, "category with given id does not exist");
  }
  res.send(category);
});

router.delete("/:id", async (req, res) => {
  let category;
  try {
    category = await Category.findByIdAndRemove(req.params.id);
  } catch (ex) {
    return res.status(404).send("category with given id does not exist");
  }

  res.send(category);
});

router.get("/:id", async (req, res) => {
  let category;
  try {
    category = await Category.findById(req.params.id);
  } catch (ex) {
    return res.status(404).send("category with the given id does not exist");
  }

  res.send(category);
});

module.exports = router;
