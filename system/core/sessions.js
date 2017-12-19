function Session (){
	this.phoenix_flags = [];
	this.add = function($name,$value){
		var hour    = 3600000;
		_Phoenix.request.session.cookie.expires = new Date(Date.now() + hour);
		_Phoenix.request.session.cookie.maxAge  = hour;
		var name = this.phoenix_ramkey_section + "_" +$name;
		_Phoenix.request.session[name] = $value;
		return true;
	}
	this.get = function ($name){
		var name = this.phoenix_ramkey_section + "_" +$name;
		if(_Phoenix.request.session[name] != null && typeof _Phoenix.request.session[name] != "undefined") return _Phoenix.request.session[name];
		else return false;
	}
	this.addflag =  function ($name,$value){
		var name = this.phoenix_ramkey_section + "_" +$name;
		this.phoenix_flags.push(name);
		_Phoenix.request.session[name] = $value;
		return true;
	}
	this.getflag = function($name){
		var name = this.phoenix_ramkey_section + "_" +$name;
		if(_Phoenix.request.session[name] != null && typeof _Phoenix.request.session[name] != "undefined") {
			var s = _Phoenix.request.session[name];
			delete _Phoenix.request.session[name];
			return s;
		}
		else {
			return false; 
		}	
	}
}
module.exports = Session;