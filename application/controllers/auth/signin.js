function signin(argument) {
	this.extent = MyController;
	this.index  = function(){
		var users            = this.load.model("users");
		var products         = this.load.model("products");
		var categories       = this.load.model("categories");
		var product_category = this.load.model("product_category");
		var metas            = this.load.model("metas");
		products.select(["tbl2.id","tbl2.name","tbl2.user_id"]).wherein("tbl2.id",[1,2,3,4,5,67,8,9]).as("tbl2");
		product_category.as("tbl3").select(["tbl3.product_id","tbl3.category_id"]);
		users.select(["tbl4.*"]).as("tbl1").
		leftjoin(products,["tbl2.user_id","=","tbl1.id"]).
		leftjoin(product_category,["tbl3.product_id","=","tbl2.id"]).
		leftjoin(categories.as("tbl4"),["tbl4.id","=","tbl3.category_id"]).
		where([["tbl4.name","is not",null]]).groupby(["tbl4.id"])
		.callback(function(){
			console.log(this.list);
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