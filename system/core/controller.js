function Controller() {
	this.request;
	this.response;
	this.wait = 0;
	this.fwait = function($w = false){
		if($w == false){
			this.wait ++;
		}else{
			this.wait--;
		}
	} 
	this.swait = function(){
		for (var i = this.wait; i > 0 ;) {
  			i = this.wait;
  			console.log(i);
        }
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
        that.swait();
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