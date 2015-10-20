define([
		'text!./signup-box.html',
		'validator',
		'notify',
		'css!/css/plugins/notify.min',
		'knockout.validation'], 
function(view,d) {

	ko.validation.init({
		errorMessageClass:'uk-alert uk-alert-danger my-vaild'
	})
	var o={
		link:{
			signup:'/api/signup'
		}
	}
	console.log(d)
	function ViewModel() {
		var it=this;
	    this.account = ko.observable('');
	    this.password = ko.observable('');
		this.com_pass = ko.observable('');

		this.account.extend({
			required:{message:'该字段必填。'},
          	validation: [
          		validator('请输入正确的手机号或邮箱地址',[d.isEmail,function(v){return d.isMobilePhone(v,'zh-CN')}])
          	]
      	})
      	this.password.extend({
      		required:{message:'该字段必填。'},
      		validation:[
      			validator('请输入6-16位字母或数字',[d.isAlphanumeric,function(v){return d.isLength(v,6,16)}],true)
      		]
      	})
      	this.com_pass.extend({
      		required:{message:'该字段必填。'},
      		validation:[
      			validator('两次输入密码不正确',[function(v){return d.equals(it.password(),v)}])
      		]
      	})

	    this.submit = function(){
			if(!it.isValid()){return it.errors.showAllMessages()}
	    	$.ajax({
	    		url:o.link.signup,
	    		data:{account:it.account(),password:it.password()}
	    	})
	    	.done(function(data){
	    		$.pjax({url:'/user',container:"#content"})
	    	})
	    }
			console.log(this)
			ko.validatedObservable(this)();
			return this;
	}

	function validator(msg,params,type){
		return {
          	validator: function(val,params){
          		if($.isArray(params)){
          			var pass=[];
          			$.each(params,function(i,r){
          				pass.push(r(val))
          			})
          			if(!type){return $.inArray(true,pass)>=0?true:false;}
          			else{return $.inArray(false,pass)>=0?false:true;}
          		}
          	},
			message: msg,
			params:params
      	}
	}

	return { viewModel:ViewModel, template: view };

})
