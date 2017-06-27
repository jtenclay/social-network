

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



// make user

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

var oldVal = $("#emoji-field").val();
var emojiCharCodes = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
$("#emoji-field").on("propertychange change click keyup input paste", function() {
	// see https://mathiasbynens.be/notes/javascript-unicode
	// if the input is only one char (counting emoji as one instead of two) and is an emoji
	if ($(this).val().replace(emojiCharCodes, '_').length < 2 && $(this).val().match(emojiCharCodes)) {
		// then let it through
		oldVal = $(this).val();
	} else {
		// else revert it to its previous value
		$(this).val(oldVal);
	};
});







