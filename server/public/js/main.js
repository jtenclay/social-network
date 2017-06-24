console.log("ok")

$("#send-emoji").click(function() {
	var emojiMessage = $("#emoji-field").val();
	var to = $("#to-field").val();
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
			window.location.reload();
		}
	});
});