var express = require("express"),
	router = express.Router(),
	bodyParser = require("body-parser"),
	Friend = require("../models/Friend"),
	Message = require("../models/Message");

router.use(bodyParser.urlencoded({extended: true}));



router.get("/", function(req, res) {
	Friend.find(function(err, friends) {
		var listOfFriends = {friends};
		res.render("friends-list", listOfFriends);
		console.log(listOfFriends);
	})
});

router.get("/:id", function(req, res) {
	var thisFriend;
	var theirReceivedMessages;
	Message.find({to: req.params.id}, function(err, messages) {
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

router.post("/", function(req, res) {
	var friend = new Friend({
		name: req.body.name,
		favoriteEmoji: req.body.favoriteEmoji,
		friends: req.body.friends,
		receivedEmoji: req.body.receivedEmoji
	});
	friend.save();
	res.json(friend);
});

router.patch("/:id", function(req, res) {
	Friend.findById(req.params.id, function(err, friend) {
		friend.name = req.body.name || friend.name;
		friend.favoriteEmoji = req.body.favoriteEmoji || friend.favoriteEmoji;
		friend.friends = req.body.friends || friend.friends;
		friend.receivedEmoji = req.body.receivedEmoji || friend.receivedEmoji;
		friend.save();
		res.json(friend);
	});
});

router.delete("/:id", function(req, res) {
	Friend.findByIdAndRemove(req.params.id, function(err, friend) {
		res.json("success");
	});
});

module.exports = router;