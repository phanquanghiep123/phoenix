function Controller() {
	this.request;
	this.response;
	this.waitdding = 0;
	this.wait = function(){
		this.waitdding++;
	} 
	this.endwait = function(){
		this.waitdding--;
	}
	this.next = function(){
		this.response.next();
	}
	this.end = function(){
		this.response.end();
	}
	this.info = {};
	var _load = require("./loader.js");
	this.load = new _load();
	var _db   = require("./db.js");
	this.db   = new _db();
	this.info.view       = [];
	this.info.model      = [];
	this.info.controller = [];
	this.info.error      = [];
	this.__construct   = function(){
		
	}
	this.__destructors =  function(){ 
        var that = this; 
        console.log(that.waitdding);
        for (that.waitdding; that.waitdding > 0 ;that.waitdding = that.waitdding) {
  			console.log(that.waitdding);
        }
        var errors = that.info.error;
        if(Object.keys(errors).length > 0){
        	errors.foreach (function(key,val){
	        	write(val.message);
	        });
        }
        that.end();
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