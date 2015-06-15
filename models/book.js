var mongoose = require("mongoose");
var booksSchema = new mongoose.Schema({
	title: String,
	authors: String,
	publishedData: String,
	identifier: String,
	averageRating: Number,
	retailPrice: Number
});
var Book = mongoose.model("Book", booksSchema);
module.exports = Book;