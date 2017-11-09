function Controller() {
	this.request;
	this.response;
	this.next = function(){
		this.response.next();
	}
	this.return = 0;
	this.wait = function(){
		this.return++;
	}	
	this.endwait = function(){
		this.return--;
	}
	this.end = function(){
		this.response.end();
	}
	this.info = [];
	var _load = require("./loader.js");
	var _db   = require("./db.js");
	this.load = new _load();
	this.db   = new _db();	
	this.info.view       = [];
	this.info.model      = [];
	this.info.controller = [];
	this.construct   = function(){console.log("construct")}
	this.destructors =  function(){
		/*do {
		    console.log(this.return);
		}
		while (this.return >= 0){
			this.end();
		}*/
		console.log("destructors") ;
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