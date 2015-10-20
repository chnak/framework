define(['knockout','uikit','text!./login-box.html','notify','css!/css/plugins/notify.min'], function(ko,UIkit,view) {

	var o={
		link:{
			login:'/api/login'
		}
	}

	function ViewModel() {
	    this.account = ko.observable();
	    this.password = ko.observable();
	    this.submit = function(){
	    	var it=this;
	    	//var nav=ko.dataFor($('widget-nav').children('nav')[0]);
	    	//nav.data('1112');
	    	UIkit.notify('asdsadsad')
	    	return false;
	    	$.ajax({
	    		url:o.link.login,
	    		data:{account:it.account(),password:it.password()}
	    	})
	    	.done(function(data){
	    		$.pjax({url:'/user',container:"#content"})
	    	})
	    }
	}


	return { viewModel: ViewModel, template: view };

})