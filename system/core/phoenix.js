function Phoenix(argument) {
	this.request     = null;
	this.response    = null;
	this.dataView    = "";
	this.layout      = "";
	this.nameSection = ""; 
	this.listSection = {};
	this.setSection  = false;
	this.islayout    = false;
	const _load      = require("./loader.js");
	const _session   = require("./sessions.js");
	this.load        = new _load();
	this.session     = new _session();
	this.waitdding   = 0;
	this.info = {};
	this.info.views      = [];
	this.info.model      = [];
	this.info.controller = [];
	this.info.error      = [];
	this.info.layout     = [];
	this.info.routes     = {};
	this.phoenix_ramkey_section   = "";
	this.contentType     = "text/html";
	this.wait = function(){
		this.waitdding++;
	} 
	this.endwait = function(){
		this.waitdding--;
	}
	this.next = function(){
		return this.response.next();
	}
	this.end = function(){
		this.load.views = "";
		this.waitdding  = 0;
		this.info.view       = [];
		this.info.model      = [];
		this.info.controller = [];
		this.info.error      = [];
		this.info.layout     = [];
		this.listSection     = {};
		this.dataView        = "";
		this.layout          = "";
		return this.response.end();
	}
	this.__construct = function(){
        if(this.session.get("phoenix_sc")!= false){
        	this.phoenix_ramkey_section = this.session.get("phoenix_sc");
        }else{
        	this.phoenix_ramkey_section = RamdonString();
        	this.session.add("phoenix_sc",this.phoenix_ramkey_section);
        }
	}
	this.__destructors =  function(){
		var that = this; 
	    setInterval(function(){
	    	if(that.waitdding == 0){
	    		var errors = that.info.error;
		        if(ObjectLength(errors) > 0){
		        	var val;
		        	for (var key in errors){
		        		val = errors[key];
		        		write("<p>"+val.message+"<br/></p>");
			        	write("<p>"+val.detail+"<br/></p>");
		        	} 
		        }
		        clearInterval(this);
		        that.end();
	    	}
	    }, 100); 
	}
}
module.exports = Phoenix;