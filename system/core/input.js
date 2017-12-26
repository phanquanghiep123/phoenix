function Input (){
	this.oldDataPost = {};
	this.oldDataGet  = {};
	this.phoenix_input_init = function(){
		var oldDataPost = _Phoenix.session.getflash("phoenix_sent_post");
		if(oldDataPost){
			this.oldDataPost = oldDataPost;
		}
		var oldDataGet  = _Phoenix.session.getflash("phoenix_sent_get");
		if(oldDataGet){
			this.oldDataGet = oldDataGet;
		}
		console.log(this);
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
		console.log(post);
		if(typeof post[$name] !== "undefined")
			return post[$name];
		else
			return false;
	}
	this.oldget = function($name){
		var get = this.oldDataGet;
		if(typeof get[$name] !== "undefined")
			return get[$name];
		else
			return false;
	}
	this.phoenix_input_init();
}
module.exports = Input;