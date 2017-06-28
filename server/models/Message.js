var mongoose = require("mongoose");

var MessageSchema = new mongoose.Schema({
	emojiMessage: String,
	from: {type: mongoose.Schema.Types.ObjectId, ref: "Friend"},
	to: {type: mongoose.Schema.Types.ObjectId, ref: "Friend"},
	timeStamp: Number
});

var messageModel = mongoose.model("Message", MessageSchema);

module.exports = messageModel;