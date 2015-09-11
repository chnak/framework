define(['knockout','uikit','text!./view.html','notify','css!/css/plugins/notify.min'], function(ko,UIkit,view) {

		function ViewModel(route) {
		    this.message = ko.observable('Welcome to 20150811!');
		    this.show=function(){
		    	UIkit.notify('My message');
		    }
		    this.show();
		}


		return { viewModel: ViewModel, template: view };

})