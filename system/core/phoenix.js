function Phoenix(argument) {
	this.request     = null;
	this.response    = null;
	this.nameSection = ""; 
	this.listSection = [];
	const _load      = require("./loader.js");
	const _session   = require("./sessions.js");
	this.load        = new _load();
	this.session     = new _session();
	this.waitdding   = 0;
	this.phoenix_ramkey_section = "";
	this.wait = function(){
		this.waitdding++;
	} 
	this.endwait = function(){
		this.waitdding--;
	}
	this.next = function(){
		return this.response.next();
	}
}
module.exports = Phoenix;