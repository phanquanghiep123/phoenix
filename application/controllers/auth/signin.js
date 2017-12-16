function signin(argument) {
	this.extent = MyController;
	this.index  = function(){
		var users            = this.load.model("users");
		var products         = this.load.model("products");
		var categories       = this.load.model("categories");
		var product_category = this.load.model("product_category");
		var metas            = this.load.model("metas");
		users.leftjoin(products.wherein("id",[1,2,3,4,5,67,8,9]),["products.user_id","=","users.i"])
		users.callback(function(){
			console.log(this);
		}).result();
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