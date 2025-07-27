const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Item = require('../models/Item');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('item');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Place new order
router.post('/', async (req, res) => {
  try {
    const { itemId, quantity, vendorName } = req.body;

    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    const newOrder = new Order({
      item: item._id,
      quantity,
      vendorName,
      status: "Pending"
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error("Order creation error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
