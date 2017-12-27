function Education() {
	this.table  = "education";
	this.key    = "id";
	this.colums = ["id","member_id","school_name","major_degeer","start_day","end_day","logo","present","created_at","updated_at","status"];
	this.id = null;
 	this.member_id = null;
 	this.school_name = null;
 	this.major_degeer = null;
 	this.start_day = null;
 	this.end_day = null;
 	this.logo = null;
 	this.present = null;
 	this.created_at = null;
 	this.updated_at = null;
 	this.status = null;
 	
}
module.exports = Education;