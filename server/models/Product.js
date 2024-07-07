import mongoose from "mongoose";

// Define the schema for the Product model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  genre: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
});

// Create the Product model using the schema
const Product = mongoose.model("Product", productSchema);

export default Product;
