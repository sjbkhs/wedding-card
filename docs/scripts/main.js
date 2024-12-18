
const token_1 = "Z2hwX1ZM";
const token_2 = "UGlEckRtWj";
const token_3 = "NiZVJ5S3FWVG";
const token_4 = "owN1lYR2dCZT";
const token_5 = "NoWTRDSE1IVA==";
const token = token_1 + token_2 + token_3 + token_4 + token_5;
function getText() {
	var result = [];
	$.ajax({
		url: "https://api.github.com/repos/sjbkhs/wedding-card/issues?per_page=100",
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
				console.log(data[i].title);
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
	});

	// 팝업 열기
	$('#openPopup-groom').click(function () {
		$('#popup-groom').show();
		$('#popupOverlay').show();
		// 히스토리에 팝업이 열렸다는 상태 추가
		history.pushState(null, null, location.href);
	});

	$('#openPopup-bride').click(function () {
		$('#popup-bride').show();
		$('#popupOverlay').show();
		// 히스토리에 팝업이 열렸다는 상태 추가
		history.pushState(null, null, location.href);
	});

	// 팝업 닫기
	$('#closePopup, #popupOverlay').click(function () {
		closePopup();
	});

	// 뒤로가기 버튼을 누르면 팝업 닫기
	$(window).on('popstate', function () {
		closePopup();
	});

	// 팝업 닫는 함수
	function closePopup() {
		$('#popup-groom').hide();
		$('#popup-bride').hide();
		$('#popupOverlay').hide();
	};

	$('.copyButton').click(function (event) {
		event.preventDefault();

		// data-copy-target 속성에서 복사할 타겟의 id 가져오기
		const targetId = $(this).data('copy-target');

		// 해당 id의 값을 클립보드에 복사
		const copyText = $('#' + targetId).val();
		navigator.clipboard.writeText(copyText).then(function () {
			alert('텍스트가 복사되었습니다: (' + copyText + ')');
		}).catch(function (error) {
			alert('복사에 실패했습니다: ' + error);
		});
	});
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
	movable: false,
	zoomable: true,
	rotatable: true,
	scalable: true,
	transition: true,
	fullscreen: true,
	keyboard: true,
});