function Model() {
	const _db      = require("./db.js");
	const _input   = require("./input.js");
	const _load    = require("./loader.js");
	this.load      = new _load();
	this.db        = new _db();
	this.input     = new _input();
	this.table     = null;
	this.key       = null;
	this.colums    = [];
	this.validate  = null;
	this._sql      = null;
	this._selects  = [];
	this._where    = [];
	this._wherein  = [];
	this._wherenotin  = [];
	this._joins    = [];
	this._limit    = [];
	this._order    = [];
	this._group    = [];
	this._having   = [];
 	this.__construct = function(){
		if(this.table  == null || this.key == null){
			_Phoenix.info.error.push({detail:"Model error" ,message : "Error: Please add name and key for table!"});
			return false;
		}else{
			this[this.key] = 0;
		}
		return true;
	}
	this.select = function ($data = null){
		if(typeof $data == "object"){
			for (var i in $data){
				this._selects.push($data[i]);
			}
			
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to select function must be an array"});
		}
		return this;
	}
	this.where = function($data = null){
		if(typeof $data == "object"){
			for(var i in $data){
				this._where.push($data[i]);
			}	
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to where function must be an array"});
		}
		return this;
	}
	this.wherein  = function($key = null ,$in = []){
		this._wherein.push({key:$key,in:$in});
		return this;
	}
	this.wherenotin  = function($key = null ,$in = []){
		this._wherenotin.push({key:$key,in:$in});
		return this;
	}
	this.innerjoin = function($table,$ondata = null,$and = null){
		if(typeof $ondata == "object"){
			this._joins.push({table : $table, on : $ondata, and : $and, type: 0});
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to innerjoin function must be an array"});
		}
		return this;
	}
	this.leftjoin = function($table,$ondata,$and = null){
		if(typeof $ondata == "object"){
			this._joins.push({table : $table, on : $ondata, and : $and, type: 1});
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to leftjoin function must be an array"});
		}
		return this;
	}
	this.rightjoin = function($table,$ondata,$and = null){
		if(typeof $ondata == "object"){
			this._joins.push({table : $table, on : $ondata, and : $and, type: 2});
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to rightjoin function must be an array"});
		}
		return this;
	}
	this.limit = function($offset = null,$limit = null){
		if($limit != null && typeof $limit == "number"){
			this._limit.push($limit);
		}
		if($offset != null && typeof $offset == "number"){
			this._limit.push($offset);
		}
		return this;
	}
	this.orderby = function($order){
		if(typeof $order == "object"){
			this._order.push($order);
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to orderpby function must be an array"});
		}
		return this;
	}
	this.groupby = function($group){
		if(typeof $group == "object"){
			this._group.push($group);
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to groupby function must be an array"});
		}
		return this;
	}
	this.record  = function($callback){
		this.db.get(this,0,$callback);
		return this;
	}
	this.result  = function($callback){
		this.db.get(this,1,$callback);
		return this;
	}
	this.remove = function ($callback){
		return this;
	}
	this.save = function($callback){
		this.db.save(this);
		return this;
	}
	this.GeneratorSql = function (){
		return this;
	}
	this.reset = function(){
		this.table     = null;
		this.key       = null;
		this.colums    = [];
		this.validate  = null;
		this._sql      = null;
		this._selects  = [];
		this._joins    = [];
		this._limit    = {};
		this._order     = [];
		this.group     = [];
		this.having    = [];
		return this;
	}
	this.find = function($id,$callback = null){
		this.db.find(this,$id,$callback);
		return this;
	}
}
module.exports = Model;