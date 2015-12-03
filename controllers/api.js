"use strict";

var config = require('../config');
var util = require('../misc/util');





exports.login = function(req, res, next){
    var _=this.lodash;
    var db=this.db;
    db.Users.filter(function(it){
        return it.Account==this.account&&it.PassWord==this.password
    },req.body).first()
    .then(function(data){
        data=_.pick(data,['Id','Account','Name']);
        req.session.userId=data.Id;
        next({status:0,data:data});
    })
    .fail(next)
}

exports.signup = function(req, res, next){
    var _=this.lodash;
    var db=this.db;
    var kw=req.body;
    this.async.series({
        count:function(cb){
            db.Users.filter(function(it){
                return it.Account==this.account;
            },kw).count()
            .then(function(count){
                if(!count)return cb(null,count);
                cb({message:'该账户已存在。'});
            })
            .fail(cb)
        },
        add:function(cb){
            var user=new $context.User({Account:kw.account,PassWord:kw.password});
            if(!user.isValid())return cb({message:'请检查注册信息是否错误。'});
            user.save()
                .then(function(user){
                    var data=_.pick(user,['Id','Account','Amount','CreatDate','EditDate']);
                    cb(null,data);
                })
                .fail(cb)
        }
    },function(err,result){
        if(err)return next(err);
        req.session.userId=result.Id;
        next({status:0,data:result.add});
    })
}
