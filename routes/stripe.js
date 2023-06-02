// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51ND9inKIa07q33wP7yR78ngLTGlFGgHXMHzncihE8eUM5mwIpNvySNwgU2lvF4y2alK8LBJPyNX1Pq6B1yz7HAjT004h6jUjHW"
);
const express = require("express");
const router = express.Router();
const { Product } = require("../models/product");
const { Order } = require("../models/order");
const mongoose = require("mongoose");

const YOUR_DOMAIN = "http://localhost:3000";

router.post("/", async (req, res) => {
  
  const lineItems = await Promise.all(
    req.body.products.map(async (product) => {
      const item = await Product.findById(product.id);
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100,
        },
        quantity: product.quantity,
      };
    })
  );

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      shipping_address_collection: { allowed_countries: ["US", "CA"] },
      payment_method_types: ["card"],
    });

    let order = new Order({
      //email: req.body.email,
      stripeId: session.id,
      products: req.body.products,
    });

    order = await order.save();
    res.status(200).send(session);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
