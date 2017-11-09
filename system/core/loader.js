function Loader(argument) {
	this.model = function($file){
		_Controller.wait();
		_Controller.info.model.push({file : $file});
		var model = require(_F_models + $file );
		_Model.init($file);
		_Controller[_Controller.info.controller][$file]= _Model[$file];
		_Controller.endwait();
	}
	this.view = function( $file = "", $data = {}, $return = false){
		_Controller.wait();
		var dataload = {file : $file,data : $data, return : $return};
		_Controller.info.view.push(dataload);
		var view = _Phoenix.loadview($file, $data, $return);
		_Controller.endwait();
		if($return) return view;
		else write(view);
	}
	this.helper = function (){
		_Controller.next;
	}
}
module.exports = Loader;