function Volunteer() {
	this.table  = "volunteer";
	this.key    = "id";
	this.colums = ["id","member_id","organization","role","logo","start_day","end_day","present","created_at","updated_at","status"];
	this.id = null;
 	this.member_id = null;
 	this.organization = null;
 	this.role = null;
 	this.logo = null;
 	this.start_day = null;
 	this.end_day = null;
 	this.present = null;
 	this.created_at = null;
 	this.updated_at = null;
 	this.status = null;
 	
}
module.exports = Volunteer;