var express = require("express"),
	app = express(),
	server = require("http").createServer(app),
	path = require("path"),
	bodyParser = require("body-parser"),
	Friend = require("./models/Friend");
	Message = require("./models/Message");

require("./db/db");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");



app.get("/:id", function(req, res) {
	var thisFriend;
	var theirReceivedMessages;
	Message.find(function(err, messages) {
		theirReceivedMessages = messages;
		Friend.findById(req.params.id, function(err, friend) {
			thisFriend = friend;
			var fullObject = {
				friend: thisFriend,
				messages: theirReceivedMessages
			};
			res.render("profile", fullObject);
		});
	});
});

app.get("/friends", function(req, res) {
	Friend.find(function(err, friends) {
		res.json(friends);
	})
});

app.get("/friends/:id", function(req, res) {
	Friend.findById(req.params.id, function(err, friend) {
		res.json(friend);
	})
});

app.post("/friends", function(req, res) {
	var friend = new Friend({
		name: req.body.name,
		favoriteEmoji: req.body.favoriteEmoji,
		friends: req.body.friends,
		receivedEmoji: req.body.receivedEmoji
	});
	friend.save();
	res.json(friend);
});

app.post("/messages", function(req, res) {
	var message = new Message({
		emojiMessage: req.body.emojiMessage,
		from: req.body.from,
		to: req.body.to,
		timeStamp: req.body.timeStamp
	});
	message.save();
	res.json(message);
});

app.patch("/friends/:id", function(req, res) {
	Friend.findById(req.params.id, function(err, friend) {
		friend.name = req.body.name || friend.name;
		friend.favoriteEmoji = req.body.favoriteEmoji || friend.favoriteEmoji;
		friend.friends = req.body.friends || friend.friends;
		friend.receivedEmoji = req.body.receivedEmoji || friend.receivedEmoji;
		friend.save();
		res.json(friend);
	});
});

app.delete("/friends/:id", function(req, res) {
	Friend.findByIdAndRemove(req.params.id, function(err, friend) {
		res.json("success");
	});
});

server.listen(3000, function(){
	console.log("Listening on 3000 tse")
});