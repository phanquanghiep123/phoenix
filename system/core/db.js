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
	this.get = function($model,$type,$callback){
		_Controller.wait();
		this.driver.get($model,$type,$callback); 
	}
	this.save = function($model,$callback){
		this.driver.save($model,$callback); 
	}
	this.find = function ($model,$id,$callback){
		this.driver.find($model,$id,$callback); 
	}
	this.init();
}
module.exports = Db;