import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
//import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Define port
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
//app.use("/api1/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://root2000:urootp@mern.g1fkxuj.mongodb.net/studentDB?retryWrites=true&w=majority&appName=MERN",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Book model and seeding function
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  description: String,
  price: Number,
  image: String,
});

const Book = mongoose.model("Book", bookSchema);

const seedDatabase = async () => {
  try {
    await Book.deleteMany();
    const books = [
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        description: "A classic novel about the American Dream",
        price: 20,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110011815/sutterlin-1362879_640-(1).jpg",
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        description: "A powerful story of racial injustice and moral growth",
        price: 15,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110011854/reading-925589_640.jpg",
      },
      {
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        description: "A dystopian vision of a totalitarian future society",
        price: 255,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110011929/glasses-1052010_640.jpg",
      },
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        description: "A classic novel about the American Dream",
        price: 220,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110011929/glasses-1052010_640.jpg",
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        description: "A powerful story of racial injustice and moral growth",
        price: 1115,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110011929/glasses-1052010_640.jpg",
      },
      {
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        description: "A dystopian vision of a totalitarian future society",
        price: 125,
        image:
          "https://media.geeksforgeeks.org/wp-content/uploads/20240110011929/glasses-1052010_640.jpg",
      },
    ];

    await Book.insertMany(books);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Seed the database
seedDatabase();

// Define the product API endpoint
app.get("/api/products", async (req, res) => {
  try {
    const allBooks = await Book.find();
    res.json(allBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
