_Model.members  = {
	getall : function($callback,$offset,$limit){
		this.db.from("photos");
		this.db.limit($offset,$limit);
		this.db.get(function(e,r,f){
			$callback(e,r,f);
		});
	},

	getalljoin : function($callback,$offset,$limit){
		this.db.from("photos");
		this.db.join("members","members.id = photos.member_id","left");
		this.db.limit($offset,$limit);
		this.db.get(function(e,r,f){
			$callback(e,r,f);
		});
	}
}