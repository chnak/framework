var detail=require('./detail');
var auth = require('./auth');
var api = require('./api');

var lists=[
	{path:'/', method:'get',  action:detail.index},
	{path:'/task', method:'get',  action:detail.task},
	{path:'/login', method:'get', action:detail.login},
	{path:'/signup', method:'get', action:detail.signup},
	{path:'/user', method:'get', auth:auth.index, action:detail.user},
	{path:'/v/*', method:'all', action:detail.view},

	//api setting
	{path:'/api/login', method:'post', action:api.login},
	{path:'/api/signup', method:'post', action:api.signup}

]



module.exports=lists;
