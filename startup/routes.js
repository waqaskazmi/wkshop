const express = require('express');
const products = require('../routes/products');
const categories = require('../routes/categories');
const sub_categories = require('../routes/sub_categories');
const users = require('../routes/users');
const auth = require('../routes/auth');
const stripe = require('../routes/stripe');
const error = require('../middleware/error');

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/products", products);
  app.use("/api/categories", categories);
  app.use("/api/sub_categories", sub_categories);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/stripe", stripe);
  app.use(error);
};
