function Controller() {
	this.init = function($object){
		var that  = this[$object];
		var _this = this;
		delete _this[$object];
		this[$object] = Object.assign(_this,that);
		return this[$object];
	}
}
module.exports = Controller;