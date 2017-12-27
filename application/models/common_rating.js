function Common_rating() {
	this.table  = "common_rating";
	this.key    = "id";
	this.colums = ["id","reference_id","member_id","rate_num","created_at","type_object","pid"];
	this.id = null;
 	this.reference_id = null;
 	this.member_id = null;
 	this.rate_num = null;
 	this.created_at = null;
 	this.type_object = null;
 	this.pid = null;
 	
}
module.exports = Common_rating;