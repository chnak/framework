var $data = require("jaydata-mongodb");var shortid = require('shortid');$data.Entity.extend("User", {    Id: { type: $data.String, key: true, computed: true, defaultValue: shortid.generate},    Name: { type: $data.String, maxLength: 200 },	  Account: { type: $data.String, required: true},    PassWord:{ type: $data.String, required: true},  	Amount:{ type: $data.Decimal, defaultValue: 0.00},  	Parent:{ type: $data.String},    CreatDate: { type: $data.Date, defaultValue: Date},    EditDate: { type: $data.Date , defaultValue:Date},    PayMent: { type: "PayMent", inverseProperty: "User"},  	Requests: { type: $data.Array, elementType: 'Request', inverseProperty: 'User' }});$data.Entity.extend("PayMent", {    Id: { type: String, key: true, computed: true , defaultValue: shortid.generate},	Type: { type: Number, defaultValue:1 },    Name: { type: String, maxLength: 200 },	Account: { type: String, maxLength: 200 },    User: { type: "User", required: true, inverseProperty: "PayMent" }});$data.Entity.extend("Request", {    Id: { type: String, key: true, computed: true , defaultValue: shortid.generate},    URL: { type: String },    Method: { type: String  },    IPAddress: { type: String  },    UserAgent: { type: String  },	User:{ type: 'User', inverseProperty: 'Requests'},    Headers: { type: Array, elementType: 'HTTPHeader', inverseProperty: 'Request' }});$data.Entity.extend("HTTPHeader", {    Id: { type: String, key: true, computed: true, defaultValue: shortid.generate },    Key: { type: String  },    Value: { type: String  },    Request: { type: 'Request', inverseProperty: 'Headers', required: true }});exports.User=User;exports.PayMent=PayMent;exports.Request=Request;exports.HTTPHeader=HTTPHeader;