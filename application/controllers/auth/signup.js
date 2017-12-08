function signup (){
	this.index = function(){
		this.data.title = "Phoenix | Signup";
		this.load.view("frontend/auth/index.html",this.data);
	}
	this.save = function(){
		console.log(this.input.post());
		console.log(this.input.file());
	}
}
module.exports = signup;

