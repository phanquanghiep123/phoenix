function Phoenix(argument) {
	var _load = require("./loader.js");
	var _db   = require("./db.js");
	this.load = new _load();
	this.db   = new _db();
	this.request;
	this.response;
	this.waitdding = 0;
	this.wait = function(){
		this.waitdding++;
	} 
	this.endwait = function(){
		this.waitdding--;
	}
	this.next = function(){
		this.response.next();
	}
	this.end = function(){
		this.load.views = "";
		this.waitdding  = 0;
		this.info = {};
		this.info.view       = [];
		this.info.model      = [];
		this.info.controller = [];
		this.info.error      = [];
		this.response.end();
	}
	this.info = {};
	this.info.view       = [];
	this.info.model      = [];
	this.info.controller = [];
	this.info.error      = [];
	this.__construct = function(){
		//console.log(this);
	}
	this.__destructors =  function(){
		var that = this; 
	    setInterval(function(){
	    	if(that.waitdding == 0){
	    		var errors = that.info.error;
		        if(Object.keys(errors).length > 0){
		        	errors.foreach (function(key,val){
			        	write(val.message);
			        });
		        }else{
		        	write(that.load.views);
		        }
		        clearInterval(this);
		        that.end();
	    	}
	    }, 100); 
	}
	var DataString ; 
	var evalString;
	this.loadview = function($file, $data = null){
		var view = _Fs.readFileSync(_F_views + $file, 'utf8');
		DataString = "";
		if ($data != null) {
			for (var key in $data ){
				eval("var " + key + " = $data[key];" );
			}
		}
		try {
			view = view.split("<?node");
            var countArg = view.length;
            var evalArg ;
            for (var i = 0; i <= (countArg -1); i++) {
  				if (view[i].indexOf("?>") == "-1") {
					DataString += view[i];
				}else{
					var evalArg = view[i].split("?>");
					evalString  = evalArg[0].trim();
					evalString  = evalString.replaceAll("write", "DataString += ");
					evalString  = evalString.replaceAll("this.load.view", "DataString += this.load.viewToview");
					try {
						eval(evalString.trim());
						DataString += evalArg[1];
					
					} catch (e) {
						if (e instanceof SyntaxError) this.info.error.push({detail:e ,message : e.message});
						else this.info.error.push({detail:e ,message : e});
					}
				}
            }
		}
		catch (e) {
			if (e instanceof SyntaxError) this.info.error.push({detail:e ,message : e.message});
			else this.info.error.push({detail:e ,message : e});
		}
		return DataString;
	}
}
module.exports = Phoenix;