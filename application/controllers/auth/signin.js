function signin(argument) {
	this.extent = MyController;
	this.index  = function(){
		var that = this;
		this.data.title = "Phoneix | Signin";
		return this.load.view("frontend/auth/signin.html",this.data);
	}
	this.save = function(){ 
		var that = this;
		$check = this.validate.check(this.input.post(),{
			"you_email"         : {validate : "required|email",label : "Email"},
			"password"          : {validate : "required|mintext:6",label : "Password"},		
		});
		if($check.validate == true){
			var email = that.input.post("you_email"); 
			var password = that.input.post("password");
			this.load.model("users");
			var users = this.users;
			users.where([["email","=",email],["password","=",password]]).callback(function(){
				if(this.id != 0){
					that.session.add("Auth",this);
					return that.redirect(route("home.index"));
				}
				else {
					that.session.addflash("error","Email or password not match!");
					return that.redirect(route("auth.signin"));
				}
			}).record();
		}else{
			return this.redirect(route("auth.signin"));
		}
	}
}
module.exports = signin;