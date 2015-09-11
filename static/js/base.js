define(['jquery.pjax'], function() {
	if($.support.pjax){
		$(document).pjax('a[data-pjax]', '#content');
	}
})