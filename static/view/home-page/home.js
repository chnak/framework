define(["knockout","text!./home.html"], function(ko, homeTemplate) {

  function HomeViewModel(route) {
    this.message = ko.observable('Welcome to 20150811!');
  }

  HomeViewModel.prototype.doSomething = function() {
    this.message('You invoked doSomething() on the viewmodel.');
  };
  
  HomeViewModel.prototype.btnCloseClick=function(){
		alert('hi from closer');
	}

  return { viewModel: HomeViewModel, template: homeTemplate };

});
