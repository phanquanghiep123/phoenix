function Experience() {
	this.table  = "experience";
	this.key    = "id";
	this.colums = ["id","member_id","company_name","logo","job_title","start_day","end_day","present","is_admin","description"];
	this.id = null;
 	this.member_id = null;
 	this.company_name = null;
 	this.logo = null;
 	this.job_title = null;
 	this.start_day = null;
 	this.end_day = null;
 	this.present = null;
 	this.is_admin = null;
 	this.description = null;
 	
}
module.exports = Experience;