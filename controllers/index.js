var detail=require('./detail');
var auth = require('./auth');

var lists=[
	{path:'/', method:'get', auth:auth.index, action:detail.index},
	{path:'/task', method:'get', auth:auth.index, action:detail.task},
	{path:'/login', method:'get', action:detail.login},
	{path:'/user', method:'get', action:detail.user},
	{path:'/signin', method:'get', auth:auth.index, action:detail.signin}

]



module.exports=lists;

