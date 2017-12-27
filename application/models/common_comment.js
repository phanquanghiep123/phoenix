function Common_comment() {
	this.table  = "common_comment";
	this.key    = "id";
	this.colums = ["id","reference_id","member_id","comment","created_at","type_object","pid"];
	this.id = null;
 	this.reference_id = null;
 	this.member_id = null;
 	this.comment = null;
 	this.created_at = null;
 	this.type_object = null;
 	this.pid = null;
 	
}
module.exports = Common_comment;