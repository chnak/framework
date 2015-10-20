"use strict";

var config = require('../config');
var util = require('../misc/util');





exports.login = function(req, res){
    var _=this.lodash;
    var db=this.db;
    db.Users.filter(function(it){
        return it.Account==this.account&&it.PassWord==this.password
    },req.body).first()
    .then(function(data){
        data=_.pick(data,['Id','Account','Name']);
        req.session.userId=data.Id;
        res.json(data);
    })
    .fail(function(err){
        res.status(500).json(err);
    })
}

exports.signup = function(req, res){
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
                return res.status(500).json({message:'该账户已存在。'});
            })
            .fail(function(err){
                res.status(500).json(err);
            })
        },
        add:function(cb){
            var user=new $context.User({Account:kw.account,PassWord:kw.password});
            if(!user.isValid())return res.status(500).json({message:'请检查注册信息是否错误。'});
            user.save()
                .then(function(user){
                    var data=_.pick(user,['Id','Account','Amount','CreatDate','EditDate']);
                    cb(null,data);
                })
                .fail(function(err){
                    res.status(500).json(err);
                })
        }
    },function(err,result){
        if(err)return res.status(500).json(err);
        res.json(result.add);
    })
}
