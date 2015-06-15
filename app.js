var express = require('express'),
	app = express();
var methodOverride = require("method-override"),
		bodyParser = require("body-parser"),
 		morgan = require('morgan'),
		db = require("./models"),
		request = require("request")


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

//ROUTES

//ROOT
app.get("/" , function (req, res) {
	res.redirect("/books")
})

//INDEX
app.get("/books", function (req, res) {
	db.Book.find({}, function (err, books) {
		if (err) {
			throw err
		} else {
		res.render("books/index", {books:books})}
	})
})

app.get("/books/results", function(req,res){
	var url = 'https://www.googleapis.com/books/v1/volumes?q=intitle+' + req.query.title;
		request(url, function (error, response, body) {
		  if (error) {
		    console.log("Error!  Request failed - " + error);
		  	} else if (!error && response.statusCode === 200) {
		  	var bookData = JSON.parse(body).items;
		    res.render("books/results", {bookData:bookData});
		  }
	});
});

//NEW
app.get("/books/new", function (req, res) {
	res.render("books/new")
})

//CREATE
app.post("/books", function (req, res) {
	db.Book.create(req.body.book, function (err, book){
		if (err) {throw "a goose"
	} else {
			res.redirect("/books")
		}
	})
	
})

//SHOW
app.get("/books/:id", function (req, res) {
	res.render("books/show")
})

// EDIT 
app.get("/books/:id/edit", function (req, res) {
	db.Book.findById(req.params.id, function (err, book) {
		if (err) throw err
			else {
				res.render("books/edit", {book:book})
			}
	})
})

// UPDATE 
app.put("/books/:id", function (req, res) {
	var id = req.params.id
	db.Book.findByIdAndUpdate(id, req.body.book, function (err, data){
		res.redirect("/books")
	})
})

// DESTROY
app.delete("/books/:id", function (req, res) {
	var id = req.params.id
	db.Book.findByIdAndRemove(id, req.body.book, function (err, data) {
		res.redirect("/books")
	})
})

app.listen(3000, function(){
  console.log("Server be listen' on port 3000");
});
