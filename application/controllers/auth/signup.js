function signup (){
	this.index = function(){
		this.data.title = "Phoenix | Signup";
		this.load.view("frontend/auth/index.html",this.data);
	}
	this.save = function (){
		this.validate.addmessge({
			email    : "Vui lòng nhập {$1} là email",
			number   : "Hãy nhập {$1} là số",
			required : "Hãy nhập {$1} không được rổng",
			mintext  : "Vui lòng nhập {$1} ít nhất {$2} ký tự",
			maxtext  : "Vui lòng nhập {$1} tối đa {$2} ký tự",
			date     : "Hãy nhập {$1} là ngày",
			mindate  : "Hãy nhập {$1} ít nhất {$2} ngày",
			maxdate  : "Hãy nhập {$1} tối đa {$2} ngày",
			minnumber: "Vui lòng nhập {$1} lớn hơn {$2}",
			maxnumber: "Hãy nhập {$1} ít hơn {$2}",
			same     : "Hãy nhập {$1} giống như {$2}",
			phone    : "Hãy nhập {$1} là số điện thoại",
			url      : "Hãy nhập {$1} một url",
		});

		this.validate.confirm_password = this.confirm_password;
		$check = this.validate.check(this.input.post(),{
			"full_name"         : {validate : "required",label : "Full name"},
			"you_email"         : {validate : "required|email",label : "Email"},
			"password"          : {validate : "required|mintext:6",label : "Password"},
			"confirm_password"  : {validate : "confirm_password",label : "Confirm password"}
		});
		if($check.validate == true){
			var data = {
				full_name : this.input.post("full_name"),
				email     : this.input.post("you_email"),
				password  : this.input.post("password"),
			}
			this.load.model("users");
			this.users.insert(data) ;
		}
		
		
	}
	this.confirm_password = function($value){
		this.messges.confirm_password = "Vui lòng nhập {$1} giống với password";
		if($value.trim() != "" && $value != null){
			return ($value.trim() == this.input.post("password").trim());
		}
		return true;	
	}
}
module.exports = signup;

