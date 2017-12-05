function Phoenix(argument) {
	var _load = require("./loader.js");
	var _db   = require("./db.js");
	var pix_setsection = "setsection_";
	var pix_addsection = "addsection_";
	this.load = new _load();
	this.db   = new _db();
	this.request;
	this.response;
	this.waitdding   = 0;
	this.nameSection = "";
	this.listSection = {};
	this.setSection  = false;
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
		this.listSection     = {};
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
		var DataString = "";
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
						DataString += view[i];
					}else{
						var evalArg = view[i].split("?>");
						evalString  = evalArg[0].trim();
						evalString  = evalString.replaceAll("write", "DataString += ");
						evalString  = evalString.replaceAll("this.ExtenLayout", "DataString += this.ExtenLayout");
						evalString  = evalString.replaceAll("this.LayoutSection", "DataString += this.LayoutSection");
						evalString  = evalString.replaceAll("this.LayoutendSection", "DataString += this.LayoutendSection");
						evalString  = evalString.replaceAll("this.LayoutSetSection", "DataString += this.LayoutSetSection");
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
			
		}
		DataString = DataString.replace("\n", "");
		DataString = DataString.replace("\g", "");
		this.listSection.foreach(function($key,$val){
			var setstart = "start_"+pix_setsection + $val;
			var setend   = "end_"+pix_setsection + $val;
			var start    = "start_"+pix_addsection + $val;
			var end      = "end_"+pix_addsection + $val;
			var testRE = DataString.match(setstart+"(.*)"+setend);
			if(testRE != null){
				try {
					var customRegex = new RegExp(setstart + ".*" + setend, "g");
					DataString = DataString.replaceAll(customRegex,"");
					var customRegex = new RegExp(start + ".*" + end, "g");
					DataString = DataString.replaceAll(customRegex,testRE[1]);
				}catch(e) {
					if (e instanceof SyntaxError) this.info.error.push({detail:e ,message : e.message});
					else this.info.error.push({detail:e ,message : e});
				}	
			}
			DataString = DataString.replaceAll(setend,""); 
			DataString = DataString.replaceAll(setend,"");
			DataString = DataString.replaceAll(start,"");
			DataString = DataString.replaceAll(end,"");
		});
		return DataString;
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
		this.setSection = false;
		this.nameSection = ramdonString()+"_"+$name;
		this.listSection[$name] = this.nameSection;
		return "start_"+pix_addsection +this.nameSection;
	}
	this.LayoutendSection = function(){
		if(this.setSection == true){
			return "end_"+pix_setsection + this.nameSection;
		}
		return "end_"+pix_addsection + this.nameSection;
	}
	this.LayoutSetSection = function($name){
		this.setSection  = true;
		this.nameSection = this.listSection[$name];
		return "start_"+pix_setsection +this.nameSection;
	}
	this.ExtenLayout = function($file){
		var view = this.readFlie(_F_views + $file);
		var layout = "";
		if(view != false){
			try {
				view = view.split("<?node");
	            var countArg = view.length;
	            var evalArg ;
	            for (var i = 0; i <= (countArg -1); i++) {
	  				if (view[i].indexOf("?>") == "-1") {
						layout += view[i];
					}else{
						var evalArg = view[i].split("?>");
						evalString  = evalArg[0].trim();
						evalString  = evalString.replaceAll("write", "layout += ");
						evalString  = evalString.replaceAll("this.ExtenLayout", "layout += this.ExtenLayout");
						evalString  = evalString.replaceAll("this.LayoutSection", "layout += this.LayoutSection");
						evalString  = evalString.replaceAll("this.LayoutendSection", "layout += this.LayoutendSection");
						evalString  = evalString.replaceAll("this.LayoutSetSection", "layout += this.LayoutSetSection");
						evalString  = evalString.replaceAll("this.load.view", "layout += this.load.viewToview");
						try {
							eval(evalString.trim());
							layout += evalArg[1];
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
		return layout;
	}
	this.readFlie = function($file){
		if(_Fs.existsSync($file) == false){
			this.info.error.push({detail:_Fs ,message : "File not exists : " + $file});
			return false;
		}
		var content = _Fs.readFileSync($file, 'utf8');
		return content;
		
	}
}
module.exports = Phoenix;