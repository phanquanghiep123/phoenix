_Controller.home = {
	__construct : function(){
		// auto call before.
	},
	demoview : function(){
		this.load.view("demoview.html",{a:a,b:b});
	}
	demomodel: function(){
		this.load.model("members"); 
		this.members.getall (function(e,r,f){
			that.load.view("demomodel.html",{members:r,a:a,b:b});
		});
	}
	__destructors : function(){
		// auto call affer.
	}

}