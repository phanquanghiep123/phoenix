function Common_like() {
	this.table  = "common_like";
	this.key    = "id";
	this.colums = ["id","reference_id","member_id","owner","status","created_at","type_object","pid","ownerview"];
	this.id = null;
 	this.reference_id = null;
 	this.member_id = null;
 	this.owner = null;
 	this.status = null;
 	this.created_at = null;
 	this.type_object = null;
 	this.pid = null;
 	this.ownerview = null;
 	
}
module.exports = Common_like;