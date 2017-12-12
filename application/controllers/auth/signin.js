function signin(argument) {
	this.extent   = MyController;
	this.index = function(){
		var user = this.load.model("users");
		var a = user.leftjoin("abc",[["id","=","user.id"]]).
		rightjoin("abc",[["id","=","user.id"]]).
		select(["id AS abc","full_name AS v","sbv.ưsđ","sdf.asd"]).
		innerjoin("abc",[["id","=","user.id"]]).
		record();
		this.data.title = "Phoenix | Signin";
		return this.load.view("frontend/auth/signin.html");
	}
	this.save = function(){
		$check = this.validate.check(this.input.post(),{
			"you_email"         : {validate : "required|email",label : "Email"},
			"password"          : {validate : "required|mintext:6",label : "Password"},		
		});
		if($check.validate == true){
			var where = {
				email     : this.input.post("you_email"),
				password  : this.input.post("password"),
			}
			this.load.model("users");
			this.users.checkUser(where,function(r,f){
				console.log(r);
			});
		}else{
			console.log($check);
		}
	}
}
module.exports = signin;