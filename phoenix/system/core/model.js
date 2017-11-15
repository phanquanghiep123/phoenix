function Model() {
	var _db   = require("./db.js");
	this.db   = new _db();
	this.__construct   = function(){console.log("__construct")}
	this.__destructors =  function(){console.log("__destructors")}
	this.init = function($object){
		var that  = this[$object];
		var _this = this;
		delete this[$object];
		this[$object] = Object.assign(_this,that);
		return this[$object];
	}
}
module.exports = Model;