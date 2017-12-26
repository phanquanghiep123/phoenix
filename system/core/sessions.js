function Session (){
	this.phoenix_flashs = [];
	this.add = function($name,$value){
		var hour    = 3600000;
		_Phoenix.request.session.cookie.expires = new Date(Date.now() + hour);
		_Phoenix.request.session.cookie.maxAge  = hour;
		var name = _Phoenix.phoenix_ramkey_section + "_" +$name;
		_Phoenix.request.session[name] = $value;
		return true;
	}
	this.destroy = function($name){
		var name = _Phoenix.phoenix_ramkey_section + "_" +$name;
		delete _Phoenix.request.session[name];
		return true;
	}
	this.get = function ($name){
		var name = _Phoenix.phoenix_ramkey_section + "_" +$name;
		if(_Phoenix.request.session[name] != null && typeof _Phoenix.request.session[name] != "undefined") return _Phoenix.request.session[name];
		else return false;
	}
	this.addflash =  function ($name,$value){
		var name = _Phoenix.phoenix_ramkey_section + "_" +$name;
		this.phoenix_flashs.push(name);
		_Phoenix.request.session[name] = $value;
		return true;
	}
	this.getflash = function($name){
		var name = _Phoenix.phoenix_ramkey_section + "_" +$name;
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