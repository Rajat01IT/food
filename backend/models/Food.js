import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String },
  category: { type: String },
});

const Food = mongoose.model("Food", FoodSchema);
export default Food;
