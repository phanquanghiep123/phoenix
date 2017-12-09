function Db() {
	this.connectDriver = {};
	this.driver;
	this.init = function (){
		switch(_Config.database.driver) {
		    case "Mysql":
		        this.connectDriver = require("./drivers/mysql");
		        break;
		    case "NoSQL":
		        this.connectDriver = require("./drivers/nosql");
		        break;
		    case "PostgreSQL":
		        this.connectDriver = require("./drivers/postgresql");
		   		break;
		}
		this.driver = new this.connectDriver(_Config.database[_Config.database.driver]); 
	}
	this.seclect = function(columns){
		try {
			this.driver.seclect(columns);
		}
	    catch (e) {
			if (e instanceof SyntaxError) _Controller.info.error.push({detail:e ,message : e.message});
			else _Controller.info.error.push({detail:e ,message : e});
		}	
	}
	this.from = function(table){
		this.driver.from(table)
	}
	this.join = function(table,ondata,type = ""){
		this.driver.join(table,ondata,type);
	}
	this.where = function(wheredata){
		this.driver.where(wheredata);
	}
	this.where_or = function(wheredata){
		this.driver.where_or(wheredata);
	}
	this.where_in = function(columns,arg,type = false){
		this.driver.where_in(columns,arg,type); 
	}
	this.where_not_in = function(columns,arg,type = false){
		this.driver.where_not_in(columns,arg,type); 
	}
	this.start_group = function(){
		this.driver.start_group(columns,arg,type); 
	}
	this.end_group = function(){
		this.driver.end_group(); 
	}
	this.limit = function(offset,limit){
		this.driver.limit(offset,limit); 
	}
	this.get = function(callback){
		_Controller.wait();
		this.driver.get(callback); 
	}
	this.printsql = function(){
		this.driver.printsql(); 
	}
	this.update = function(table,dataUpdate,where = null){
		try {
			this.driver.update(table,dataUpdate,where); 
		}	
		catch (e) {
				if (e instanceof SyntaxError) _Controller.info.error.push({detail:e ,message : e.message});
				else _Controller.info.error.push({detail:e ,message : e});
		}	
		
	}
	this.delete = function(table,where){
		try {
			this.driver.delete(table,where); 
		}	
		catch (e) {
				if (e instanceof SyntaxError) _Controller.info.error.push({detail:e ,message : e.message});
				else _Controller.info.error.push({detail:e ,message : e});
		}	 
	}
	this.insert = function(table,data,callback){
		try {
			this.driver.insert(table,data,callback);  
		}	
		catch (e) {
			if (e instanceof SyntaxError) _Controller.info.error.push({detail:e ,message : e.message});
			else _Controller.info.error.push({detail:e ,message : e});
		}	
	}
	this.sql = function(sql){	
		this.driver.sql(sql);  	
	}
	this.init();
}
module.exports = Db;