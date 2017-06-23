var express = require("express");
var app = express();
var server = require("http").createServer(app);
var path = require("path")
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");



app.get("/profile", function(req, res) {
	var person = database[req.query.id]
	res.render("profile", person);
});

app.get("/friends", function(req, res) {
	res.json(friends)
});

app.get("/friends/:id", function(req, res) {
	res.json(friends[req.params.id]);
});

app.post("/friends", function(req, res) {
	friends.push(req.body.topping);
	res.json(friends);
});

app.patch("/friends/:id", function(req, res) {
	friends[req.params.id] = req.body.topping;
	res.json(friends);
})

app.delete("/friends/:id", function(req, res) {
	friends.splice(req.params.id, 1);
	res.json(friends);
})

server.listen(3000, function(){
	console.log("Listening on 3000 tse")
});