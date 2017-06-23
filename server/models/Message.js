var mongoose = require("mongoose");

var MessageSchema = new mongoose.Schema({
	emojiMessage: String,
	from: String,
	to: String,
	timeStamp: Number
});

var messageModel = mongoose.model("Message", MessageSchema);

module.exports = messageModel;