_Model.members  = {
	getall : function($callback){
		this.db.from("members");
		this.db.limit(20,30);
		this.db.get(function(e,r,f){
			$callback(e,r,f);
		});
	}
}