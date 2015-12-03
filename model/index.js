var $data = require("jaydata")
var lodash = require('lodash');
var $context=require("./context");
var $logger=require("./logger");
var config=require("../config");
var events=require("./events");

events.loads($context,'beforeCreate',events.beforeCreate);


$data.EntityContext.extend("ModelDatabase", {
    Users: { type: $data.EntitySet, elementType: $context.User},
	Posts: { type: $data.EntitySet, elementType: $context.Post},
    PayMents: { type: $data.EntitySet, elementType: $context.PayMent },
	Requests: { type: $data.EntitySet, elementType: $context.Request },
    HTTPHeaders: { type: $data.EntitySet, elementType: $context.HTTPHeader }
});


GLOBAL.$context=$context;
module.exports = new ModelDatabase(config.db);