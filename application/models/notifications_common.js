function Notifications_common() {
	this.table  = "notifications_common";
	this.key    = "id";
	this.colums = ["id","reference_id","type","member_id","member_owner","status","type_object","allow","created_at"];
	this.id = null;
 	this.reference_id = null;
 	this.type = null;
 	this.member_id = null;
 	this.member_owner = null;
 	this.status = null;
 	this.type_object = null;
 	this.allow = null;
 	this.created_at = null;
 	
}
module.exports = Notifications_common;