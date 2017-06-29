var express = require("express"),
	router = express.Router(),
	bodyParser = require("body-parser"),
	Friend = require("../models/Friend"),
	Message = require("../models/Message"),
	session = require("express-session"),
	bcrypt = require("bcrypt");

router.use(bodyParser.urlencoded({extended: true}));

router.get("/", function(req, res) {
	if (req.session.loggedIn === true) {
		Friend.find(function(err, friends) {
			var renderObject = {friends, session: req.session};
			console.log(renderObject)
			res.render("friends-list", renderObject);
		})
	} else {
		res.redirect("/");
	}
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
	res.redirect("/logout.html");
});

// login with information
router.post("/login", function(req, res) {
	Friend.findOne({username: req.body.username}, function(err, friend) {
		if (friend) {
			bcrypt.compare(req.body.password, friend.password, function(err, match) {
				if (match === true) {
					req.session.loggedIn = true;
					req.session.myId = friend._id;
					req.session.myName = friend.name;
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
	if (req.session.loggedIn === true) {
		var thisFriend, viewingOwnPage;
		if (req.session.myId === req.params.id) {
			viewingOwnPage = true;
		};

		Friend.findById(req.params.id).populate({path: "receivedMessages", populate: {path: "from"}}).exec(function(err, friend) {
			var renderObject = {
				friend: friend,
				session: req.session,
				viewingOwnPage: viewingOwnPage
			};
			res.render("profile", renderObject);
		});
	} else {
		res.redirect("/");
	}
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
		req.session.loggedIn = true;
		req.session.myId = friend._id;
		req.session.myName = friend.name;
		res.redirect("/friends/" + friend._id);
	})
});

router.patch("/:id", function(req, res) {
	bcrypt.hash(req.body.password, 10, function(err, hash) {
		req.body.password = hash;
		Friend.update({_id: req.params.id}, req.body, function(err, friend) {
			Friend.findById(req.params.id, function(err, friend) {
				res.json(friend);
			});
		});
	})
});

router.delete("/:id", function(req, res) {
	Friend.findByIdAndRemove(req.params.id, function(err, friend) {
		res.json("success");
	});
});

module.exports = router;