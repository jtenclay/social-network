var express = require("express"),
	router = express.Router(),
	bodyParser = require("body-parser"),
	Friend = require("../models/Friend"),
	Message = require("../models/Message"),
	session = require("express-session"),
	bcrypt = require("bcrypt");

router.use(bodyParser.urlencoded({extended: true}));

router.get("/", function(req, res) {
	var myId;
	if (req.session.loggedIn === true) {
		myId = req.session.myId;
	};
	Friend.find(function(err, friends) {
		var listOfFriends = {friends, myId: myId};
		console.log(listOfFriends)
		res.render("friends-list", listOfFriends);
	})
});

router.get("/register", function(req, res) {
	res.render("register");
});

// get login page
router.get("/login", function(req, res) {
	res.render("login");
});

// log out
router.get("/logout", function(req, res) {
	req.session.loggedIn = false;
	res.render("logout");
});

// login with information
router.post("/login", function(req, res) {
	Friend.findOne({username: req.body.username}, function(err, friend) {
		if (friend) {
			bcrypt.compare(req.body.password, friend.password, function(err, match) {
				if (match === true) {
					req.session.loggedIn = true;
					req.session.myId = friend._id;
					res.redirect("/friends/" + friend._id);
				} else {
					res.send("something's incorrect and you can't log in, sorry y y y pass wrong"); // password was wrong
				}
			});
		} else {
			res.send("something's incorrect and you can't log in, sorry y y y user wrong") // username not found
		};
	});
});

router.get("/:id", function(req, res) {
	var thisFriend, theirReceivedMessages, isLoggedIn, myId, viewingOwnPage;
	if (req.session.loggedIn === true) {
		isLoggedIn = true;
		myId = req.session.myId;
		if (myId === req.params.id) {
			viewingOwnPage = true;
		}
	};
	Message.find({to: req.params.id}, function(err, messages) {
		theirReceivedMessages = messages;
		Friend.findById(req.params.id, function(err, friend) {
			thisFriend = friend;
			var fullObject = {
				friend: thisFriend,
				messages: theirReceivedMessages,
				loggedIn: isLoggedIn,
				myId: myId,
				viewingOwnPage: viewingOwnPage
			};
			res.render("profile", fullObject);
		});
	});
});

router.post("/", function(req, res) {
	bcrypt.hash(req.body.password, 10, function(err, hash) {
		var friend = new Friend({
			username: req.body.username,
			password: hash,
			name: req.body.name,
			favoriteEmoji: req.body.favoriteEmoji,
			friends: req.body.friends,
			receivedEmoji: req.body.receivedEmoji
		});
		friend.save();
		console.log(friend);
		res.redirect("/friends/" + friend._id);
	})
});

router.patch("/:id", function(req, res) {
	Friend.findById(req.params.id, function(err, friend) {
		bcrypt.hash(req.body.password, 10, function(err, hash) {
			friend.name = req.body.name || friend.name;
			friend.username = req.body.username || friend.username;
			friend.password = hash || friend.password;
			friend.favoriteEmoji = req.body.favoriteEmoji || friend.favoriteEmoji;
			friend.friends = req.body.friends || friend.friends;
			friend.receivedEmoji = req.body.receivedEmoji || friend.receivedEmoji;
			friend.save();
			res.json(friend);
		})
	});
});

router.delete("/:id", function(req, res) {
	Friend.findByIdAndRemove(req.params.id, function(err, friend) {
		res.json("success");
	});
});

module.exports = router;