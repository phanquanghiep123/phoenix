function driverMysql($SeverInfo){
    const _mysql      = require('mysql');
	const _connection = _mysql.createConnection($SeverInfo);
	this._table       = null;
	this._columns     = [];
    this._joins       = [];
    this._order       = [];
    this._where       = [];
    this._group       = [];
	const init = function(){
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
	}
	this.from = function($table = null){
		var argTable    = $table.split(" ");
		argTable        = cleanEmtyItemArray(argTable,"");
		var newargTable = [];
		for (var i in argTable){
			newargTable.push(replacecolum(argTable[i]));
		}
		this._table = newargTable.join(" ");
	}
	this.select = function($data = []){
		var selectString ;
		if(typeof $data == "object"){
			for (var i in $data){
				selectString = replacecolum($data[i]);
				this._columns.push(selectString);
			}
			return this;
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to select must be an object"});
			return false;
		}
	}
	this.join = function ($data = {}){
		var joinType = ["INNER","LEFT","RIGHT"];
		var table = replacecolum($data.table);
		var on = (typeof $data.on == "object") ? $data.on : null;
		var and = (typeof $data.and == "object") ? $data.and : null;
		var stringOn = "";
		var argOn    = [];
		var argAnd   = [];
		if(on != null){
			for(var i in on){
				argOn.push(replacecolum(on[i]));
			}
		}
		if(and != null){
			for(var i in and){
				argAnd.push(replacecolum(and[i][0]));
				argAnd.push(replacecolum(and[i][1]));
				argAnd.push(replacevalue(and[i][2]));
			}
		}
		
	}
	this.get = function($model = {},$type = 0 ,$callback = null){
		if($model.table != null){
			this.from($model.table);
			this.select($model._selects);
			if($model._joins.length > 0){
				for(var i in $model._joins){
					this.join($model._joins[i]);
				}
			}
			return false;
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
	}
	const replacecolum  = function($column = null){
		console.log($column);
		return $column;
		const _sqlKeyWord  = ["%","=","*","/","+","-","like","in","not","or","on","and","left","end","as","right","inner"];
		var argString = $column.split(" ");
		argString     = cleanEmtyItemArray(argString);
		var keyString = "";
		var argNew    = [];
		var columString = "";
		for (var i in argString){
			columString = argString[i];
			if(_sqlKeyWord.indexOf(argString[i].toLowerCase().trim()) == -1){
				columString  = columString.ReplaceAll("```","`");
				columString  = columString.ReplaceAll("[","`");
				columString  = columString.ReplaceAll("]","`");
				columString  = columString.ReplaceAll("``","`");
				columString  = "`"+columString+"`";
				columString  = columString.ReplaceAll(".","`.`");
			}
			argNew.push(columString);
		}
		return 	argNew.join(" ");
	}
	const replacevalue = function($value = null){
		var valueString
		if($value == null) return "NULL";
		if(Number($value) !== 'NaN')
		 	valueString = ("'"+$data [i]+"'");
		else
			valueString = ($data[i]);
	    valueString  = valueString.ReplaceAll("'[","`");
		valueString  = valueString.ReplaceAll("]'","`");
		return 	valueString;
	}
	init();
}
module.exports = driverMysql;
