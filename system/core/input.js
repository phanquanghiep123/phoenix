function Input (){
	this.oldDataPost = {}
	this.oldDataGet  = {};
	this.phoenix_input_init = function(){
	    this.oldDataPost = _Phoenix.session.get("sent_post");
		this.oldDataGet  = _Phoenix.session.get("sent_get");
	}
	this.post = function ($name = null){
		if($name == null){
			return _Phoenix.request.body;
		}else{
			if(typeof _Phoenix.request.body[$name] !== "undefined")
				return _Phoenix.request.body[$name];
			else
				return false;
		}
	}
	this.get = function ($name = null){
		if($name == null){
			return _Phoenix.request.query;
		}else{
			if(typeof _Phoenix.request.query[$name] !== "undefined")
				return _Phoenix.request.query[$name];
			else
				return false;
		}
	}
	this.file = function($name){
		if($name == null){
			return _Phoenix.request.files;
		}else{
			if(typeof _Phoenix.request.files[$name] !== "undefined")
				return _Phoenix.request.files[$name];
			else
				return false;	 
		}
	}
	this.oldpost = function($name){
		var post = this.oldDataPost;
		if(typeof post[$name] !== "undefined"){
			delete this.oldDataPost[$name];
			_Controller.session.add("sent_post",this.oldDataPost);
			return post[$name];
		}
		else
			return "";
	}
	this.oldget = function($name){
		var get = this.oldDataGet;
		if(typeof get[$name] !== "undefined"){
			delete this.oldDataGet[$name];
			_Phoenix.session.add("sent_get",this.oldDataGet);
			return get[$name];
		}
		else
			return "";
	}
	this.phoenix_input_init();
}
module.exports = Input;