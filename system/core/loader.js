function Loader() {
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
		var view = _Phoenix.loadview($file, $data, $return);
		if($return === false)
			write(view);
		else 
			return view;	
	}
	this.viewToview  = function($file = "", $data = {}){
		var view = _Phoenix.loadview($file, $data);
		return view;	
	}
	this.helper = function (){
		_Controller.next;
	}
}
module.exports = Loader;