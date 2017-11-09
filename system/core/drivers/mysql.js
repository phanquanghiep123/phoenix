function Mysql(){
	var that            = require('mysql');
	var Rows    		= [];
	var Sql     		= "";
	var Table   		= null;
	var Columns 		= "*";
	var Limit           = "";
	var Relationship 	= [];
	var Condition 		= [];
	var DataConfig      = _Config.database;
	var ConnectData     = {
		host     : DataConfig.hostname,
		user     : DataConfig.username,
		password : DataConfig.password,
		database : DataConfig.database,
		port     : DataConfig.port
	};
	var Connection = that.createConnection(ConnectData,function(err){
		if (err) {
		    console.error('error connecting: ' + err.stack);
		    return;
		}
		console.log('connected as id ' + connection.threadId);
	});
	var SqlPrint = "";
	this.seclect = function(columns){
		Columns = columns;
		return true;
	}
	this.from = function(table){
		Table = table;
		return true;
	}
	this.join = function(table,ondata,type = ""){
		Relationship.push(type.trim() + " JOIN " + table.trim() + " ON " + ondata.trim());
		return true;
	}
	this.where = function(wheredata){
		if(typeof wheredata == "object"){
			var dataValue = "";
			for (var i in wheredata){
				if(wheredata[i] == null)
					wheredata[i] = "null";
				else{
					if( isNaN(wheredata[i]) == true )
						dataValue = "'" + wheredata[i].trim() + "'";
					else
						dataValue = wheredata[i].trim();	
				}
				if(dataValue == '')
					dataValue = "''";	
				Condition.push("AND " + key + " = " + dataValue);
			}
			return true;
		}
		return false;
	}
	this.where_or = function(wheredata){
		if(typeof wheredata == "object"){
			var dataValue = "";
			for (var i in wheredata){
				if(wheredata[i] == null)
					wheredata[i] = "null";
				else{
					if( isNaN(wheredata[i]) == true )
						dataValue = "'" + wheredata[i].trim() + "'";
					else
						dataValue = wheredata[i].trim();	
				}
				if(dataValue == '')
					dataValue = "''";	
				Condition.push("OR " + key + " = " + dataValue);
			}
			return true;
		}
		return false;
	}
	this.where_in = function(columns,arg,type = false){
		var string = "";
		var data  = [];
		var dataValue;
		for(var i in arg){
			if( isNaN(arg[i]) == true )
				dataValue = "'" + arg[i].trim() + "'";
			else
				dataValue = arg[i].trim();
			data.push(dataValue);	
		}
		string = data.join(",");
		Condition.push("AND " + columns + " IN ( " + string + " )");
		return true;
	}
	this.where_not_in = function(columns,arg,type = false){
		var string = "";
		var data  = [];
		var dataValue;
		for(var i in arg){
			if( isNaN(arg[i]) == true )
				dataValue = "'" + arg[i].trim() + "'";
			else
				dataValue = arg[i].trim();
			data.push(dataValue);	
		}
		string = data.join(",");
		Condition.push("AND " + columns + " NOT IN ( " + string + " )");	
		return true;
	}
	this.start_group = function(){
		Condition.push("(");
		return true;
	}
	this.end_group = function(){
		Condition.push(")");
		return true;
	}
	this.limit = function(offset,limit){
		Limit = "LIMIT "+offset+","+limit+"";
		return true;
	}
	this.get = function($callback){
		_Controller.wait();
		Rows    		    = [];
		var StringCondition = Condition.join(" ");
		var StringJoin      = Relationship.join(" ");
		StringCondition     = StringCondition.replace("AND", "");
		if(StringCondition != "" )
			StringCondition = "WHERE" + StringCondition;
		Sql = "SELECT " + Columns + " FROM " + Table +" " + StringJoin + StringCondition  + Limit;
		Connection.connect();
		Connection.query(Sql,function(err, rows, fields){
			$callback(err, rows, fields);
			console.log("_Controller");
			_Controller.endwait();
		});
		Connection.end();
		SqlPrint	    += (Sql+ " <br/>");	
		Sql     		= "";
		Table   		= null;
	    Columns 		= "*";
		Limit           = "";
		Relationship 	= [];
		Condition 		= []; 

	}
	this.printsql = function(){
		return SqlPrint;
	}
	this.update = function(table,dataUpdate,where = null){
		var lengthArg = dataUpdate.length;
		try{
			var sql = "UPDATE FROM "+table+" SET "; 
			var i = 1;
			for(var key in dataUpdate){
				if( isNaN(dataUpdate[key]) == true ) dataUpdate[key] = "'" + dataUpdate[key].trim() + "'";
				else dataUpdate[key] = dataUpdate[key].trim();
				if(lengthArg < i) sql += key + " = " + dataUpdate[key] + ",";
				else sql += key + " = " + dataUpdate[key];
				i++;
			}
			if(where != null){
				sql+ " WHERE ";
				i = 1;
				lengthArg = where.length;
				for(var key in where){
					if( isNaN(where[key]) == true ) where[key] = "'" + where[key].trim() + "'";
					else where[key] = where[key].trim();
					if(lengthArg < i) sql += key + " = " + where[key] + " AND ";
					else sql += key + " = " + where[key];
					i++;
				}
			}
			Connection.query(sql);
			return true;
		}catch(e) {
    		if (e instanceof SyntaxError) write(e.message);
			else console.log(e);
			return false;
		}	
		
	}
	this.delete = function(table,where){
		var sql = "DELETE FROM "+table; 
		if(where != null){
			sql+ " WHERE ";
			i = 1;
			var lengthArg = where.length;
			for(var key in where){
				if( isNaN(where[key]) == true ) where[key] = "'" + where[key].trim() + "'";
				else where[key] = where[key].trim();
				if(lengthArg < i) sql += key + " = " + where[key] + " AND ";
				else sql += key + " = " + where[key];
				i++;
			}
			try{
				Connection.query(sql);
				SqlPrint += sql + "<br/>";
				return true;
			}catch(e) {
    			if (e instanceof SyntaxError) write(e.message);
				else console.log(e);
				return false;
			}
		}
	}
	this.insert = function(table,data,callback){
		try{
			Connection.query('INSERT INTO '+table+' SET ?',data, function(err, result) {
			  	callback(err, result);
			});
			return true;
		}catch(e) {
			if (e instanceof SyntaxError) write(e.message);
			else console.log(e);
			return false;
		}
	}
	this.sql = function(sql,callback){
		var options = {sql: sql, nestTables: false};
		try {	
			Connection.query(options,function(err, rows, fields){callback(err, rows, fields);});
			SqlPrint += sql + "<br/>";
			return true;
		}catch(e) {
    		if (e instanceof SyntaxError) write(e.message);
			else console.log(e);
			return false;
		}
	}
}
module.exports = Mysql;
