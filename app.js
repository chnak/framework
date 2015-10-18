var express = require('express');
var swig = require('swig');
var async = require('async');
var validator = require('validator');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var cookieParser = require('cookie-parser')
var misc = require('./misc/');
var lodash = require('lodash');
var config = require("./config");
var controllers=require("./controllers");
var db = require('./model');

var defaults={
	method:"POST",
	uri:{
		protocol:'http:',
		host:'www.qq.com',
		port:null,
	},
	timeout:20000,
	json:false
}


var app = express();
app.engine('html', swig.renderFile);
app.set('port', config.port);
app.set('env', config.env||'development');
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');
app.set('view cache', false);
swig.setDefaults({ cache: false });

app.use(misc.ErrorLog());
app.use(misc.BigPipe());
app.use(misc.Request(defaults));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(__dirname + '/static'));

//app.use(express.logger('dev'));

app.use(session({
  secret: 'keyboard cat',
  cookie: { secure: true }
}))



if ('development' == app.get('env')) {
  //app.use(express.errorHandler());
}


app.get('*',function(req,res,next){
    var pjax=req.get('X-PJAX');
    res.locals.PJAX=pjax?true:false;
    next();
})



misc.load(app,controllers,{
    db:db,
    lodash:lodash,
    vd:validator,
    async:async
  });

app.use(function(err,req,res,next){
    console.log('===',err)
    next()
})


app.on('close', function(errno) {
	console.log('close')
    //db.disconnect(function(err) { });
});

db.onReady(function(){
	console.log('db is ready');
})

app.listen(app.get('port'),function(){
  console.log("Express server listening on port " + app.get('port'));
});  


