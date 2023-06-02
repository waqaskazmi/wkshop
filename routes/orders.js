const { validate, Order } = require("../models/order");
const { Product } = require("../models/product");
const mongoose = require("mongoose");
const express = require("express");
const { forEach } = require("lodash");
const router = express.Router();

router.get("/", async (req, res) => {
  const orders = await Order.find().sort({ title: 1 });
  res.send(orders);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let products = [];

  for (const productId of req.body.products) {
    try {
      const a = await Product.findById(productId);
      products.push(a);
    } catch (ex) {
      return res.status(404).send("Product with the given id does not exist");
    }
  }

  let order = new Order({
    email: req.body.img,
    stripeId: req.body.stripeId,
    products: products,
  });

  order = await order.save();
  res.send(order);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let products = [];

  for (const productId of req.body.products) {
    try {
      const a = await Product.findById(productId);
      products.push(a);
    } catch (ex) {
      return res.status(404).send("Product with the given id does not exist");
    }
  }

  let order;
  try {
    order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        email: req.body.img,
        stripeId: req.body.img2,
        products: products,
      },
      {
        new: true,
      }
    );
  } catch (ex) {
    return res.status(404).send(ex, "order with given id does not exist");
  }
  res.send(order);
});

router.delete("/:id", async (req, res) => {
  let order;
  try {
    order = await Order.findByIdAndRemove(req.params.id);
  } catch (ex) {
    return res.status(404).send("order with given id does not exist");
  }

  res.send(order);
});

router.get("/:id", async (req, res) => {
  let order;
  try {
    order = await Order.findById(req.params.id);
  } catch (ex) {
    return res.status(404).send("order with the given id does not exist");
  }

  res.send(order);
});

module.exports = router;
