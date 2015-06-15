var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/library_db");
mongoose.set("debug", true);

module.exports.Book = require("./book");