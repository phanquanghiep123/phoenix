_Controller.home = {
	construct : function(){
		this.load.view("demoview.html");
	},
	demoview : function(){
		this.load.view("demoview.html");
	},
	demomodel: function(){
		var that = this;
		that.load.model("members"); 
		that.members.getall (function(r,f){
			that.load.view("demomodel.html",{members:r});
		});
	},
	destructors : function(){
		this.load.view("demoview.html");
	}

}