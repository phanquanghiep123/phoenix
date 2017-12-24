function Controller() {
	this.phoneix_fixsetsection = "setsection_";
	this.phoneix_fixaddsection = "addsection_";
	this.phoenix_info            = {};
	this.phoenix_info.views      = [];
	this.phoenix_info.model      = [];
	this.phoenix_info.controller = [];
	this.phoenix_info.error      = [];
	this.phoenix_info.layout     = [];
	this.phoenix_info.routes     = {};
	this.phoenix_islayout        = false;
	this.phoenix_dataviews       = "";
	this.phoenix_datalayouts     = "";
	this.phoenix_listsection     = [];
	this.phoneix_namesection     = null;
	this.phoneix_setsection      = false;
	this.contenttype             = "text/html";
	this.end = function(){
		this.load.views = "";
		this.waitdding  = 0;
		this.phoenix_info.view       = [];
		this.phoenix_info.model      = [];
		this.phoenix_info.controller = [];
		this.phoenix_info.error      = [];
		this.phoenix_info.layout     = [];
		this.listsection             = {};
		this.phoenix_dataviews       = "";
		this.phoenix_datalayouts     = "";
		return this.response.end();
	}
	this._phoenix_construct = function(){
        if(this.session.get("phoenix_sc")!= false){
        	this.phoenix_ramkey_section = this.session.get("phoenix_sc");
        }else{
        	this.phoenix_ramkey_section = RamdonString();
        	this.session.add("phoenix_sc",this.phoenix_ramkey_section);
        }
	}
	this._phoenix_destructors =  function(){
		var that = this; 
	    setInterval(function(){
	    	if(that.waitdding == 0){
	    		var errors = that.phoenix_info.error;
		        if(ObjectLength(errors) > 0){
		        	var val;
		        	for (var key in errors){
		        		val = errors[key];
		        		write("<p>"+val.message+"<br/></p>");
			        	write("<p>"+val.detail+"<br/></p>");
		        	} 
		        }else{
		        	console.log(that.phoenix_dataviews);
		        }
		        clearInterval(this);
		        that.end();
	    	}
	    }, 100); 
	}
	this.readFlie = function($file){
		if(_Fs.existsSync($file) == false){
			this.phoenix_info.error.push({detail:_Fs ,message : "File not exists : " + $file});
			return false;
		}
		var content = _Fs.readFileSync(this._phoenix_entent_path("view") + $file, 'utf8');
		return content;	
	}
	this._phoenix_entent_path = function($type = null){
		if(type == "view")
		{
			return  _F_views;
		}
	}
	this.loadview = function($file = null, $data = {},$return = false){
		this.phoenix_islayout = false;
		var contentfile = this.readFlie ($file);
		var stringparameter = "";
		if($return == false){ 
			if ($data != null) {
				for (var key in $data ){
					try {
						if(typeof $data[key] == "object"){
							stringparameter += key +" = this._phoenix_jsondecode(" + JSON.stringify($data[key]) +") ;";	
						}else{
							stringparameter += key + " = "+ $data[key] + ";";	
						}					
					} catch (e) {
						if (e instanceof SyntaxError) this.phoenix_info.error.push({detail:e ,message : e.message});
						else this.phoenix_info.error.push({detail:e ,message : e});
					}
				}
				this.phoenix_dataviews += "<?node " + stringparameter +" ?>" + contentfile;
			} 
		}else{ 
			var dataView   = ""
			var evalString = "";
			if ($data != null) {
				for (var key in $data ){
					try {
						eval(key + " = $data[key];" );	
					} catch (e) {
						if (e instanceof SyntaxError) this.phoenix_info.error.push({detail:e ,message : e.message});
						else this.phoenix_info.error.push({detail:e ,message : e});
					}
				}
			}
			try {
				view = view.split("<?node");
	            var countArg = view.length;
	            var evalArg ;
	            for (var i = 0; i <= (countArg -1); i++) {
	  				if (view[i].indexOf("?>") == "-1") {
						dataView += view[i];
					}else{
						var evalArg = view[i].split("?>");
						evalString  = evalArg[0].trim();
						try {
							eval(evalString.trim());
							dataView += evalArg[1];
						} catch (e) {
							if (e instanceof SyntaxError) this.phoenix_info.error.push({detail:e ,message : e.message});
							else this.phoenix_info.error.push({detail:e ,message : e});
						}
					}
	            }
			}
			catch (e) {
				if (e instanceof SyntaxError) this.phoenix_info.error.push({detail:e ,message : e.message});
				else this.phoenix_info.error.push({detail:e ,message : e});
			}		
		    if(ObjectLength(this.listsection) > 0){
		    	var val;
		    	for (var key in this.listsection){
		    		val = this.listsection[key];
		    		var start = "[start_" + this.phoneix_fixaddsection + val + "]";
					var end   = "[end_"   + this.phoneix_fixaddsection + val + "]";
					dataView  = dataView.ReplaceAll(start,"");
					dataView  = dataView.ReplaceAll(end,"");
		    	}
		    }
		    this.phoenix_islayout = false;
			return dataView;
		}
		this.phoenix_islayout = false;
		return true
	}/*
	this.LayoutSection = function($name){
		this.setSection  = false;
		this.phoneix_namesection = $name;
		this.listsection[$name] = RamdonString()+"_"+ $name;
		if(!this.phoenix_islayout)
			this.phoenix_dataviews += "[start_" + phoneix_fixaddsection + this.listsection[$name] +"]";
		else
			this.phoenix_datalayouts += "[start_" + phoneix_fixaddsection + this.listsection[$name] +"]";
	}
	this.LayoutendSection = function(){
		if(!this.setSection){
			if(!this.phoenix_islayout)
				this.phoenix_dataviews += "[end_"+phoneix_fixaddsection + this.listsection[this.phoneix_namesection] + "]";
			else
				this.phoenix_datalayouts += "[end_"+phoneix_fixaddsection + this.listsection[this.phoneix_namesection] + "]";
		}else{
			if(!this.phoenix_islayout)
				this.phoenix_dataviews += "[end_"+ phoneix_fixsetsection + this.listsection[this.phoneix_namesection] + "]";
			else
				this.phoenix_datalayouts += "[end_"+ phoneix_fixsetsection + this.listsection[this.phoneix_namesection] + "]";
		}
		if(this.phoneix_setsection){
			var setstart   = "[start_" + phoneix_fixsetsection + this.listsection[this.phoneix_namesection] + "]";
			var setend     = "[end_"   + phoneix_fixsetsection + this.listsection[this.phoneix_namesection] + "]";
			var start      = "[start_" + phoneix_fixaddsection + this.listsection[this.phoneix_namesection] + "]";
			var end        = "[end_"   + phoneix_fixaddsection + this.listsection[this.phoneix_namesection] + "]";
			var testRE;
			var layoutArg,searchString,replaceString;
			if(!this.phoenix_islayout){
				layoutArg = this.phoenix_dataviews.split(setstart);
				if(layoutArg != null){
					replaceString  = layoutArg[1].split(setend);
					replaceString  = replaceString[0];
					if(replaceString != null){
						layoutArg = this.phoenix_dataviews.split(start);
						if(layoutArg != null){
							searchString  = layoutArg[1].split(end);
							searchString  = searchString[0];
							this.phoenix_dataviews = this.phoenix_dataviews.ReplaceAll(setstart+replaceString+setend,""); 
							this.phoenix_dataviews = this.phoenix_dataviews.ReplaceAll(start+searchString+end,setstart+replaceString+setend);
							this.phoenix_dataviews = this.phoenix_dataviews.ReplaceAll(setstart,"");  
							this.phoenix_dataviews = this.phoenix_dataviews.ReplaceAll(setend,"");  
						}
					}
				}
			}else{
				layoutArg = this.phoenix_datalayouts.split(setstart);
				if(layoutArg != null){
					replaceString  = layoutArg[1].split(setend);
					replaceString  = replaceString[0];
					if(replaceString != null){
						layoutArg = this.phoenix_dataviews.split(start);
						if(layoutArg != null){
							searchString  = layoutArg[1].split(end);
							searchString  = searchString[0];
							this.phoenix_datalayouts   = this.phoenix_datalayouts.ReplaceAll(setstart+replaceString+setend,""); 
							this.phoenix_datalayouts   = this.phoenix_datalayouts.ReplaceAll(start+searchString+end,setstart+replaceString+setend); 
							this.phoenix_datalayouts   = this.phoenix_datalayouts.ReplaceAll(setstart,"");  
							this.phoenix_datalayouts   = this.phoenix_datalayouts.ReplaceAll(setend,"");  
						}
					}
				}
			}
		}
	}
	this.LayoutSetSection = function($name){
		this.phoneix_setsection   = true;
		this.namesection  = $name;
		if(!this.phoenix_islayout)
			this.phoenix_dataviews += "[start_" + phoneix_fixsetsection + this.listsection[this.namesection] + "]";
		else
			this.phoenix_datalayouts += "[start_" + phoneix_fixsetsection + this.listsection[this.namesection] + "]";
	}
	this.ExtenLayout  = function($file){
		this.phoenix_islayout = true;
		var view = this.readFlie($file);
		this.phoenix_info.layout.push({file : $file});
		if(view != false){
			try {
				view = view.split("<?node");
	            var countArg = view.length;
	            var evalArg ;
	            for (var i = 0; i <= (countArg -1); i++) {
	  				if (view[i].indexOf("?>") == "-1") {
						this.phoenix_datalayouts += view[i];
					}else{
						var evalArg = view[i].split("?>");
						evalString  = evalArg[0].trim();
						try {
							eval(evalString.trim());
							this.phoenix_datalayouts += evalArg[1];
						} catch (e) {
							if (e instanceof SyntaxError) this.phoenix_info.error.push({detail:e ,message : e.message});
							else this.phoenix_info.error.push({detail:e ,message : e});
						}
					}
	            }
			}
			catch (e) {
				if (e instanceof SyntaxError) this.phoenix_info.error.push({detail:e ,message : e.message});
				else this.phoenix_info.error.push({detail:e ,message : e});
			}
		}
		this.phoenix_islayout  = false;
		this.phoenix_dataviews += this.phoenix_datalayouts;
	} */
}
module.exports = Controller;