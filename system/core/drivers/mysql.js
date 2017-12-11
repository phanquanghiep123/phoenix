function driverMysql($SeverInfo){
    const _mysql         = require('mysql');
	const _connection    = _mysql.createConnection($SeverInfo);
	this._sql     	   = "";
	this._table   	   = null;
	this._columns 	   = [];
	this._limit        = "";
	this._order        = [];
	this._group        = [];
	this._relationship = [];
	this._where        = [];
	this._sqlPrint     = "";
	this._sqlKeyWord   = ["%","=","*","/","+","-","like","in","not","or","on","and","left","end","as","right","inner"]
	try{
		_connection.connect(function($err) {
			if ($err) {
				_Controller.info.error.push({detail:$err ,message : $err.stack});
			}
		});
	}catch(e){
		if (e instanceof SyntaxError)  _Controller.info.error.push({detail:e ,message : e.message});
		else  _Controller.info.error.push({detail:e ,message : e});
	}
	this.select = function($columns = []){
		var selectString ;
		if(typeof $columns == "object"){
			for (var i in $columns){
				selectString = $columns[i].ReplaceAll("````","`");
				selectString = selectString.ReplaceAll("```","`");
				selectString = selectString.ReplaceAll("``","`");
				selectString = "`"+selectString+"`";
				selectString = selectString.ReplaceAll(".","`.`");
				selectString = selectString.ReplaceAll("`*`","*");
				this._columns.push(selectString);
			}
			return this;
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to select must be an object"});
			return false;
		}
	}
	this.from = function($table){
		var argTable = $table.split(" ");
 		argTable = cleanEmtyItemArray(argTable,"");
		var tableString;
		var newArrayTable = [];
		if(argTable.length > 0){
			for (var i in argTable){
				if(this._sqlKeyWord.indexOf(argTable[i].toLowerCase().trim()) == -1){
					tableString = argTable[i].ReplaceAll("````","`");
					tableString = tableString.ReplaceAll("```","`");
					tableString = tableString.ReplaceAll("``","`");
					tableString = "`"+tableString+"`";
					newArrayTable.push(tableString);
				}else{
					newArrayTable.push(argTable[i]);
				}
			}
		}
		this._table = newArrayTable.join(" ");
		return this;
	}
	this.join = function($table, $ondata = {}, $where = {}){
		var newTable = "";
		var argTable = $table.split(" ");
		argTable = cleanEmtyItemArray(argTable,"");
		var tableString;
		var newArrayTable = [];
		if(argTable.length > 0){
			for (var i in argTable){
				if(this._sqlKeyWord.indexOf(argTable[i].toLowerCase().trim()) == -1){
					tableString = argTable[i].ReplaceAll("````","`");
					tableString = tableString.ReplaceAll("```","`");
					tableString = tableString.ReplaceAll("``","`");
					tableString = "`"+tableString+"`";
					newArrayTable.push(tableString);
				}else{
					newArrayTable.push(argTable[i]);
				}
			}
		}
		newTable  = newArrayTable.join(" ");
		var argOn = [];
        if(typeof $ondata == "object"){
	        var KeyString1,KeyString2 ;
			for (var i in $ondata){
				KeyString1 = i.ReplaceAll("````","`");
				KeyString1 = KeyString1.ReplaceAll("```","`");
				KeyString1 = KeyString1.ReplaceAll("``","`");
				KeyString1 = "`"+KeyString1+"`";
				KeyString1 = KeyString1.ReplaceAll(".","`.`");
				KeyString2 = i.ReplaceAll("````","`");
				KeyString2 = KeyString2.ReplaceAll("```","`");
				KeyString2 = KeyString2.ReplaceAll("``","`");
				KeyString2 = "`"+KeyString2+"`";
				KeyString2 = KeyString2.ReplaceAll(".","`.`");		
				argOn.push(KeyString1 + " = " + KeyString2)
			}
		}
		else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to must be an object"});
			return false;
		}
		var newOn = "";
		$ondata   = $ondata.ReplaceAll("="," = ");
		var argOn = $ondata.split(" ");
		argOn = cleanEmtyItemArray(argOn,"");
		var OnString;
		var newArrayOn = [];
		if(argOn.length > 0){
			for (var i in argOn){
				if(this._sqlKeyWord.indexOf(argOn[i].toLowerCase().trim()) == -1){
					OnString = argOn[i].ReplaceAll("````","`");
					OnString = OnString.ReplaceAll("```","`");
					OnString = OnString.ReplaceAll("``","`");
					OnString = "`"+OnString+"`";
					OnString = OnString.ReplaceAll(".","`.`");
					newArrayOn.push(OnString);
				}else{
					newArrayOn.push(argOn[i]);
				}
			}
		}
		newON = newArrayOn.join(" ");
		this._relationship.push("INNER JOIN " + newTable + " ON " + newON);
		return this;
	}
	this.where = function($where){
		if(typeof $where == "object"){
			var ValueString,KeyString ;
			for (var i in $where){
				if($where[i] == null){
					$where[i] = "NULL";
				}else{
					if( isNaN($where[i]) == true )
						ValueString = "'" + $where[i] + "'";
					else
						ValueString = $where[i];	
				}
				if(ValueString.trim() == '')
					ValueString = "''";
				KeyString = i.join("`,`");
				KeyString = KeyString.ReplaceAll("````","`");
				KeyString = KeyString.ReplaceAll("```","`");
				KeyString = KeyString.ReplaceAll("``","`");
				KeyString = "`"+KeyString+"`";
				KeyString = KeyString.ReplaceAll(".","`.`");	
				this._where.push("AND " + KeyString + " = " + ValueString);
			}
			return this;
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to must be an object"});
			return false;
		}
		
	}
	this.where_or = function($where){
		if(typeof $where == "object"){
			var ValueString = "";
			var keyString = "";
			for(var i in $where){
				if(typeof(i) === "string"){
					keyString = i.ReplaceAll("````","`");
					keyString = keyString.ReplaceAll("```","`");
					keyString = keyString.ReplaceAll("``","`");
					keyString = "`"+keyString+"`";
					keyString = keyString.ReplaceAll(".","`.`");
					if($where[i] == null) $where[i] = "null";
					if( isNaN($where[i]) == true )
						ValueString = "'" + $where[i] + "'";
					else
						ValueString = $where[i];
					this._where.push("OR " + keyString + " " + ValueString);
				}	
			}
			return this;
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to must be an object"});
			return false;
		}
	}
	this.where_in = function($columns,$data){
		var StringIN = "";
		var data     = [];
		var ValueString;
		if(typeof $where === "object"){
			for(var i in $data){
				if( isNaN($data[i]) == true )
					ValueString = "'" + $data[i] + "'";
				else
					ValueString = $data[i];
				data.push(ValueString);	
			}
			StringIN  = data.join(",");
			keyString = $columns.ReplaceAll("````","`");
			keyString = keyString.ReplaceAll("```","`");
			keyString = keyString.ReplaceAll("``","`");
			keyString = "`"+keyString+"`";
			keyString = keyString.ReplaceAll(".","`.`");
			this._where.push("AND " + keyString + " IN ( " + StringIN + " )");
			return this;
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent where_in to must be an object"});
			return false;
		}
	}
	this.where_not_in = function($columns,$data){
		var string = "";
		var data  = [];
		var ValueString;
		if(typeof $where == "object"){
			for(var i in $data){
				if( isNaN($data[i]) == true )
					ValueString = "'" + $data[i].trim() + "'";
				else
					ValueString = $data[i].trim();
				data.push(ValueString);	
			}
			string = data.join(",");
			var keyString = $columns.ReplaceAll("````","`");
			keyString = keyString.ReplaceAll("```","`");
			keyString = keyString.ReplaceAll("``","`");
			keyString = "`"+keyString+"`";
			keyString = keyString.ReplaceAll(".","`.`");
			this._where.push("AND " + $columns + " NOT IN ( " + string + " )");	
			return this;
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to must be an object"});
			return false;
		}
	}
	this.start_group = function(){
		this._where.push("(");
		return this;
	}
	this.end_group = function(){
		this._where.push(")");
		return this;
	}
	this.limit = function($offset,$limit){
		this.limit = " LIMIT " + $offset + " , " + $limit ;
		return this;
	}
	this.order_by = function ($order = {}){
		if(typeof $order == "object"){
			var keyString;
			for(var i in $order){
				if(typeof(i) === "string"){
					keyString = i.ReplaceAll("````","`");
					keyString = keyString.ReplaceAll("```","`");
					keyString = keyString.ReplaceAll("``","`");
					keyString = "`"+keyString+"`";
					keyString = keyString.ReplaceAll(".","`.`");
					this._order.push(keyString + " " +$order[i].trim());
				}	
			}	
			return this;
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to must be an object"});
			return false;
		}
	}
	this.group_by = function ($columns){
		if(typeof $columns == "object"){
			var keyString;
			for(var i in $columns){
				keyString = i.ReplaceAll("````","`");
				keyString = keyString.ReplaceAll("```","`");
				keyString = keyString.ReplaceAll("``","`");
				keyString = "`"+keyString+"`";
				keyString = keyString.ReplaceAll(".","`.`");
				this._group.push(keyString);	
			}	
			return this;
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to group by must be an object"});
			return false;
		}
	}
	
	this.printsql = function(){
		return sqlPrint;
	}
	this.update = function($table = null ,$data = {},$where = null,$callback = null){
		if(typeof($table) === "string" && typeof($data) === "object"){
			try{
				var argUpdate = []; 
				var keyString = "";
				for(var i in $data){
					if(typeof(i) === "string"){
						keyString = i.ReplaceAll("````","`");
						keyString = keyString.ReplaceAll("```","`");
						keyString = keyString.ReplaceAll("``","`");
						keyString = "`"+keyString+"`";
						argUpdate.push(i);
						if(Number($data[i]) !== 'NaN')
						 	argUpdate.push("'"+$data [i]+"',");
						else
							argUpdate.push($data[i] + ",");
					}	
				}
				argUpdate = argUpdate.join(" = ");
				argUpdate = argUpdate + ",";
				argUpdate = argUpdate.ReplaceAll(",,","");
				$table = $table.ReplaceAll("````","`");
				$table = $table.ReplaceAll("```","`");
				$table = $table.ReplaceAll("``","`");
				$table = "`"+ $table +"`";
				var stringWhere = "";
			    sql = "UPDATE FROM "+$table+" " + argUpdate;
				var argWhere = []; 
				if(typeof($where) === "object"){
					var stringValue;
					for (var i in $where){
						keyString = i.ReplaceAll("````","`");
						keyString = keyString.ReplaceAll("```","`");
						keyString = keyString.ReplaceAll("``","`");
						keyString = "`"+keyString+"`";
						if(Number($where[i]) !== 'NaN')
					 		stringValue = ("'"+$where[i]+"'");
						else
							stringValue = ($where[i]);
					    argWhere.push(keyString + " = " + stringValue);

					}
				}else{
					_Controller.info.error.push({detail:"" ,message : "The data where to must be an object"});
					return false;
				}
				stringWhere = argWhere.join(" AND ");
				sql +=" " + stringWhere;
				this.connection.query(sql,function(err,result){
					if (err) 
						_Controller.info.error.push({detail:err ,message : err.sqlMessage});
					else{
						if(typeof $callback == "function" ){
							$callback (result);
						}
					}		
				});
				sqlPrint += sql + "<br/>";
				return this;
			}catch (e){
				if (e instanceof SyntaxError) _Controller.info.error.push({detail:e ,message : e.message});
				else _Controller.info.error.push({detail:e ,message : e});
			}
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to must be an object"});
			return false;
		}		
	}
	this.delete = function($table,$where){
		var sql = "DELETE FROM "+$table; 
		if($where != null){
			sql+ " WHERE ";
			i = 1;
			var lengthArg = $where.length;
			for(var key in $where){
				if( isNaN($where[key]) == true ) $where[key] = "'" + $where[key].trim() + "'";
				else $where[key] = $where[key].trim();
				if(lengthArg < i) sql += key + " = " + $where[key] + " AND ";
				else sql += key + " = " + $where[key];
				i++;
			}
			try{
				this.connection.query(sql);
				sqlPrint += sql + "<br/>";
				return this;
			}catch (e){
				if (e instanceof SyntaxError) _Controller.info.error.push({detail:e ,message : e.message});
				else _Controller.info.error.push({detail:e ,message : e});
			}
		}
	}
	this.insert = function($table,$data,$callback){
		if(typeof($data) === "object"){
			var argcolum = []; 
			var argvalue = [];
			for(var i in $data){
				if(typeof(i) === "string"){
					argcolum.push(i);
					if(Number($data[i]) !== 'NaN')
					 	argvalue.push("'"+$data [i]+"'");
					else
						argvalue.push($data[i]);
				}	
			}
			argvalue = argvalue.join(",");
			argcolum = argcolum.join("`,`");
			argcolum = argcolum.ReplaceAll("````","`");
			argcolum = argcolum.ReplaceAll("```","`");
			argcolum = argcolum.ReplaceAll("``","`");
			argcolum = "`"+argcolum+"`";
			argcolum = "(" + argcolum + ")";
			argvalue = "(" + argvalue + ")";
			$table = $table.ReplaceAll("````","`");
			$table = $table.ReplaceAll("```","`");
			$table = $table.ReplaceAll("``","`");
			$table = "`"+ $table +"`";
			sql  = 'INSERT INTO '+ $table + " " + argcolum + " VALUE "+ argvalue;
			try{
				this.connection.query(sql, function(err, result) {
				  	if (err) 
						_Controller.info.error.push({detail:err ,message : err.sqlMessage});
					else{
						if(typeof $callback == "function" ){
							$callback (result);
						}
					}
				});
				sqlPrint += sql + "<br/>";
				return this;
			}catch (e){
				if (e instanceof SyntaxError) _Controller.info.error.push({detail:e ,message : e.message});
				else _Controller.info.error.push({detail:e ,message : e});
			}
			
		}else {
			_Controller.info.error.push({detail:"" ,message : "The data sent to must be an object"});
		}
	}
	this.sql = function($sql){
		
	}
	this.endConnect = function(){
		this._rows    	   = [];
		this._sql     	   = "";
		this._table   	   = null;
		this._columns 	   = [];
		this._limit        = [];
		this._order        = [];
		this._group        = [];
		this._relationship = [];
		this._where        = [];
	}
	this.getInfo = function(){
	}
	this.get = function($model,$type,$callback){
		if($model._table != null){
			this.from($model._table);
			if(ObjectLength($model._selects) > 0) this.select($model._selects);
			if(ObjectLength($model._where) > 0) this.where($model._where);
			if(ObjectLength($model._joins) > 0) this.join($model._joins);
			if($model._limit != null) this.limit($model._limit);
			if(ObjectLength($model._order) > 0) this.order_by($model._order);
			if(ObjectLength($model._group) > 0) this.group_by($model._group);
			var StringSelect = (this._columns.length > 0) ? " " + this._columns.join(" , ") : ""; 
			var StringJoin   = (this._relationship.length > 0) ? " " + this._relationship.join(" ") : "";
			var StringWhere  = (this._where.length > 0) ? " WHERE " + this._where.join(" ") : "";
			var StringGroup  = (this._group.length > 0) ? " GROUP BY " + this._group.join(" , ") : "";
			var StringOrder  = (this._order.length > 0) ? " ORDER BY " + this._order.join(" , ") : "";
			this.sql = "SELECT " + StringSelect + StringSelect + StringJoin + StringWhere + StringGroup + StringOrder + this._limit;
			console.log(sql);
			//return false;
			//var options = {sql: sql, nesttables: false};
			try { 
				this.connection.query(options,function(err, rows, fields){
					if (err) 
						_Controller.info.error.push({detail:err ,message : err.sqlMessage});
					else
						if(typeof $callback == "function" ){
							$callback(rows, fields);
						}	
					_Controller.endwait();
				});
			}catch (e){
				if (e instanceof SyntaxError) _Controller.info.error.push({detail:e ,message : e.message});
				else _Controller.info.error.push({detail:e ,message : e});
				_Controller.endwait();
			}
		} 
		
		sqlPrint	    += (sql+ " <br/>");	
		sql     		= "";
		table   		= null;
	    columns 		= "*";
		limit           = "";
		relationship 	= [];
		condition 		= [];
	}
}
module.exports = driverMysql;
