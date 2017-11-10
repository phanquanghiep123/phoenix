_Controller.home = {
	__construct : function(){
		
	},
	index : function(a,b){
		this.load.view("home",{a:a,b:b});
	},
	hello : function(a){
		write(a);
		this.response.end();
	},
	__destructors : function(){
		//console.log("0");
	}
}