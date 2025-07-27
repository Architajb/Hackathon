const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Item = require("../models/Item");

// Set up multer to store image in /uploads/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

// POST - Add item
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const imagePath = req.file.path;

    const newItem = new Item({
      name,
      price,
      quantity,
      image: imagePath,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: "Error saving item", error: err.message });
  }
});

// GET - List all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching items" });
  }
});

// DELETE - Delete item
router.delete("/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting item" });
  }
});

module.exports = router;
