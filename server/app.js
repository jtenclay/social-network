var express = require("express"),
	app = express(),
	server = require("http").createServer(app),
	session = require("express-session"),
	path = require("path");

require("./db/db");

app.use(session({
	secret: "the world is abundant",
	resave: false,
	saveUninitialized: true,
	cookie: {secure: false}
}));

var FriendController = require("./controllers/FriendController");
var MessageController = require("./controllers/MessageController");

app.use("/friends", FriendController);
app.use("/messages", MessageController);

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");







server.listen(3000, function(){
	console.log("Listening on 3000 tse")
});