

// send emoji message to database and update page

$("#send-emoji").click(function() {
	// don't run if field is empty
	if ($("#emoji-field").val()) {
		var emojiMessage = $("#emoji-field").val();
		var to = $("body").attr('id');
		var from = $("body").attr("data-logged-in-user");
		var timeStamp = $.now();
		var newMessage = {
			emojiMessage: emojiMessage,
			to: to,
			from: from,
			timeStamp: timeStamp
		};
		$.ajax({
			method: "POST",
			url: "http://localhost:3000/messages",
			data: newMessage,
			success: function(response) {
				location.reload();
			}
		});
	};
});



// make user (hard-coded into register view as a form)

// $("#sign-up").click(function() {
// 	var emojiMessage = $("#emoji-field").val();
// 	var to = $("body").attr('id');
// 	console.log(to);
// 	console.log(emojiMessage);
// 	var from = $("#from-field").val();
// 	var timeStamp = $.now();
// 	var newMessage = {
// 		emojiMessage: emojiMessage,
// 		to: to,
// 		from: from,
// 		timeStamp: timeStamp
// 	};
// 	$.ajax({
// 		method: "POST",
// 		url: "http://localhost:3000/messages",
// 		data: newMessage,
// 		success: function(response) {
// 			location.reload();
// 		}
// 	});
// });



// inline validation to make sure emoji message is not more than one character

// emoji lengths:
// find zero width joiner and take out the thing following it
// take out skin color

var findEmojiLength = function(string) {
	// take out skin color
	string = string.replace(/\uD83C[\uDFFb-\uDFFF]/g, "") // these are the range of skin colors
	// replace surrogate pairs with one character
	string = string.replace(emojiCharCodes, "_");
	// take out zero-width joiner and the character that follows
	string = string.replace(/\u200d./g, ""); // \u200d is zero-width joiner
	// return the length of edited string
	return string.length;
}




var oldVal = $("#emoji-field").val();
var emojiCharCodes = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g; 
$("#emoji-field").on("propertychange change click keyup input paste", function() {
	// see https://mathiasbynens.be/notes/javascript-unicode
	// if the input is only one char (counting emoji as one instead of two) and is an emoji (hack!!)
	if ((findEmojiLength($(this).val()) < 2 && $(this).val().charCodeAt(0) > 1000) || $(this).val().length === 0) {
		// then let it through
		oldVal = $(this).val();
	} else {
		// else revert it to its previous value
		$(this).val(oldVal);
	};
});







