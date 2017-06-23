var mongoose = require("mongoose");

var FriendSchema = new mongoose.Schema({
	name: String,
	favoriteEmoji: String,
	friends: Array,
	receivedEmoji: Array
});

var friendModel = mongoose.model("Friend", FriendSchema);

module.exports = friendModel;