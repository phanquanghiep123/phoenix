function signup (){
	this.index = function(){
		this.data.title = "Phoenix | Signup";
		this.load.view("frontend/auth/index.html",this.data);
	}
}
module.exports = signup;

