function signup (){
	this.index = function(){
		this.data.title = "Phoenix | Signup";
		this.load.view("frontend/auth/index.html",this.data);
	}
<<<<<<< HEAD
	this.save = function(){
		console.log(this.input.post());
		console.log(this.input.file());
=======
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
		console.log($check);
	}
	this.confirm_password = function($value){
		this.messges.confirm_password = "Vui lòng nhập {$1} giống với password";
		if($value.trim() != "" && $value != null){
			return ($value.trim() == this.input.post("password").trim());
		}
		return true;
		
		
>>>>>>> 3eab16cf4d5a1fd8469e3664e9558a6eef84abb0
	}
}
module.exports = signup;

