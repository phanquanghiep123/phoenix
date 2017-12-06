function Phoenix(argument) {
	var _load = require("./loader.js");
	var _db   = require("./db.js");
	var pix_setsection = "setsection_";
	var pix_addsection = "addsection_";
	this.dataView      = "";
	this.layout        = "";
	this.islayout      = false;
	this.load = new _load();
	this.db   = new _db();
	this.request;
	this.response;
	this.waitdding   = 0;
	this.nameSection = "";
	this.listSection = {};
	this.setSection  = false;
	this.info = {};
	this.info.view       = [];
	this.info.model      = [];
	this.info.controller = [];
	this.info.error      = [];
	this.info.layout     = [];
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
		this.info.layout     = [];
		this.listSection     = {};
		this.dataView        = "";
		this.layout          = "";
		this.response.end();
	}
	this.info = {};
	this.info.view       = [];
	this.info.model      = [];
	this.info.controller = [];
	this.info.error      = [];
	this.__construct = function(){
		this.response.writeHead(200, { 'Content-Type': 'text/html' });
	}
	this.__destructors =  function(){
		var that = this; 
	    setInterval(function(){
	    	if(that.waitdding == 0){
	    		var errors = that.info.error;
		        if(Object.keys(errors).length > 0){
		        	errors.foreach (function(key,val){
			        	write("<p>"+val.message+"<br/></p>");
			        	write("<p>"+val.detail+"<br/></p>");
			        });
		        }else{
		        	write(that.load.views);
		        }
		        clearInterval(this);
		        that.end();
	    	}
	    }, 100); 
	}

	this.loadview = function($file, $data = null){
		this.islayout = false;
		var view = this.readFlie(_F_views + $file);
		if(view != false){
			var evalString = "";
			if ($data != null) {
				for (var key in $data ){
					try {
						eval("var " + key + " = $data[key];" );			
					} catch (e) {
						if (e instanceof SyntaxError) this.info.error.push({detail:e ,message : e.message});
						else this.info.error.push({detail:e ,message : e});
					}
				}
			}
			try {
				view = view.split("<?node");
	            var countArg = view.length;
	            var evalArg ;
	            for (var i = 0; i <= (countArg -1); i++) {
	  				if (view[i].indexOf("?>") == "-1") {
						this.dataView += view[i];
					}else{
						var evalArg = view[i].split("?>");
						evalString  = evalArg[0].trim();
						evalString  = evalString.replaceAll("write", "this.writeView");
						evalString  = evalString.replaceAll("this.load.view", "this.viewToview");
						try {
							eval(evalString.trim());
							this.dataView += evalArg[1];
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
		}
	    var that = this;
		this.listSection.foreach(function(key,val){
			var start      = "[start_" + pix_addsection + val + "]";
			var end        = "[end_"   + pix_addsection + val + "]";
			that.dataView  = that.dataView.replaceAll(start,"");
			that.dataView  = that.dataView.replaceAll(end,"");	
		});
		this.islayout = true;
		return this.dataView;
	}
	this.addSession = function($name,$val){

	}
	this.getSession = function($name){
 
	}
	this.distroySession = function($name){

	}
	this.distroyAllSession = function(){

	}
	this.addCookie = function($name,$val,$time){

	}
	this.getCookie = function($name,$val){

	}
	this.distroygetCookie = function($name,$val){

	}
	this.distroyAllgetCookie = function($name,$val){

	}
	this.LayoutSection = function($name){
		this.setSection  = false;
		this.nameSection = $name;
		this.listSection[$name] = ramdonString()+"_"+ $name;
		if(!this.islayout)
			this.dataView += "[start_" + pix_addsection + this.listSection[$name] +"]";
		else
			this.layout += "[start_" + pix_addsection + this.listSection[$name] +"]";
	}
	this.LayoutendSection = function(){
		if(!this.setSection){
			if(!this.islayout)
				this.dataView += "[end_"+pix_addsection + this.listSection[this.nameSection] + "]";
			else
				this.layout += "[end_"+pix_addsection + this.listSection[this.nameSection] + "]";
		}else{
			if(!this.islayout)
				this.dataView += "[end_"+pix_setsection + this.listSection[this.nameSection] + "]";
			else
				this.layout += "[end_"+pix_setsection + this.listSection[this.nameSection] + "]";
		}
		if(this.setSection){
			var setstart   = "[start_" + pix_setsection + this.listSection[this.nameSection] + "]";
			var setend     = "[end_"   + pix_setsection + this.listSection[this.nameSection] + "]";
			var start      = "[start_" + pix_addsection + this.listSection[this.nameSection] + "]";
			var end        = "[end_"   + pix_addsection + this.listSection[this.nameSection] + "]";
			var testRE;
			var layoutArg,searchString,replaceString;
			if(!this.islayout){
				layoutArg = this.dataView.split(setstart);
				if(layoutArg != null){
					replaceString  = layoutArg[1].split(setend);
					replaceString  = replaceString[0];
					if(replaceString != null){
						layoutArg = this.dataView.split(start);
						if(layoutArg != null){
							searchString  = layoutArg[1].split(end);
							searchString  = searchString[0];
							this.dataView = this.dataView.replaceAll(setstart+replaceString+setend,""); 
							this.dataView = this.dataView.replaceAll(searchString,replaceString); 
						}
					}
				}
			}else{
				layoutArg = this.layout.split(setstart);
				if(layoutArg != null){
					replaceString  = layoutArg[1].split(setend);
					replaceString  = replaceString[0];
					if(replaceString != null){
						layoutArg = this.dataView.split(start);
						if(layoutArg != null){
							searchString  = layoutArg[1].split(end);
							searchString  = searchString[0];
							this.layout   = this.layout.replaceAll(setstart+replaceString+setend,""); 
							this.layout   = this.layout.replaceAll(searchString,replaceString);
						}
					}
				}
			}
		}
	}
	this.LayoutSetSection = function($name){
		this.setSection   = true;
		this.nameSection  = $name;
		if(!this.islayout)
			this.dataView += "[start_" + pix_setsection + this.listSection[this.nameSection] + "]";
		else
			this.layout += "[start_" + pix_setsection + this.listSection[this.nameSection] + "]";
	}
	this.ExtenLayout  = function($file){
		this.islayout = true;
		var view = this.readFlie(_F_views + $file);
		this.info.layout.push({file : $file});
		if(view != false){
			try {
				view = view.split("<?node");
	            var countArg = view.length;
	            var evalArg ;
	            for (var i = 0; i <= (countArg -1); i++) {
	  				if (view[i].indexOf("?>") == "-1") {
						this.layout += view[i];
					}else{
						var evalArg = view[i].split("?>");
						evalString  = evalArg[0].trim();
						evalString  = evalString.replaceAll("write", "this.writeView");
						evalString  = evalString.replaceAll("this.load.view", "this.viewToview");
						try {
							eval(evalString.trim());
							this.layout += evalArg[1];
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
		}
		this.islayout  = false;
		this.dataView += this.layout;
	}
	this.readFlie = function($file){
		if(_Fs.existsSync($file) == false){
			this.info.error.push({detail:_Fs ,message : "File not exists : " + $file});
			return false;
		}
		var content = _Fs.readFileSync($file, 'utf8');
		return content;	
	}
	this.writeView = function($string){
		if(!this.islayout)
			this.dataView += $string;
		else
			this.layout += $string;
	}

	this.viewToview  = function($file = "", $data = {}){
		var stringView = "";
		var view = this.readFlie(_F_views + $file);
		this.info.view.push({file : $file});
		if(view != false){
			var evalString = "";
			if ($data != null) {
				for (var key in $data ){
					try {
						eval("var " + key + " = $data[key];" );			
					} catch (e) {
						if (e instanceof SyntaxError) this.info.error.push({detail:e ,message : e.message});
						else this.info.error.push({detail:e ,message : e});
					}
				}
			}
			try {
				view = view.split("<?node");
	            var countArg = view.length;
	            var evalArg ;
	            for (var i = 0; i <= (countArg -1); i++) {
	  				if (view[i].indexOf("?>") == "-1") {
	  					if(!this.islayout)
							this.dataView += view[i];
						else
							this.layout += view[i];
					}else{
						var evalArg = view[i].split("?>");
						evalString  = evalArg[0].trim();
						evalString  = evalString.replaceAll("write", "this.writeView");
						evalString  = evalString.replaceAll("this.load.view", "this.viewToview");
						try {
							eval(evalString.trim());
							if(!this.islayout)
								this.dataView += evalArg[1];
							else
								this.layout += evalArg[1];
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
		}
		 
	}
}
module.exports = Phoenix;