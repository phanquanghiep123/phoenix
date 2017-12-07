function Validate() {
	var _input     = require("./input.js");
	this.input     = new _input();
	this.allError  = [];
	this.ListError = {};
	this.ListDetailErrr = [];
	this.messges = {
		email     : "Please enter {$1} is email",
    	number    : "Please enter {$1} is number",
    	required  : "Please enter {$1} is not emty",
    	mintext   : "Please enter {$1} at least {$2} characters",
    	maxtext   : "Please enter {$1} at most {$2} characters",
    	date	  : "Please enter {$1} is date",
    	mindate   : "Please enter {$1} at least {$2} date",
    	maxdate   : "Please enter {$1} at most {$2} date" ,
    	minnumber : "Please enter {$1} of greater than {$2}",
    	maxnumber : "Please enter {$1} less than {$2}",
    	same      : "Please enter {$1} same as {$2}",
    	phone	  : "Please enter {$1} is phone number",
    	url 	  : "Please enter {$1} a url"
	}
	this.addmessge = function($messges){
		this.messges = Object.assign(this.messges,$messges);
		return this.messges;
	}
	this.check = function($arg = {} ,$option = {}){
		var item,key,check,validate,messges,value,argvalidate,label,argparmeter,parmeter,numberparmeter,messgesError;
		var that = this;
		var validatecheck = true;
		$arg.foreach(function(k,v){
			if(typeof(v) !== "function"){
				item     = $option[k];
				value    = v;
				validate = item.validate;
				label    = item.label;
				key      = k;
				if(typeof item.messges != "undefined") 
					messges = item.messges;
				else 
					messges = that.messges;
				argvalidate = validate.split("|");
				argvalidate.foreach(function(k,v){
					argparmeter = v.split(":");
			 		numberparmeter = (argparmeter.length - 1);
			 		try {
						switch(numberparmeter) {
						    case 0:
						        check = that[argparmeter[0]](value);
						        break;
						    case 1:
						        check = that[argparmeter[0]](value,argparmeter[1]);
						        break;
						    case 2:
						        check = that[argparmeter[0]](value,argparmeter[1],argparmeter[2]);
						        break;
						    case 3:
						        check = that[argparmeter[0]](value,argparmeter[1],argparmeter[2],argparmeter[3]);
						        break;
						    case 4:
						        check = that[argparmeter[0]](value,argparmeter[1],argparmeter[2],argparmeter[3],argparmeter[4]);
						        break;
						    default:
						        _Phoenix.info.error.push({detail:item ,message : "Error: The number of parameters passed in exceeds the permission!"});
								return false;
						}
						if (check == false) {
							messgesError = messges[argparmeter[0]];
							switch(numberparmeter) {
							    case 0:
							        messgesError = messgesError.replaceAll("{$1}",label);
							        break;
							    case 1:
							        messgesError = messgesError.replaceAll("{$1}",label);
							        messgesError = messgesError.replaceAll("{$2}",argparmeter[1]);
							        break;
							    case 2:
							        messgesError = messgesError.replaceAll("{$1}",label);
							        messgesError = messgesError.replaceAll("{$2}",argparmeter[1]);
							        messgesError = messgesError.replaceAll("{$3}",argparmeter[2]);
							        break;
							    case 3:
							        messgesError = messgesError.replaceAll("{$1}",label);
							        messgesError = messgesError.replaceAll("{$2}",argparmeter[1]);
							        messgesError = messgesError.replaceAll("{$3}",argparmeter[2]);
							        messgesError = messgesError.replaceAll("{$4}",argparmeter[3]);
							        break;
							    case 4:
							        messgesError = messgesError.replaceAll("{$1}",label);
							        messgesError = messgesError.replaceAll("{$2}",argparmeter[1]);
							        messgesError = messgesError.replaceAll("{$3}",argparmeter[2]);
							        messgesError = messgesError.replaceAll("{$4}",argparmeter[3]);
							        messgesError = messgesError.replaceAll("{$5}",argparmeter[4]);
							        break;
							    default:
							        _Phoenix.info.error.push({detail:item ,message : "Error: The number of parameters passed in exceeds the permission!"});
									return false;
							}
							that.allError.push(messgesError);
							that.ListError[key] = messgesError;
							that.ListDetailErrr.push(item);
							validatecheck = false;
						}		
					} catch (e) {	
						_Phoenix.info.error.push({detail:e.TypeError, message : "Error: Please check data sent to validate!"});
						return false;
					}
				});	 
			}
		});
		return {validate : validatecheck, errors : this.ListError };
	}
	this.email = function($value){
        if($value.trim() != "" && $value != null){
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test($pramte2);
        }
        return true;
    }
    this.number = function($value){
        if($value.trim() != "" && $value != null){
            return $.isNumeric($pramte2);
        }
        return true;
    }
    this.mintext = function ($value,$set){
        if($value.trim() != "" && $value != null){
            return ($value.length >= $set);
        }
        return true;       
    }
    this.maxtext = function ($value,$set){
        if($value.trim() != "" && $value != null){
            return ($value.length <= $set);
        }  
        return true;
    }
    this.minnumber = function ($value,$set){
        if($value.trim() != "" && $value != null){
            return ($value >= $set);
        }
        return true;       
    }
    this.maxnumber = function ($value,$set){
        if($value.trim() != "" && $value != null){
            return ($value <= $set);
        }  
        return true;
    }
    this.mindate = function ($value,$set){
        if($value.trim() != "" && $value != null){
            var date1 = new Date($value);
            var date2 = new Date($set);
            return ($date1 >= $date2);
        }
        return true;       
    }
    this.maxdate = function ($value,$set){
        if($value.trim() != "" && $value != null){
            var date1 = new Date($value);
            var date2 = new Date($set);
            return ($date1 <= $date2);
        }  
        return true;
    }
    this.match = function ($value,$set){
        if($value.trim() != "" && $value != null){
            return ($value == $set);
        }
        return true;    
        
    }
    this.date = function ($value){
        if($value.trim() != "" && $value != null){
            var dtRegex = new RegExp(/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{4}\b/);
            return dtRegex.test($value);
        }
        return true;
    }
    this.required = function ($value){
        return ( $value != null && $value.trim() != "" );
    }
    this.same = function ($value,$set){
        if($value.trim() != "" && $value != null){
            var samdata = $set.split(",");
            return ($.inArray($value,samdata) != -1);
        }
        return true;
    }
    this.url = function  ($value){
        if($value.trim() != "" && $value != null){
            var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            return regexp.test($value);
        }
        return true;
    }
    this.phone = function ($value){
        if($value.trim() != "" && $value != null){
            var filter = /^[0-9-+]+$/;
            return filter.test($value);
        }
        return true;
    }
    this.getError = function ($name = null){
    	if($name == null) return this.allError;
    	else return this.ListError[$name];
    }
	this.getListError = function (){
		return this.ListError;				
	}
	this.getAllError = function(){
		return this.ListDetailErrr;
	}
}
module.exports = Validate;