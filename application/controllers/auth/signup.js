function signup (){
	this.extent = MyController;
	this.index  = function(){
		this.data.title = "Phoenix | Signup";
		return this.load.view("frontend/auth/signup.html",this.data);
	}
	this.save = function (){
		var that = this;
		this.validate.confirm_password = this.confirm_password;
		$check = this.validate.check(this.input.post(),{
			"full_name"         : {validate : "required",label : "Full name",messges : {required :"{$1} phải dc nhập"}},
			"you_email"         : {validate : "required|email",label : "Email"},
			"password"          : {validate : "required|mintext:6",label : "Password"},
			"confirm_password"  : {validate : "confirm_password",label : "Confirm password"}
		});
		if($check.validate == true){
			var full_name = this.input.post("full_name");
			var email     = this.input.post("you_email");
			var password  = this.input.post("password");
			this.load.model("users");
			var user = this.users;
			user.where(["email","=",email]).callback(function(){

				if(this.id == 0){
					this.email     = email;
					this.password  = password;
					this.full_name = full_name;
					this.callback(function(){
						that.session.add("Auth",this);
						return that.redirect(route("home.index"));
					}).save();
				}else{
					that.validate.adderror("you_email","this Email is been exists!");
					return that.redirect(route("auth.signup"));
				}
			}).record();
		}else{
			return this.redirect(route("auth.signup"));
		}
	}
	this.confirm_password = function($value){
		this.messges.confirm_password = "Please enter the same {$1} as Password";
		if($value.trim() != "" && $value != null){
			return ($value.trim() == this.input.post("password").trim());
		}
		return true;	
	}
}
module.exports = signup;

