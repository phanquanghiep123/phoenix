function driverMysql($SeverInfo){
    const _mysql      = require('mysql');
	const _connection = _mysql.createConnection($SeverInfo);
	this._sqlKeyWord  = ["%","=","*","/","+","-","like","in","not","or","on","and","left","end","as","right","inner"]
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
	this.from = function($table){
		var argTable = $table.split(" ");
		argTable     = cleanEmtyItemArray(argTable,"");
		var newargTable = [];
		for (var i in argTable){
			if(this._sqlKeyWord.indexOf(argTable[i].toLowerCase().trim()) == -1){
				newargTable.push(replacecolum(argTable[i]));
			}else{
				newargTable.push(argTable[i]);
			}
		}
		this._table = newargTable.join(" ");
	}
	this.select = function($data){
		var selectString ;
		if(typeof $data == "object"){
			for (var i in $columns){
				selectString = replacecolum($data[i])
				this._columns.push(selectString);
			}
			return this;
		}else{
			_Controller.info.error.push({detail:"" ,message : "The data sent to select must be an object"});
			return false;
		}
	}
	this.get = function($model,$type,$callback){
		
		if($model.table != null){
			this.from($model.table);
			this.select($model._selects);
			console.log(this._columns);
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
	const replacecolum  = function($column){

		var keyString = $column.ReplaceAll("````","`");
		keyString = keyString.ReplaceAll("```","`");
		keyString = keyString.ReplaceAll("``","`");
		keyString = "`"+keyString+"`";
		keyString = keyString.ReplaceAll(".","`.`");
		return 	keyString;
	}
	const replacevalue = function($value = null){
		var valueString
		if($value == null) return "NULL";
		if(Number($value) !== 'NaN')
		 	valueString = ("'"+$data [i]+"'");
		else
			valueString = ($data[i]);
	
		return 	valueString;
	}
	init();
}
module.exports = driverMysql;
