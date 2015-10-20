var lodash = require("lodash");
var request = require('request');
var url = require("url");
var domain = require('domain');

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

function FuncQuery(defaults){
	
    var addFormData=function(options,ajax){
        var formData = options.formData
        var requestForm = ajax.form()
        var appendFormValue = function (key, value) {
          if (value.hasOwnProperty('value') && value.hasOwnProperty('options')) {
            requestForm.append(key, value.value, value.options)
          } else {
            requestForm.append(key, value)
          }
        }
        for (var formKey in formData) {
          if (formData.hasOwnProperty(formKey)) {
            var formValue = formData[formKey]
            if (formValue instanceof Array) {
              for (var j = 0; j < formValue.length; j++) {
                appendFormValue(formKey, formValue[j])
              }
            } else {
              appendFormValue(formKey, formValue)
            }
          }
        }
    }

    this.ajax=function(options,callback){
		request.defaults(defaults||{});
		var uri=url.parse(options.path);
		lodash.forEach(uri,function(value,key){
           uri[key]=uri[key]?uri[key]:defaults.uri[key];
        })
        options.uri=url.format(uri);
        options.form=options.data;
		delete options.path;
        delete options.data;
        var start_time=(new Date()).getTime();
        var funCallback=function(error, response, body){
            var end_time=(new Date()).getTime();
            var cost_time=(end_time-start_time)+'ms';
            if (!error && response.statusCode == 200) {
                console.log('REQUEST SUCCESS: ',options.method,url.format(options.uri),response.statusCode,cost_time,'\n',options.form,'\n',body.msg);
                if(options.success)return options.success(body);
            }else{
                if(options.error)return options.error(error, response, body); 
            }

        }
		callback=callback||options.callback||funCallback;
        var ajax=request(options,callback.bind(options));
        if(options.formData){addFormData(options,ajax)}
        return ajax;
    };
    return this;
}

 
function pageModel(data){
        var o={
            page:0,
            total:0,
            pageItems:5,
            pageSize:3,
            totalPage:0,
        }
        lodash.extend(o,data||{});
        var sizes=Math.ceil(o.total/o.pageItems);
        o.totalPage=sizes;
        var ne_half = Math.ceil(o.pageSize);
        var upper_limit = sizes-o.pageSize+1;
        var start=o.page>ne_half?Math.max(Math.min(o.page-ne_half, upper_limit), 1):1;
        var end = o.page>ne_half?Math.min(o.page+ne_half, sizes):Math.min(2*o.pageSize, sizes);
        var prev=o.page-1>0?(o.page-1):0;
        var next=o.page+1<=o.totalPage?(o.page+1):0;
        return {
            prev:prev,
            next:next,
            page:o.page,
            totalPage:o.totalPage,
            items:lodash.range(start,end+1)
        }
    }

exports.BigPipe=function BigPipe(){
    return function BigPipe(req,res,next){
        res.bigpipe=function(view,options,callback){
            var $this=this;
            return $this.render(view, options, function (err, str) {
                 $this.pipeCount--;
                 if (err) return $this.req.next(err);
                 $this.write(str+'\r\n');
                 if (!$this.pipeCount)return callback?callback(err,str):$this.end()
            })
        }
        return next()
    }
};

exports.ErrorLog=function ErrorLog(){
    return function ErrorLog(req,res,next){
        var reqDomain = domain.create();
		reqDomain.add(req);
		reqDomain.add(res);
        reqDomain.add(this);
		reqDomain.on('error', function (err) {
			res.send(500,'Server Error'); 
		});
		var ms_start=(new Date()).getTime();
		req.on('end', function() {
			var ms_end=(new Date()).getTime();
			var ms_str=(ms_end-ms_start)+'ms';
			console.log(req.method,req.ip,req.path,res.statusCode,req.get('referer'),req.get('user-agent'),ms_str);
		});
		reqDomain.run(next);
    }
};

exports.Request = function Request(defaults){
    return function Request(req, res, next){
        var funcQuery=new FuncQuery(res,defaults);
        lodash.extend(req,funcQuery);
        return next();
    }
}

exports.Model= function Model(db){
  return function Model(req, res, next){
    lodash.extend(req,db||{});
    return next();
  }
}

exports.load=function(app,lists,params){
	lists.forEach(function(r){
	    if(r.auth)app[r.method](r.path,function(req, res, next){
          r.auth.call(params,req, res, next)
      });
	    if(r.befor)app[r.method](r.path,function(req, res, next){
          r.befor.call(params,req, res, next)
      });
	    if(r.action){
	    	app[r.method](r.path,function(req, res, next){
            r.action.call(params,req, res, next)
        });
	    }
	})
}



exports.FuncQuery=FuncQuery;

exports.pageModel=pageModel;


