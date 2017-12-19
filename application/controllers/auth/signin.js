function signin(argument) {
	this.extent = MyController;
	this.index  = function(){
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
			this.users.where([["email","=",email],["password","=",password]]).callback(function(){
				if(this.id != 0){
					that.session.add("Auth",this);
				}
				else {

				}
			}).record();
		}else{
			that.session.addflag ("error",$check.errors);
			redirect(route("auth.signin"))
		}
	}
}
module.exports = signin;