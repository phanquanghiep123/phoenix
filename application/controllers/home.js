_Controller.home = {
	construct : function(){
		// auto call before.
	},
	demoview : function(){
		this.load.view("demoview.html");
	},
	demomodel: function(){
		var that = this;
		that.load.model("members"); 
		that.members.getall (function(e,r,f){
			that.load.view("demomodel.html",{members:r});
		});
	},
	destructors : function(){
		// auto call affer.
	}

}