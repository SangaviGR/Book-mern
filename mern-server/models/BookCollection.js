const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title for the book"],
    unique: true,
  },
  author: {
    type: String,
    required: [true, "Please provide an author for the book"],
  },
  pdfLink: {
    type: String,
    required: [true, "Please provide a PDF link for the book"],
  },
  imageUrl: {
    type: String,
    required: [true, "Please provide an image URL for the book"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description for the book"],
  },
  rating: {
    type: Number,
    required: [true, "Please provide a rating for the book"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price for the book"],
  },
  genre: {
    type: String,
    required: [true, "Please provide a genre for the book"],
  },
});


const Books = mongoose.model("Books", bookSchema);

module.exports = Books;