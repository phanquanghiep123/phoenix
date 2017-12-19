function Session (){
	this.phoenix_not_flags = []  ;
	this.common        = null;
	const key_session  = "0123456789";
	this.encode = function ($string){

	}
	this.code = function($string){

	}
	this.init = function(){
		this.phoenix_flags = [];
		this.common =  _Phoenix.request.session;
		var hour    = 3600000;
		this.common.cookie.expires = new Date(Date.now() + hour);
		this.common.cookie.maxAge  = hour;
	}
	this.add = function($name,$value){
		this.common.phoenix_not_flags[$name] = $value;
		this.common[$name] = $value;
		return true;
	}
	this.get = function ($name){
		if(this.common[$name] != null && typeof this.common[$name] != "undefined") return this.common[$name];
		else return false;
	}
	this.addflag = function($name,$value){
		
		this.phoenix_flags.push($name);
		return true;
	}
	this.getflag = function($name){
		if(this.common[$name] != null && typeof this.common[$name] != "undefined") return this.common[$name];
		else return false;
	}
	this.init();
}
module.exports = Session;