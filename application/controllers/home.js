_Controller.home = {
	__construct : function(){
		
	},
	index : function(a = 1,b =3){
		var that = this;
		that.load.model("members");
		that.members.getall(function(e,r,f){
			that.load.view("home.html",{members:r,a:a,b:b});
			that.end();
		});

	},
	hello : function(a){
		write(a);
		this.end();
	},
	__destructors : function(){
		//console.log("0");
	}
}