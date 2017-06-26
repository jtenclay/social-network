var express = require("express"),
	router = express.Router(),
	bodyParser = require("body-parser"),
	Message = require("../models/Message");

router.use(bodyParser.urlencoded({extended: true}));

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

module.exports = router;