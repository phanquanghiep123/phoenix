function Controller() {
	this.request;
	this.response;
	this.next = function(){
		this.response.next();
	}
	this.end = function(){
		this.response.end();
	}
	this.info = [];
	var _load = require("./loader.js");
	this.load = new _load();
	var _db   = require("./db.js");
	this.db   = new _db();
	this.info.view       = [];
	this.info.model      = [];
	this.info.controller = [];
	this.__construct   = function(){console.log("construct");}
	this.__destructors =  function(){ 
        var views = this.load.views;
        var that  = this;
        views.foreach (function(key,val){
        	that.load.sentView(val.file,val.data);
        });
        this.load.views = [];
        this.end();
	}
	this.init = function($object){
		var that  = this[$object];
		var _this = this;
		delete _this[$object];
		this[$object] = Object.assign(_this,that);
		return this[$object];
	}
}
module.exports = Controller;