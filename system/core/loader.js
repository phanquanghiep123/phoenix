function Loader(argument) {
	this.model = function($file){
		_Controller.info.model.push({file : $file});
		var model = require(_F_models + $file );
		_Model.init($file);
		_Controller[_Controller.info.controller][$file]= _Model[$file];
	}
	this.view = function( $file = "", $data = {}, $return = false){
		var dataload = {file : $file,data : $data, return : $return};
		_Controller.info.view.push(dataload);
		var view = _Phoenix.loadview($file, $data, $return);
		if($return) return view;
		else write(view);
	}
	this.helper = function (){
		_Controller.next;
	}
}
module.exports = Loader;