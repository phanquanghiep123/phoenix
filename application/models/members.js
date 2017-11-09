_Model.members  = {
	getall : function(){
		this.db.from("members AS tbl2");
		this.db.where("tbl2.id",1);
		 
	}	 
}