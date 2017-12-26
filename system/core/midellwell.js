function _Midellwell (){
	const _load    = require("./loader.js");
	const _session = require("./sessions.js");
	this.load      = new _load();
	this.session   = new _session();
	this.redirect  = function($url){
		_Phoenix.redirect($url);
	}
}
module.exports = _Midellwell;