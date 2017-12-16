function signin(argument) {
	this.extent = MyController;
	this.index  = function(){
		this.load.model("users");
		this.load.model("products");
		this.load.model("categories");
		this.load.model("product_category");
		var categories = this.product_category;
		console.log(categories);

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