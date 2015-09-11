"use strict";
var async = require("async");
var moment = require('moment');
var config = require('../config');
//var db = require('../model/todoDao');


exports.events = function(req, res, next){
    var self=this;
    var db=self.db;
    var data={};
    data.page= parseInt(req.params.page)||1;
    data.pageSize=20;
    var index=data.page-1;
    async.parallel({
        total:function(cb){
            db.Events.count({},cb);
        },
        events:function(cb){
            var query = db.Events.find();
            query.order('id', 'DESC');
            query.skip(index*data.pageSize);
            query.limit(data.pageSize);
            query.run({},cb);
        }
    },function(err, results){
        if(err)return next(err);
        data.total=results.total;
        data.events=results.events;
        data.pages= self.pages({page:data.page,total:data.total,pageItems:data.pageSize});
        res.render('event/list',data)
    })


}



exports.view = function (req, res, next) {
    var db=this.db;
    var id = req.params.id||'';
    if(!id)return next();
    db.Events.findById(id,function(err,data){
        if(err)return next(err);
        res.render('event/view',{event:data})
    })
};

exports.edit = function (req, res, next) {
    var db=this.db;
    var id = req.params.id||'';
    if(!id)return next();
    if(req.method=='POST'){
        req.body.time=moment.utc(req.body.time,'DD/MM/YYYY');
        return db.Events.update({_id:id},req.body,function(err){
            if(err)return next(err);
            res.redirect('back');
        })
    }
    db.Events.findById(id,function(err,data){
        if(err)return next(err);
        res.render('event/edit',{event:data})
    })
};

exports.add = function (req, res, next) {
    var db=this.db;
    var kw=this.lodash.pick(req.body,[
        'homeTeam',
        'awayTeam',
        'country',
        'type',
        'league',
        'time'
        ])
    console.log(kw)
    var data={}
    if(req.method=='POST'){
        kw.time=moment.utc(kw.time,'DD/MM/YYYY');
        var event=new db.Events(kw);
        return event.save(function(err){
            if(err)return next(err);
            res.redirect('back');
        })
    }
    res.render('event/edit',{event:data})
};

exports.editplus = function(req, res, next){
    var db=this.db;
    var kw=req.body;
    var data={
        id:kw.id||'',
        homeTeam:kw.homeTeam,
        awayTeam:kw.awayTeam,
        country:kw.country,
        type:kw.type,
        league:kw.league,
        //odds:kw.odds
        //time:kw.time
    }
    if(data.id){
        db.Events.update({_id:data.id},data,function(err){
            if(err)return next(err);
            res.redirect('back');
        })
    }else{
        delete data.id;
        var event=new db.Events(data);
        event.save(function(err){
            if(err)return next(err);
            res.redirect('back');
        })
    }
}


exports.delete = function (req, res, next) {
    var db=this.db;
    var id = req.params.id||'';
    if(!id)return next();
    db.Events.destroyById(id, function(err) {
        if (err) {return next(err)}
        res.redirect('back');
    });
};

