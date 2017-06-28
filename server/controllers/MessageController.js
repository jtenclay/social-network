var express = require("express"),
	router = express.Router(),
	bodyParser = require("body-parser"),
	Friend = require("../models/Friend"),
	Message = require("../models/Message");

router.use(bodyParser.urlencoded({extended: true}));

router.get("/", function(req, res) {
	Message.find(function(err, messages) {
		res.json(messages);
	})
});

router.get("/to/:id", function(req, res) {
	Message.find({to: req.params.id}, function(err, messages) {
		var messagesToUser = {messages};
		res.json()
	})
});

router.post("/", function(req, res) {
	var message = new Message({
		emojiMessage: req.body.emojiMessage,
		from: req.body.from,
		to: req.body.to,
		timeStamp: req.body.timeStamp
	});
	message.save();
	Friend.findById(message.from, function(err, friend) {
		friend.sentMessages.push(message.id);
		friend.save();
	})
	Friend.findById(message.to, function(err, friend) {
		console.log(friend);
		friend.receivedMessages.push(message.id);
		friend.save();
	})
	res.json(message);
});

router.delete("/:id", function(req, res) {
	Message.findByIdAndRemove(req.params.id, function(err, message) {
		res.json("success");
	});
});

module.exports = router;