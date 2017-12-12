function signin(argument) {
	this.extent = MyController;
	this.index  = function(){
		var that = this;
		this.data.title = "Phoenix | Signin";
		this.load.model("users");
		this.users.id = 1;
		this.users.email = "phanquanghiep@gmail.com";
		this.users.full_name = "phanquanghiep@gmail.com";
		this.users.password = "phanquanghiep@gmail.com";
		this.users.find(1,function(){
			that.users.email = "ghghjghjghjdsdsd";
			that.users.save();
		});
		this.users.result(function(users){
			return that.load.view("frontend/auth/signin.html",that.data);
		});
		
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