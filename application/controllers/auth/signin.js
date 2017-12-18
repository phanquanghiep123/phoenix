function signin(argument) {
	this.extent = MyController;
	this.index  = function(){
		var that             = this;
		return that.load.view("frontend/auth/signin.html",that.data);
		var users            = this.load.model("users");
		var products         = this.load.model("products");
		var categories       = this.load.model("categories");
		var product_category = this.load.model("product_category");
		var metas            = this.load.model("metas");
		users.as("tbl1")
		.start_group()
			.where_in("tbl1.id",[1,2,4])
			.where(["tbl1.id","=",100])
		.end_group()
		.where_not_in("tbl1.id",[1])
		.where_or(["tbl1.id","=",12])
		.callback(function(){
			products.as("tbl2").select("tbl2.id,tbl2.user_id,tbl2.name");
			this.select(["tbl2.*"]).convert(products).left_join(products,["tbl2.user_id","=","tbl1.id"]).callback(function(){
				this.select(["name"]).callback(function(){
					this.callback(function(){
						
					}).find(5);
				}).results();
			}).results();
		}).results();
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