function signin(argument) {
	this.extent = MyController;
	this.index  = function(){
		var that = this;
		this.data.title = "Phoenix | Signin";
	    this.load.model("users");
	    var user = this.users.addnew();
	    user.email = "jkhjkjhhjk";
	    user.full_name ="jklkjljklkj";
	    user.password  = "sdfsdfdsf";
		user.callback = function(r){
			this.save();
		}
		user.find(1);
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