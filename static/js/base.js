define(['jquery.pjax'], function() {
	if($.support.pjax){
		$.pjax.defaults.replace=false;
		$(document)
			.delegate('[ac-pjax]','click',function(){
				var path=$(this).attr('href');
				var content=$(this).attr('ac-pjax')||'#content';
				var title=$(this).attr('title')||'';
				$.pjax({url:path,container:content,title:title});
				return false
			})
	}
})