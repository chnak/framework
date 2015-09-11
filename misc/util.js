

exports.cb = function(cb){
	this.then(function(data){
    	cb(null,data)
    })
    .fail(function(err){
    	cb(err,null);
    })
}