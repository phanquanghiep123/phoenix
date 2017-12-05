function MyController (){
	this.data = {};
	this.construct = function(){
		this.data.abc = 1;
	}
}
module.exports = MyController;