function Common_follow() {
	this.table  = "common_follow";
	this.key    = "id";
	this.colums = ["id","reference_id","member_id","status","owner_id","allow","created_at","type_object","owner_view","pid"];
	this.id = null;
 	this.reference_id = null;
 	this.member_id = null;
 	this.status = null;
 	this.owner_id = null;
 	this.allow = null;
 	this.created_at = null;
 	this.type_object = null;
 	this.owner_view = null;
 	this.pid = null;
 	
}
module.exports = Common_follow;