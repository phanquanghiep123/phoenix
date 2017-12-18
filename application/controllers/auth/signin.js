function signin(argument) {
	this.extent = MyController;
	this.index  = function(){
		var that = this;
		return that.load.view("frontend/auth/signin.html",that.data);
	}
	this.addsample = function(){
		var users = this.load.model("users");
		var products         = this.load.model("products");
		var categories       = this.load.model("categories");
		var product_category = this.load.model("product_category");
		for (var i = 0; i <= 100; i++) {
			var nu = users.addnew();
			nu.full_name = RamdonString();
			nu.email     = RamdonString();
			nu.password  = RamdonString();
			nu.callback(function(){
				var u = this; 
				for (var ii = 0; ii <= 3; ii++) {
					var nc  = categories.addnew();
					nc.name = RamdonString();
					nc.callback(function(){
						var c = this;
						for (var iii = 0; iii <= 10; iii++) {
							var np  = products.addnew();
							np.name = RamdonString();
							np.user_id = u.id;
							np.callback(function(){
								var npc = product_category.addnew();
								npc.product_id = this.id;
								npc.category_id = c.id;
								npc.callback(function(){
									console.log(this);
								}).save();
							}).save();
						}
					}).save(); 
				}	
			}).save();
		}
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
				if(this.id != 0)
					Redirect("/home");
				else
					console.log(this);
			}).record();
		}else{
			console.log($check);
		}
	}
}
module.exports = signin;