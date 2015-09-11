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
    var db=this.db;
    var kw=req.query;
    
    var nw=new $context.User({Account:kw.account,PassWord:kw.password});
    
    this.async.series({
    		newOne:function(cb){
    			if(!nw.isVaild())cb({ret:-1,msg:'输入信息有误。'});
    			cb(null,nw)
    		},
            hasOne:function(cb){
                db.Users.filter(function(it){
                	return it.Account==kw.account;
                }).count()
                .then(function(d){
                	if(d)cb({ret:-1,msg:'用户名已存在。'});
                	cb(null,d);
                })
                   
            },
            addDone:function(cb){
                var add=db.Users.add(nw)
                util.cb(cb).bind(add);
            }
        },function(err,results){
            if(err)return res.json(err);
            res.json({ret:0,msg:'注册成功！'})
        })
    

 //    var data={};
	// res.render('signup',data);
};

exports.signin = function (req, res, next) {
    var db=this.db;
    var kw=req.query;
    db.Users.filter(function(it){
    	return it.Account==kw.account&&it.PassWord==kw.password
    }).first()
    .then(function(data){
    	res.json(data)
    })
    .fail(function(err){
    	res.json(err);
    })
    //var data={};
	//res.render('signin',data);
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
    var user=new $context.User({Account:'dfds',PassWord:'asdfdsfds',Amount:10.5});
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

