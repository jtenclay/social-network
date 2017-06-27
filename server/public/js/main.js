

// send emoji message to database and update page

$("#send-emoji").click(function() {
	var emojiMessage = $("#emoji-field").val();
	var to = $("body").attr('id');
	console.log(to);
	console.log(emojiMessage);
	var from = $("#from-field").val();
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
});



// inline validation to make sure emoji message is not more than one character

var oldVal = $("#emoji-field").val();
$("#emoji-field").on("propertychange change click keyup input paste", function() {
	if ($(this).val().length > 1) {
		//

		$(this).val(oldVal);
	} else {
		oldVal = $(this).val();
	};
});







