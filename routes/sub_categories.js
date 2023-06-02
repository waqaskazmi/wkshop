const { validate, Sub_Category } = require("../models/sub_category");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const sub_categories = await Sub_Category.find().sort({ title: 1 });
  res.send(sub_categories);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let sub_category = new Sub_Category({
    title: req.body.title,
  });

  sub_category = await sub_category.save();
  res.send(sub_category);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let sub_category;
  try {
    sub_category = await Sub_Category.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
      },
      {
        new: true,
      }
    );
  } catch (ex) {
    return res.status(404).send(ex, "sub_category with given id does not exist");
  }
  res.send(sub_category);
});

router.delete("/:id", async (req, res) => {
  let sub_category;
  try {
    sub_category = await Sub_Category.findByIdAndRemove(req.params.id);
  } catch (ex) {
    return res.status(404).send("sub_category with given id does not exist");
  }

  res.send(sub_category);
});

router.get("/:id", async (req, res) => {
  let sub_category;
  try {
    sub_category = await Sub_Category.findById(req.params.id);
  } catch (ex) {
    return res.status(404).send("sub_category with the given id does not exist");
  }

  res.send(sub_category);
});

module.exports = router;
