_Model.members  = {
	getall : function($callback,$offset = 0,$limit = 10){
		this.db.select(["m.*"]);
		this.db.from("members AS m");
		this.db.limit($offset,$limit);
		this.db.get(function(e,r,f){
			$callback(r,f);
		});
	},

	getalljoin : function($callback,$offset = 0,$limit = 10){
		this.db.from("photos");
		this.db.join("members","members.id = photos.member_id","left");
		this.db.limit($offset,$limit);
		this.db.get(function(e,r,f){
			$callback(e,r,f);
		});
	}
}