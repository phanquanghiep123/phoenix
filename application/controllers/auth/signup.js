function signup (){
	this.index = function(){
		this.data.title = "Phoenix | Signup";
		this.load.view("frontend/auth/index.html");
	}
}
module.exports = signup;

