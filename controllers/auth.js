"use strict";

var config = require('../config');
//var db = require('../model/todoDao');


exports.index = function(req, res, next){
	var db=this.db;
	var user_id=req.session.userId;
	if(!user_id)return next(); //#####
    this.async.series({
		user:function(cb){
			db.Users.filter(function(it){
				return it.Id==user_id;
			}).first()
			.then(function(d){
				cb(null,d);
			})
			.fail(function(err){
				cb(err,null);
			})
		}
	},function(err,result){
		if(err)return res.json(err);
		res.locals.user=result.user;
		next();
	})


}


