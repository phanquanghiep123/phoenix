function Loader() {
	this.model = function($file){
		try {
			_Controller.info.model.push({file : $file});
			var _model = require(_F_models + $file );
            var model  = new _model();
            var PModel = new _Autoload.model();
            model      = Object.assign(PModel,model);
            _Controller[$file] = model;
            var check = model.__construct();
            if(check == true)
            	return model;
        	else return false;

		}catch (e){
			if (e instanceof SyntaxError) _Phoenix.info.error.push({detail:e ,message : e.message});
			else _Phoenix.info.error.push({detail:e ,message : e});
		}
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