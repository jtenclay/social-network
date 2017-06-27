var mongoose = require("mongoose");

var FriendSchema = new mongoose.Schema({
	name: String,
	username: String,
	password: String,
	favoriteEmoji: String,
	friends: Array
});

var friendModel = mongoose.model("Friend", FriendSchema);

module.exports = friendModel;