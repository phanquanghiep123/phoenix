_Controller.home = {
	__construct : function(){
		
	},
	index : function(a,b){
		this.load.model("members");
		this.members.db.from("members");
		this.members.db.get(function(error,rows,fidel){
			console.log(error);
		});
		//console.log(this.members);
	},
	hello : function(a){
		write(a);
		this.response.end();
	},
	__destructors : function(){
		//console.log("0");
	}
}