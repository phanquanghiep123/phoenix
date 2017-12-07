function Loader() {
	this.model = function($file){
		try {
			_Controller.info.model.push({file : $file});
			var model = require(_F_models + $file );
			_Model.init($file);
			_Controller[_Controller.info.controller][$file]= _Model[$file];
		}catch (e){
			if (e instanceof SyntaxError) _Phoenix.info.error.push({detail:e ,message : e.message});
			else _Phoenix.info.error.push({detail:e ,message : e});
		}
		return true;
		
	}
	this.view  = function( $file = "", $data = {}, $return = false){
		_Phoenix.info.view.push({file : $file});
		try {
			var view = _Phoenix.loadview($file, $data, $return);
			if($return === false){
				if(Object.keys(_Phoenix.info.error).length == 0 ){
					write(view);
				}
			}
			else 
				return view;
		}catch (e){
			if (e instanceof SyntaxError) _Controller.info.error.push({detail:e ,message : e.message});
			else _Controller.info.error.push({detail:e ,message : e});
		}	
	}
}
module.exports = Loader;