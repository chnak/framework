(function($){
	var src=$('iframe').attr('data-src');
	src=src+(window.location.hash?window.location.hash:'');
	$('iframe').attr('src',src);
	$('iframe').on('load',function(e){
		console.log(e)
	})
})(jQuery)

