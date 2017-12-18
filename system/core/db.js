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
	this.get = function($model,$type){
		_Controller.wait();
		return this.driver.get($model,$type); 
	}
	this.save = function($model){
		_Controller.wait();
		return this.driver.save($model); 
	}
	this.find = function ($model){
		_Controller.wait();
		return this.driver.find($model); 
	}
	this.destroy = function($model){
		_Controller.wait();
		return this.driver.destroy($model);
	}
	this.reader = function($model){
		return this.driver.get($model,0,false);
	}
	this.init();
}
module.exports = Db;