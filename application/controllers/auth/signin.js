function signin(argument) {
	this.extent = MyController;
	this.index  = function(){
		var users            = this.load.model("users");
		var products         = this.load.model("products");
		var categories       = this.load.model("categories");
		var product_category = this.load.model("product_category");
		var metas            = this.load.model("metas");
		users.as("tbl1");
		products.as("tbl2");
		categories.as("tbl3");
		product_category.as("tbl4");
		users.select(["tbl1.*","tbl2.name AS products_name","tbl2.id AS product_id"]).innerjoin(products,["tbl2.user_id","=","tbl1.id"]).limit(100,0);
		categories.select(["tbl3.*","tbl4.product_id"]).innerjoin(product_category,["tbl3.id","=","tbl4.category_id"]);
		categories
		.where([["id","=","6"],["id","=","6"]])
	    .where(["id","=","6"])
	    .where(["id","=","6"])
		.select(["tbl1.*"])
		.innerjoin(users,["tbl1.product_id","=","tbl4.product_id"])
		.callback(function(){
			//console.log(this);
		}).result();
		return false;
		products.select(["tbl2.id","tbl2.name","tbl2.user_id"]).as("tbl2");
		product_category.as("tbl3").select(["tbl3.product_id","tbl3.category_id"]);
		var ct = users.convert(products).select(["tbl2.*"]).as("tbl1").
		rightjoin(products,["tbl2.user_id","=","tbl1.id"]).
		leftjoin(product_category,["tbl3.product_id","=","tbl2.id"]).
		leftjoin(categories.as("tbl4"),["tbl4.id","=","tbl3.category_id"]).
		where([["tbl4.name","is not",null]]).groupby(["tbl4.id"])
		console.log(users.reader());
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