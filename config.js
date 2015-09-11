"use strict";

exports.debug = true;
exports.port = 8080;
exports.site_name = 'Node TODO';
exports.site_desc = 'Very simple todo, demo for connect web dev.';
exports.session_secret = 'todo session secret';

exports.db = {provider: 'mongoDB' , databaseName: 'MyTodoDatabase'}
