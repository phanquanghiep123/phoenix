_Controller.home = {
	__construct : function(){
		
	},
	index : function(a = 1,b =3){
		console.log("11");
		this.load.view("home.html",{a:a,b:b});
		this.response.end();
	},
	hello : function(a){
		write(a);
		this.response.end();
	},
	__destructors : function(){
		//console.log("0");
	}
}