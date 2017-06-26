var express = require("express"),
	app = express(),
	server = require("http").createServer(app),
	path = require("path");

require("./db/db");

var FriendController = require("./controllers/FriendController");
app.use("/friends", FriendController);

var MessageController = require("./controllers/MessageController");
app.use("/messages", MessageController);

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");



server.listen(3000, function(){
	console.log("Listening on 3000 tse")
});