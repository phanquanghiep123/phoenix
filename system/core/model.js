function Model() {
	const _db         = require("./db.js");
	const _input      = require("./input.js");
	const _load       = require("./loader.js");
	this.load         = new _load();
	this.db           = new _db();
	this.input        = new _input();
	this.table        = null;
	this.key          = null;
	this.colums       = [];
	this.phoenix_list = [];
	this.validate     = null;
	this.phoenix_callback    = null;
	this.phoenix_sql         = null;
	this.phoenix_new         = 0;
	this.phoenix_selects     = [];
	this.phoenix_where       = [];
	this.phoenix_wherein     = [];
	this.phoenix_wherenotin  = [];
	this.phoenix_joins       = [];
	this.phoenix_limit       = [];
	this.phoenix_order       = [];
	this.phoenix_group       = [];
	this.phoenix_having      = [];
	this.phoenix_subkey      = false;
	this.phoenix_modelkey    = false;
	this.phoenix_as          = false;
	this.phoenix_tomodel     = false;
	this.phoenix_keyword     = ["phoenix_name","phoenix_modelskey","phoenix_callback", "phoenix_sql", "phoenix_new", "phoenix_selects", "phoenix_where ", "phoenix_wherein", "phoenix_wherenotin", "phoenix_joins", "phoenix_limit", "phoenix_order", "phoenix_group", "phoenix_having", "phoenix_subkey", "phoenix_modelkey", "phoenix_as", "phoenix_tomodel", "key", "table", "colums", "phoenix_list", "validate"];
 	this.__construct = function(){
		if(this.table  == null || this.key == null){
			_Phoenix.info.error.push({detail:"Model error" ,message : "Error: Please add name and key for table!"});
			return false;
		}else{
			if(typeof this.key == "string")
				this[this.key] = 0; 
			else if(typeof this.key == "object"){
				for (var i in this.key){
					this[this.key[i]] = 0;	
				}
				this.phoenix_subkey = true;
			}
		}
		this.phoenix_modelskey = RamdonString(20);
		return true;
	}
	this.as = function($asName){
		this.phoenix_as = $asName;
		return this;
	}
	this.convert = function($model){
		this.phoenix_tomodel = $model;
		return this;
	}
	this.select = function ($data = null){
		if(typeof $data == "object"){
			for (var i in $data){
				this.phoenix_selects.push($data[i]);
			}
			
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to select function must be an array"});
		}
		return this;
	}
	this.where_or = function($data = null){
		if(typeof $data == "object"){
			for(var i in $data){
				this.phoenix_where.push({ type : 1 ,data : $data[i]});
			}	
		}else{ 
			_Controller.info.error.push({detail:"" ,message : "The data sent to where function must be an array"});
		}
		return this;
	}
	this.where_start_group = function($data = null){
		this.phoenix_where.push({ type : 3 ,data : " ( "});
		return this;
	} 
	this.where_end_group = function($data = null){
		this.phoenix_where.push({ type : 3 ,data : " ) "});
		return this;
	}
	this.where = function($data = null){
		if(typeof $data == "object"){
			for(var i in $data){
				this.phoenix_where.push({ type : 0 ,data : $data[i]});
			}	
		}else{ 
			_Controller.info.error.push({detail:"" ,message : "The data sent to where function must be an array"});
		}
		return this;
	} 
	this.wherein  = function($key = null ,$in = []){
		this.phoenix_wherein.push({key:$key,in:$in});
		return this;
	}
	this.wherenotin  = function($key = null ,$in = []){
		this.phoenix_wherenotin.push({key:$key,in:$in});
		return this;
	}
	this.innerjoin = function($table, $ondata = null, $and = null){
		if(typeof $ondata == "object"){
			this.phoenix_joins.push({table : $table, on : $ondata, and : $and, type: 0});
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to innerjoin function must be an array"});
		}
		return this;
	}
	this.leftjoin = function($table, $ondata ,$and = null){
		if(typeof $ondata == "object"){
			this.phoenix_joins.push({table : $table, on : $ondata, and : $and, type: 1});
		}else{
			_Controller.info.error.push({detail: "" ,message : "The data sent to leftjoin function must be an array"});
		}
		return this;
	}
	this.rightjoin = function($table,$ondata,$and = null){
		if(typeof $ondata == "object"){
			this.phoenix_joins.push({table : $table, on : $ondata, and : $and, type: 2});
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to rightjoin function must be an array"});
		}
		return this;
	}
	this.limit = function($offset = null,$limit = null){
		if($limit != null && typeof $limit == "number"){
			this.phoenix_limit.push($limit);
		}
		if($offset != null && typeof $offset == "number"){
			this.phoenix_limit.push($offset);
		}
		return this;
	}
	this.orderby = function($order){
		if(typeof $order == "object"){
			this.phoenix_order.push($order);
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to orderpby function must be an array"});
		}
		return this;
	}
	this.groupby = function($group){
		if(typeof $group == "object"){
			this.phoenix_group.push($group);
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to groupby function must be an array"});
		}
		return this;
	}
	this.record  = function(){
		var that  = new Object;
		for (var i in this){
			that[i] = this[i];
		}
		this.db.get(that,0);
		this.phoenix_callback = null;
		return this;
	}
	this.result  = function(){
		var that  = new Object;
		for (var i in this){
			that[i] = this[i];
		}
		this.db.get(that,1);
		this.phoenix_callback = null;
		return this;
	}
	this.destroy = function (){
		var that  = new Object;
		for (var i in this){
			that[i] = this[i];
		}
		if(that.phoenix_list !== null){
			for (var i in that.phoenix_list ){
				if(that.phoenix_list[i].phoenix_subkey == false){
					that.phoenix_list[i].phoenix_where.push([ that.phoenix_list[i].key ,"=" ,that.phoenix_list[i][that.phoenix_list[i].key]] );	
				}else{
				    for (var i in that.key){
				   		that.phoenix_list[i].phoenix_where.push([ that.phoenix_list[i].key[i],"=",that[that.phoenix_list[i].key[i]] ]);
				    }
				}
				that.db.destroy(that.phoenix_list[i]);
			}
		}
		if(that.phoenix_subkey == false){
			that.phoenix_where.push([ that.key ,"=" ,that[that.key]] );	
		}else{
		    for (var i in that.key){
		   		that.phoenix_where.push([ that.key[i],"=",that[that.key[i]] ]);
		    }
		}
		that.db.destroy(that);
		that.phoenix_callback = null; 
		that.addnew();
		return that;
	}
	this.save = function(){
		var that  = new Object;
		for (var i in this){
			that[i] = this[i];
		}
		if(that.phoenix_subkey == false){
			that.phoenix_where.push([ that.key ,"=" ,that[that.key]] );	
		}else{
		    for (var i in that.key){
		   		that.phoenix_where.push([ that.key[i],"=",that[that.key[i]] ]);
		    }
		}
		this.db.save(that);
		this.phoenix_new = 0;
		this.phoenix_callback = null; 
	}
	this.reset = function(){
		this.phoenix_callback    = null;
		this.phoenix_sql         = null;
		this.phoenix_new         = 0;
		this.phoenix_selects     = [];
		this.phoenix_where       = [];
		this.phoenix_wherein     = [];
		this.phoenix_wherenotin  = [];
		this.phoenix_joins       = [];
		this.phoenix_limit       = [];
		this.phoenix_order       = [];
		this.phoenix_group       = [];
		this.phoenix_having      = [];
		this.phoenix_subkey      = false;
		this.phoenix_modelkey    = false;
		this.phoenix_as          = false;
		this.phoenix_tomodel     = false;
		return this;
	}
	this.find = function($id){
		var that  = new Object;
		for (var i in this){
			that[i] = this[i];
		}
		if(that.phoenix_subkey == false){
			that.phoenix_where.push([ $model[$model.key] ,"=" ,$id] );	
		}else{
		    for (var i in $id){
		   		that.phoenix_where.push([$model.key[i],"=",$id[i]]);
		    }
		}
		this.db.find(that,$id);
		this.phoenix_callback = null;
		return this;
	}
	this.addnew = function(){
		var that  = new Object;
		for (var i in this){
			that[i] = this[i];
		}
		that.reset();
		that.phoenix_new = 1;
		that.__construct(); 
		return that;
	}
	this.tolist = function($data = null){ 
		var list = [];
		if(ObjectLength(this.phoenix_list) > 0){
			for (var i in this.phoenix_list){
				var item = {};
				for (var ii in this.phoenix_list[i]){
					if(typeof this.phoenix_list[i][ii] !== "function" && typeof this.phoenix_list[i][ii] !== "object" && this.phoenix_keyword.indexOf(ii) == "-1"){
						item[ii] = this.phoenix_list[i][ii];
					}
				}
				list.push(item); 
			}
			return list;
		}else{
			var item = {};
			for ( var i in this){
				if(typeof this.phoenix_list == "function" && typeof this.phoenix_list == "object" && this.phoenix_keyword.indexOf(i) == "-1"){
					item[i] = this.phoenix_list[i];
				}
			}
			return item;
		}
		
	}
	this.reader = function(){
		this.db.reader(this);
		return this;
	}
	this.callback = function($callback){
		this.phoenix_callback = $callback;
		return this;
	}

}
module.exports = Model;