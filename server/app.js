var express = require("express");
var app = express();
var server = require("http").createServer(app);
var path = require("path")
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");


var database = require("./fake-database.js");

var pizzas = ["saus", "peps"];

app.get("/profile", function(req, res) {
	var person = database[req.query.id]
	res.render("profile", person);
});

app.get("/pizzas", function(req, res) {
	res.json(pizzas)
});

app.get("/pizzas/:index", function(req, res) {
	res.json(pizzas[req.params.index]);
});

app.post("/pizzas", function(req, res) {
	pizzas.push(req.body.topping);
	res.json(pizzas);
});

app.patch("/pizzas/:index", function(req, res) {
	pizzas[req.params.index] = req.body.topping;
	res.json(pizzas);
})

app.delete("/pizzas/:index", function(req, res) {
	pizzas.splice(req.params.index, 1);
	res.json(pizzas);
})

server.listen(3000, function(){
	console.log("Listening on 3000 tse")
});