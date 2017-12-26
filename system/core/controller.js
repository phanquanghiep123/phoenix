function Controller() {
	this.phoneix_fixsetsection    = "setsection_";
	this.phoneix_fixaddsection    = "addsection_";
	this.phoenix_info             = {};
	this.phoenix_info.view        = [];
	this.phoenix_info.model       = [];
	this.phoenix_info.controller  = [];
	this.phoenix_info.error       = [];
	this.phoenix_info.layout      = [];
	this.phoenix_info.routes      = {};
	this.phoenix_isreturn         = false;
	this.phoenix_dataviews        = "";
	this.phoenix_dataviewreturn   = "";
	this.phoenix_listsection      = {};
	this.phoneix_namesection      = null;
	this.phoneix_setsection       = false;
	this.phoenix_dataviewshtml    = "";
	this.phoenix_converttohtml    = false;
	this.contenttype              = "text/html";
	this.end = function(){
		this.load.views = "";
		this.waitdding  = 0;
		this.phoenix_info.view       = [];
		this.phoenix_info.model      = [];
		this.phoenix_info.controller = [];
		this.phoenix_info.error      = [];
		this.phoenix_info.layout     = [];
		this.phoenix_listsection     = {};
		this.phoenix_dataviews       = "";
		this.phoenix_datalayouts     = "";
		return this.response.end();
	}
	this.phoenix_construct = function(){
        /*if(this.session.get("phoenix_sc")!= false){
        	this.phoenix_ramkey_section = this.session.get("phoenix_sc");
        }else{
        	this.phoenix_ramkey_section = RamdonString();
        	this.session.add("phoenix_sc",this.phoenix_ramkey_section);
        }*/
	}
	this.phoenix_destructors =  function(){
		var that = this;  
	    setInterval(function(){
	    	if(that.waitdding == 0){
	    		var errors = that.phoenix_info.error;
	    		console.log(errors.length);
		        if( errors.length != 0){
		        	var val;
		        	for (var key in errors){
		        		val = errors[key];
		        		that.response.write("<p>"+val.message+"<br/></p>");
			        	that.response.write("<p>"+val.detail+"<br/></p>");
		        	} 
		        }else{
		        	that.response.header("Content-Type",that.contenttype);
		        	
		        	that.phoenix_readviewtohtml(); 
		        }
		        clearInterval(this);
		        that.end();
	    	}
	    }, 100); 
	}
	this.readFlie = function($file){
		$file = this.phoenix_entent_path("view") + $file;
		if(_Fs.existsSync($file) == false){
			this.phoenix_info.error.push({detail:_Fs ,message : "File not exists : " + $file});
			return false;
		}
		var content = _Fs.readFileSync($file, 'utf8');
		return content;	
	}
	this.phoenix_entent_path = function($type = null){
		if($type == "view") return _F_views;
	}
	this.phoenix_readviewtohtml = function(){
		this.phoenix_converttohtml = true;
		this.readandconvert(this.phoenix_dataviews);
		/*for( var i in this.phoenix_listsection){
			var setstart   = "[start_" + this.phoneix_fixsetsection + this.phoenix_listsection[i] + "]";
			var setend     = "[end_"   + this.phoneix_fixsetsection + this.phoenix_listsection[i] + "]";
			var start      = "[start_" + this.phoneix_fixaddsection + this.phoenix_listsection[i] + "]";
			var end        = "[end_"   + this.phoneix_fixaddsection + this.phoenix_listsection[i] + "]";
			var testRE;
			var layoutArg,searchString,replaceString;
			layoutArg = this.phoenix_dataviewshtml.split(setstart);
			if(layoutArg != null){
				if(typeof layoutArg[1] != "undefined"){
					replaceString  = layoutArg[1].split(setend);
					replaceString  = replaceString[0];
					if(replaceString != null){
						layoutArg = this.phoenix_dataviewshtml.split(start);
						if(layoutArg != null){
							searchString  = layoutArg[1].split(end);
							searchString  = searchString[0];
							this.phoenix_dataviewshtml = this.phoenix_dataviewshtml.ReplaceAll(setstart+replaceString+setend,""); 
							this.phoenix_dataviewshtml = this.phoenix_dataviewshtml.ReplaceAll(start+searchString+end,setstart+replaceString+setend);
							this.phoenix_dataviewshtml = this.phoenix_dataviewshtml.ReplaceAll(setstart,"");  
							this.phoenix_dataviewshtml = this.phoenix_dataviewshtml.ReplaceAll(setend,"");  
						}
					}
				}
			} 
		}
		for( var i in this.phoenix_listsection){
			var setstart   = "[start_" + this.phoneix_fixsetsection + this.phoenix_listsection[i] + "]";
			var setend     = "[end_"   + this.phoneix_fixsetsection + this.phoenix_listsection[i] + "]";
			var start      = "[start_" + this.phoneix_fixaddsection + this.phoenix_listsection[i] + "]";
			var end        = "[end_"   + this.phoneix_fixaddsection + this.phoenix_listsection[i] + "]";
			this.phoenix_dataviewshtml = this.phoenix_dataviewshtml.ReplaceAll(start,"");
			this.phoenix_dataviewshtml = this.phoenix_dataviewshtml.ReplaceAll(end,""); 
			this.phoenix_dataviewshtml = this.phoenix_dataviewshtml.ReplaceAll(setstart,"");  
			this.phoenix_dataviewshtml = this.phoenix_dataviewshtml.ReplaceAll(setend,""); 
		}
		this.response.write(this.phoenix_dataviewshtml);
		*/
		console.log(this.phoenix_dataviewshtml);
		return true;
	}
	this.readandconvert = function($string){
		var view = $string.split("<?node");
        var countArg = view.length;
        var evalArg ;
        for (var i in view) {
			if (view[i].indexOf("?>") == "-1") {
				this.phoenix_dataviewshtml += view[i];
			}else{
				var evalArg = view[i].split("?>");
				evalString = evalArg[0].trim();
				try {
					eval(evalString.trim());
					this.phoenix_dataviewshtml += evalArg[1];
				} catch (e) {
					if (e instanceof SyntaxError) this.phoenix_info.error.push({detail:e ,message : e.message});
					else this.phoenix_info.error.push({detail:e ,message : e});
				}
			}
        }
	}
	this.phoenix_loadview = function($file, $data = null, $return = false){
		var view = this.readFlie($file);	
		if(this.phoenix_converttohtml == false){
			var stringdata = "";
			if($data != null){		
				for (var i in $data ){
					if(typeof $data[i] == "object"){
						var t = this.phoenix_coverjson($data[i]);
						stringdata += i + " = " + "this.phoenix_coverobject(\""+t+"\");" ;
					}else if( typeof $data[i] == "number"){
						stringdata+= i + " = " + $data[i] + ";";
					}else if(typeof $data == "string"){
						stringdata+= i + " = " + "\"" + $data[i] + "\";";
					}
				}
			}
			stringdata = "<?node "+stringdata+ " ?>";
			this.phoenix_dataviews += stringdata + view;
		}else{
			if($data != null){		
				for (var key in $data ){
					try {
						eval(key + " = $data[key];" );			
					} catch (e) {
						if (e instanceof SyntaxError) this.phoenix_info.error.push({detail:e ,message : e.message});
						else this.phoenix_info.error.push({detail:e ,message : e});
					}
				}
			}
			this.readandconvert(view); 
		}
	}
	this.LayoutSection = function($name){
		this.phoneix_setsection  = false;
		this.phoneix_namesection = $name;
		this.phoenix_listsection[$name] = RamdonString()+"_"+ $name;
	    this.phoenix_dataviewshtml += "[start_" + this.phoneix_fixaddsection + this.phoenix_listsection[$name] +"]"; 
	}
	this.LayoutendSection = function(){
		if(!this.phoneix_setsection){
			this.phoenix_dataviewshtml += "[end_"+this.phoneix_fixaddsection + this.phoenix_listsection[this.phoneix_namesection] + "]";
		}else{
			this.phoenix_dataviewshtml += "[end_"+ this.phoneix_fixsetsection + this.phoenix_listsection[this.phoneix_namesection] + "]";
		}	
	}
	this.LayoutSetSection = function($name){
		this.phoneix_setsection = true;
		this.namesection = $name;
		this.phoenix_dataviewshtml += "[start_" + this.phoneix_fixsetsection + this.phoenix_listsection[this.namesection] + "]";
	}
	this.ExtenLayout  = function($file){
		var view = this.readFlie($file);
		this.readandconvert(view); 
	} 
	this.phoenix_coverjson = function($string){
		return JSON.stringify($string)
	}
	this.phoenix_coverobject = function($string){
		return JSON.parse($string);
	}
}
module.exports = Controller;