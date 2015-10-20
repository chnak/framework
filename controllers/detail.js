"use strict";

var config = require('../config');
var util = require('../misc/util');
//var db = require('../model/todoDao');


exports.index = function (req, res, next) {
    var db=this.db;
	db.Users.toArray(function(list){
		res.render('index',{data:list});
	})
};

exports.user = function(req, res){
    res.render('user');
}

exports.login = function(req, res){
    res.render('login');
}

exports.signup = function (req, res, next) {
    res.render('signup');
};

exports.view = function (req, res, next) {
	var qs=this.qs.stringify(req.query);
	qs=qs?'?'+qs:'';
	var link=req.params[0]+qs;
	console.log(link)
	res.render('view',{link:link});
};

exports.userInfo = function (req, res, next) {
    var db=this.db;
    var data={};
	res.render('userinfo',data);
};

exports.editUser = function (req, res, next) {
    var db=this.db;
    var data={};
	res.render('editUser',data);
};

exports.task = function (req, res, next) {
    //var db=this.db;
    var user=new $context.User({Account:'chnak',PassWord:'8393112',Amount:10.5});
	//console.dir(user.getType());
	console.log(user.isValid());
	user
		.save()
		.then(function(a){
			console.log(1111111);
			res.json(user);
		})
		.fail(function(err){
			console.log('222222222');
			res.json(err)
		})
	/*
	this.db.saveChanges(function(){
		res.json(user)
	})
	*/
};

