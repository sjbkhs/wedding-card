
const token = "Z2hwX1ZZeVhBSkswem5qNEVBeGZ3WldwbUplSmp1WWNsMDJoaWZnTg==";
function getText() {
	var result = [];
	$.ajax({
		url: "https://api.github.com/repos/sjbkhs/wedding-card/issues",
		type: 'get',
		dataType: 'html',
		async: false,
		beforeSend: function (xhr) {
			xhr.setRequestHeader("Authorization", "token " + atob(token));
		},
		success: function (obj) {
			var data = JSON.parse(obj);
			$.each(data.reverse(), function (i) {
				$("#comment-list").append("<h3>" + (i + 1) + ". " + data[i].title + "</h3>");
				$("#comment-list").append("<p>" + data[i].body + "</p>");
			});
		}
	});
	FileReady = true;
	return result;
}
$(document).ready(function () {
	getText();
	$("#comment-registration").click(function () {
		var author = $('#author').val().trim();
		var message = $('#message').val().trim();
		if (author === '') { alert('작성자명을 입력해주세요.'); return; }
		if (message === '') { alert('축하메시지를 입력해주세요'); return; }

		$.ajax({
			url: "https://api.github.com/repos/sjbkhs/wedding-card/issues",
			type: 'post',
			dataType: 'html',
			data: JSON.stringify({
				title: author,
				body: message,
			}),
			beforeSend: function (xhr) {
				xhr.setRequestHeader("Authorization", "token " + atob(token));
			},
			success: function (data) {
				$('#comment-list').empty();
				getText();
				$('#author').val('');
				$('#message').val('');
			}
		});
	})
});