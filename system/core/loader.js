function Loader() {
	this.model = function($file){
		try {
			_Phoenix.phoenix_info.model.push({file : $file});
			var _model  = require(_F_models + $file );
            var model   = new _model();
            var PModel  = new _Autoload.model();
            var Megge   = new Object;
            for (var i in PModel){
            	Megge[i] = PModel[i];
            }
            for (var i in model){
            	Megge[i] = model[i];
            }
            Megge.phoenix_name = $file;
            _Phoenix[$file] = Megge;
            var check = _Phoenix[$file].__construct();
            if(check == true)
            	return _Phoenix[$file];
        	else return false;
		}catch (e){
			if (e instanceof SyntaxError) _Phoenix.phoenix_info.error.push({detail:e ,message : e.message});
			else _Phoenix.phoenix_info.error.push({detail:e ,message : e});
		}
	}
	this.view = function( $file = "", $data = {}, $return = false){
		var view = _Phoenix.phoenix_loadview($file, $data, $return);
		_Phoenix.phoenix_info.view.push({type: "file" ,file : $file , data : $data });
		if( $return == true) view;
		return true;
	}
	this.db = function(){
		var _load   =  require("./loader.js");
		_Phoenix.db = new _load();
		return _Phoenix.db;
	}
	this.form = function(){
		var _form     =  require("./form.js");
		_Phoenix.form = new _form();
		return _Phoenix.form;
	}
	this.validate = function(){
		var _validate     =  require("./validate.js");
		_Phoenix.validate = new _validate();
		return _Phoenix.validate;
	}
	this.input = function(){
	    var _input      = require("./input.js");
	    _Phoenix.input  = new _input();
		return _Phoenix.input;
	}
}
module.exports = Loader;