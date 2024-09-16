
const token_1 = "Z2hwX1ZM";
const token_2 = "UGlEckRtWj";
const token_3 = "NiZVJ5S3FWVG";
const token_4 = "owN1lYR2dCZT";
const token_5 = "NoWTRDSE1IVA==";
const token = token_1 + token_2 + token_3 + token_4 + token_5;
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
				databody = data[i].body;
				databody = databody.replace(/\r\n/g, "<br>");
				databody = databody.replace(/\n/g, "<br>");
				$("#comment-list").append("<h3>" + (i + 1) + ". " + data[i].title + "</h3>");
				$("#comment-list").append("<div class=\"comment_box\">" + databody + "</div>");
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

const gallery = document.querySelector('.gallery');

// Initialize Viewer.js
const viewer = new Viewer(gallery, {
	inline: false,
	button: true,
	navbar: true,
	title: true,
	toolbar: true,
	tooltip: true,
	movable: true,
	zoomable: true,
	rotatable: true,
	scalable: true,
	transition: true,
	fullscreen: true,
	keyboard: true,
});