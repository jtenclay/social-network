var mongoose = require("mongoose");

var FriendSchema = new mongoose.Schema({
	name: String,
	username: String,
	password: String,
	favoriteEmoji: String,
	friends: [{type: mongoose.Schema.Types.ObjectId, ref: "Friend"}],
	receivedMessages: [{type: mongoose.Schema.Types.ObjectId, ref: "Message"}],
	sentMessages: [{type: mongoose.Schema.Types.ObjectId, ref: "Message"}]
});

var friendModel = mongoose.model("Friend", FriendSchema);

module.exports = friendModel;