function Db() {
	this.connectDriver;
	this.driver;
	this.init = function (){
		switch(_Config.database.driver) {
		    case "mysql":
		        connectDriver = require("./drivers/mysql");
		        break;
		    case "NoSQL":
		        connectDriver = require("./drivers/nosql");
		        break;
		    case "PostgreSQL":
		        connectDriver = require("./drivers/postgresql");
		   		break;
		}
		this.driver = new connectDriver();
	}
	this.seclect = function(columns){
		this.driver.seclect(columns)
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
	this.get = function($callback){
		_Controller.wait();
		this.driver.get(callback); 

	}
	this.printsql = function(){
		this.driver.printsql(); 
	}
	this.update = function(table,dataUpdate,where = null){
		this.driver.update(table,dataUpdate,where); 
	}
	this.delete = function(table,where){
		this.driver.delete(table,where);  
	}
	this.insert = function(table,data,callback){
		this.driver.delete(table,data,callback);  
	}
	this.sql = function(sql,callback){
		this.driver.sql(sql,callback);  
	}
	this.init();
}
module.exports = Db;