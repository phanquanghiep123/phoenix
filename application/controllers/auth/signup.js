function signup (){
	this.extent = MyController;
	this.index  = function(){
		this.data.title = "Phoenix | Signup";
		return this.load.view("frontend/auth/signup.html",this.data);
	}
	this.save = function (){
		var $file = this.input.file("avatar");
		this.load.upload();
		var config = {
			path :  _Path + '/uploads/',
			extension : ["png","jpg"],
			name: "phanquanghiep"
		}
		this.upload.setconfig(config);
		var a = this.upload.save($file);
		console.log(a);
	    return false;
		/*var that = this;
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
<<<<<<< HEAD
			var user = this.load.model("users").addnew();
			
			/*var tp = _Path + '/uploads/'+$file.name;
		    _Fs.readFile($file.path, function (err, data) {
	            console.log('File read!');
	            // Write the file
	            _Fs.writeFile(tp, data, function (err) {  
	                console.log('File written!');
	            });
	            // Delete the file
	            _Fs.unlink($file.path, function (err) {
	                console.log('File deleted!');
	            });
	        });

			return false;
=======
			this.load.model("users");
			var user = this.users;
>>>>>>> 13c0ec3433e4f0e97476fb000642c05f8c3bc0fe
			user.where(["email","=",email]).callback(function(){

				if(this.id == 0){
					this.email     = email;
					this.password  = password;
					this.full_name = full_name;
					this.callback(function(){
						that.session.add("Auth",this);
						return that.redirect(route("home.index"));
					}).save();
<<<<<<< HEAD
					that.session.addflash("error","Create new account success Please login!");
					return that.redirect(route("auth.signin"));
=======
>>>>>>> 13c0ec3433e4f0e97476fb000642c05f8c3bc0fe
				}else{
					that.validate.adderror("you_email","this Email is been exists!");
					return that.redirect(route("auth.signup"));
				}
			}).record();
		}else{
			return this.redirect(route("auth.signup"));
		}*/
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

