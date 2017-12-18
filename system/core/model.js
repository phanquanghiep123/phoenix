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
		if(typeof $model == "object" ){
			this.phoenix_tomodel = $model;
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to convert function must be an model"});
		}
		return this;
	}
	this.select = function ($data = null){
		if(typeof $data == "object"){
			for (var i in $data){
				this.phoenix_selects.push($data[i]);
			}
			
		}else if(typeof $data == "string" || typeof $data == "number" ){
			$data = $data.split(",");
			for (var i in $data){
				this.phoenix_selects.push($data[i]);
			}
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to select function must be an array or string"});
		}
		return this;
	}
	this.where_or = function($data = null){
		if(typeof $data == "object"){
			for(var i in $data){
				if(typeof $data[i] == "object"){
					this.phoenix_where.push({ type : 1 ,data : $data[i]});
				}else{
					this.phoenix_where.push({ type : 1 ,data : $data});
					return this;
				}		
			}	
		}else{ 
			_Controller.info.error.push({detail:"" ,message : "The data sent to where function must be an array"});
		}
		return this;
	}
	this.start_group = function(){
		this.phoenix_where.push({ type : 2 ,data : " ( "});
		return this;
	} 
	this.end_group = function(){
		this.phoenix_where.push({ type : 2 ,data : " ) "});
		return this;
	}
	this.where = function($data = null){
		if(typeof $data == "object"){
			for(var i in $data){
				if(typeof $data[i] == "object"){
					this.phoenix_where.push({ type : 0 ,data : $data[i]});
				}else{
					this.phoenix_where.push({ type : 0 ,data : $data});
					return this;
				}			
			}	
		}else{ 
			_Controller.info.error.push({detail:"" ,message : "The data sent to where function must be an array"});
		}
		return this;
	} 
	this.where_in  = function($key = null ,$in = []){
		if(typeof $key != "string"){
			_Controller.info.error.push({detail:"" ,message : "The data key sent to where_in function must be an string"});
			return this;	
		}
		if(typeof $in != "object"){
			_Controller.info.error.push({detail:"" ,message : "The data in sent to where_in function must be an  array"});
			return this;	
		}
		this.phoenix_where.push({ type : 3 ,data :$in, key: $key });
		return this;
	}
	this.where_not_in  = function($key = null ,$in = []){
		if(typeof $key != "string"){
			_Controller.info.error.push({detail:"" ,message : "The data key sent to where_not_in function must be an string"});
			return this;	
		}
		if(typeof $in != "object"){
			_Controller.info.error.push({detail:"" ,message : "The data not in sent to where_not_in function must be an array"});
			return this;	
		}
		this.phoenix_where.push({ type : 4 ,data :$in, key: $key });
		return this;
	}
	this.inner_join = function($table, $ondata = null, $and = null){
		if(typeof $table == "string" || typeof $table == "object" ){
			if(typeof $ondata != "object"){
				_Controller.info.error.push({detail:"" ,message : "The data on sent to inner_join function must be an array"});
				return this;
			}
			if($and != null && typeof $and != "object"){
				_Controller.info.error.push({detail:"" ,message : "The data and sent to inner_join function must be an array"});
				return this;
			}
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data table sent to inner_join function must be an string or model"});
			return this;
		}
		this.phoenix_joins.push({table : $table, on : $ondata, and : $and, type: 0});
		return this;
	}
	this.left_join = function($table, $ondata ,$and = null){
		if(typeof $table == "string" || typeof $table == "object" ){
			if(typeof $ondata != "object"){
				_Controller.info.error.push({detail:"" ,message : "The data on sent to left_join function must be an array"});
				return this;
			}
			if($and != null && typeof $and != "object"){
				_Controller.info.error.push({detail:"" ,message : "The data and sent to left_join function must be an array"});
				return this;
			}
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data table sent to left_join function must be an string or model"});
			return this;
		}
		this.phoenix_joins.push({table : $table, on : $ondata, and : $and, type: 1});
		return this;
	}
	this.right_join = function($table,$ondata,$and = null){
		if(typeof $table == "string" || typeof $table == "object" ){
			if(typeof $ondata != "object"){
				_Controller.info.error.push({detail:"" ,message : "The data on sent to right_join function must be an array"});
				return this;
			}
			if($and != null && typeof $and != "object"){
				_Controller.info.error.push({detail:"" ,message : "The data and sent to right_join function must be an array"});
				return this;
			}
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data table sent to right_join function must be an string or model"});
			return this;
		}
		this.phoenix_joins.push({table : $table, on : $ondata, and : $and, type: 2});
		return this;
	}
	this.limit = function($limit = null,$offset = null){
		if($offset != null && typeof $offset != "number"){
			_Controller.info.error.push({detail: "" ,message : "The data offset sent to limit function must be an number"});
			return this;
		}
		if(typeof $limit != "number"){
			_Controller.info.error.push({detail: "" ,message : "The data limit sent to limit function must be an number"});
			return this;
		}
		this.phoenix_limit.push($limit);
		this.phoenix_limit.push($offset);
		return this;
	}
	this.order_by = function($order){
		if(typeof $order == "object"){
			this.phoenix_order.push($order);
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to order_by function must be an array"});
		}
		return this;
	}
	this.group_by = function($group){
		if(typeof $group == "object"){
			this.phoenix_group.push($group);
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to group_by function must be an array"});
		}
		return this;
	}
	this.record  = function(){
		this.db.get(this,0);
		return this;
	}
	this.result  = function(){
		this.db.get(this,1);
		return this;
	}
	this.destroy = function (){
		 
		if(this.phoenix_list !== null){
			for (var i in this.phoenix_list ){
				if(this.phoenix_list[i].phoenix_subkey == false){
					this.phoenix_list[i].phoenix_where.push([ this.phoenix_list[i].key ,"=" ,this.phoenix_list[i][this.phoenix_list[i].key]] );	
				}else{
				    for (var i in this.key){
				   		this.phoenix_list[i].phoenix_where.push([ this.phoenix_list[i].key[i],"=",this[this.phoenix_list[i].key[i]] ]);
				    }
				}
				this.db.destroy(this.phoenix_list[i]);
			}
		}
		if(this.phoenix_subkey == false){
			this.phoenix_where.push([ this.key ,"=" ,this[this.key]] );	
		}else{
		    for (var i in this.key){
		   		this.phoenix_where.push([ this.key[i],"=",this[this.key[i]] ]);
		    }
		}
		this.db.destroy(this);
		this.addnew();
		return this;
	}
	this.save = function(){
		if(this.phoenix_subkey == false){
			this.where([ this.key ,"=" ,this[this.key]] );	
		}else{
		    for (var i in this.key){
		   		this.where([ this.key[i],"=",this[this.key[i]]]);
		    }
		}
		this.db.save(this);
		this.phoenix_new = 0;
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
		this.phoenix_tomodel     = false;
		return this;
	}
	this.find = function($id){
		if(this.phoenix_subkey == false){
			this.where([ this.key ,"=" ,$id]);
		}else{
		    for (var i in $id){
		   		this.where([this.key[i],"=",$id[i]]);
		    }
		}
		this.db.find(this);
		return this;
	}
	this.addnew = function(){
		this.reset();
		this.phoenix_new = 1;
		this.__construct(); 
		return this;
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