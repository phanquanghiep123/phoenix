function Router(){
	//auto create route form url
	this.add = function ($Option,$midellwell = null){
		var c     = $Option.controller.toLowerCase().trim();
		var a     = $Option.action.toLowerCase().trim();
		var _this = this;
		_Phoenix.phoenix_info.routes[$Option.name] = $Option;
		_App[$Option.type]($Option.url,function(req,res,next){
		    _Controller.request  = req;
		    _Controller.response = res;
		    _Controller.next     = next;	   
		    if(typeof _Midellwell[$midellwell] == "function") _Midellwell[$midellwell]();
			if(typeof _Midellwell[$Option.midellwell]  == "function") _Midellwell[$Option.midellwell]();
		    _this.make(c,a,$Option.type) ;
		    return true;
		});
	}
	this.group = function ($Path,$Option,$midellwell = null){
		var length = Object.keys($Option).length;
		var item;
		for (var i = 0 ;i < length; i++){
			item = $Option[i];
			item.url = $Path + item.url;
			this.add(item,$midellwell);
		}
	}
	this.make = function(c,a,t){
		var argUrrl = c.split("/");
		var $Controller = argUrrl[(argUrrl.length -1 )];
		var $Action     = a;
		_Controller.phoenix_info.file = c;
		_Controller.phoenix_info.controller = $Controller;
		_Controller.phoenix_info.action     = $Action;
		var params    = _Controller.request.params;
		var stringP   = "";
		var argparams = [];
		if(params.length > 0 ){
			params.foreach(function(key,val){
				if(typeof val !== "undefined" && val != null){
					if(isNaN(val.trim()) == true) val = '"'+val+'"';
						if(val != null && val.trim() != "");
							argparams.push(val.trim());
				}
			});
		}	
		stringP = argparams.join(",");
		var objectCt = require(_F_controlers + c );
		var controller = new objectCt();
		try {
			if(typeof controller.extent !== "undefined" && typeof controller.extent === "object")				 
				controller = Object.assign(controller.extent,controller);
			else
				controller = Object.assign(_Controller,controller);
			if(typeof controller.contentType !== "undefined"){
				_Controller.contentType = controller.contentType;
			}
		} catch (e) {
			controller = Object.assign(_Controller,controller);
			if (e instanceof SyntaxError) 
				_Controller.phoenix_info.error.push({detail:e ,message : e.message});
			else 
				_Controller.phoenix_info.error.push({detail:e ,message : e});
		}
		var StringEval = "controller['"+$Action+"']("+stringP+");";
		_Controller.phoenix_construct();
        if(t.trim() == "get"){
	    	_Controller.session.add("sent_get",_Controller.request.query);
	    }else{
	    	_Controller.session.add("sent_post",_Controller.request.body);
	    }
		if(typeof controller.construct === "function"){
			controller.construct();
		}  
		try {
			eval(StringEval.trim());
		} catch (e) {
			if (e instanceof SyntaxError) _Controller.phoenix_info.error.push({detail:e ,message : e.message});
			else _Controller.phoenix_info.error.push({detail:e ,message : e});
		}
		if(typeof controller.destructors === "function"){
			controller.destructors();
		} 
		_Controller.phoenix_destructors();	
	}
}
module.exports = Router;
