"use strict";

var config = require('../config');
//var db = require('../model/todoDao');


exports.index = function(req, res, next){
	var db=this.db;
	var userId=req.session.userId;
	if(!userId)return res.render('error',{message:'没有足够的访问权限。'});//res.send(401,'没有足够的访问权限。');
    this.async.series({
		user:function(cb){
			db.Users.filter(function(it){
				return it.Id==this.userId;
			},{userId:userId})
			.first()
			.then(function(d){
				cb(null,d);
			})
			.fail(function(err){
				cb(err,null);
			})
		}
	},function(err,result){
		if(err)return res.status(500).json(err);
		res.locals.user=result.user;
		next();
	})


}


