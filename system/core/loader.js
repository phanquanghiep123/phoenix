function Loader(argument) {
	this.model = function($file){
		_Controller.info.model.push({file : $file});
		var model = require(_F_models + $file );
		_Model.init($file);
		_Controller[_Controller.info.controller][$file]= _Model[$file];
	}
	this.views = [];
	this.view  = function( $file = "", $data = {}, $return = false){
		if($return === false){
			this.views.push({file:$file, data:$data });
		    return true;
		}
		else
		{
			var view = _Phoenix.loadview($file, $data, $return);
			return view;
		}	
	}
	this.sentView = function ($file = "", $data = {}){
		var view = _Phoenix.loadview($file, $data, false);
		write(view);
	}
	this.helper = function (){
		_Controller.next;
	}
}
module.exports = Loader;