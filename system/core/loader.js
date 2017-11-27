function Loader(argument) {
	this.model = function($file){
		try {
			_Controller.info.model.push({file : $file});
			var model = require(_F_models + $file );
			_Model.init($file);
			_Controller[_Controller.info.controller][$file]= _Model[$file];
		}catch (e){
			if (e instanceof SyntaxError) _Controller.info.error.push({detail:e ,message : e.message});
			else _Controller.info.error.push({detail:e ,message : e});
		}
		return true;
		
	}
	this.view  = function( $file = "", $data = {}, $return = false){
		_Controller.wait(false);
		try {
			var dataload = {file : $file,data : $data, return : $return};
			_Controller.info.view.push(dataload);
			var view = _Phoenix.loadview($file, $data, $return);
			_Controller.endwait(true);
			if($return) return view;
			else write(view);
		}catch (e){
			if (e instanceof SyntaxError) _Controller.info.error.push({detail:e ,message : e.message});
			else _Controller.info.error.push({detail:e ,message : e});
			_Controller.endwait(true);
		}
		return true;
	}
	this.helper = function (){
		_Controller.next;
	}
}
module.exports = Loader;