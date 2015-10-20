define(['knockout','uikit','text!./nav-bar.html'], function(ko,UIkit,view) {

	var o={
		navList:[
            {path:'/',name:'首页',pjax:true},
            {path:'/login',name:'登录',pjax:true},
            {path:'/signup',name:'注册',pjax:true}
        ]
	}

	function ViewModel() {
	    this.createViewModel=function(params, componentInfo) {
            return {
                navList: ko.observable(ko.utils.unwrapObservable(params.navList||o.navList)),
                active: ko.observable(ko.utils.unwrapObservable(params.active||window.location.pathname))
            };
        }
	}


	return { viewModel: new ViewModel(), template: view };

})