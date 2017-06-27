var express = require("express"),
	router = express.Router(),
	bodyParser = require("body-parser"),
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
	res.json(message);
});

router.delete("/:id", function(req, res) {
	Message.findByIdAndRemove(req.params.id, function(err, message) {
		res.json("success");
	});
});

module.exports = router;