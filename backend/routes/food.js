import express from "express";
import Food from "../models/Food.js";

const router = express.Router();

// Get all food items
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new food item
router.post("/", async (req, res) => {
  try {
    const food = new Food(req.body);
    await food.save();
    res.status(201).json(food);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a food item
router.put("/:id", async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(food);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a food item
router.delete("/:id", async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.json({ message: "Food item deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
