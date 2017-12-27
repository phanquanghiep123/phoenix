function Project_invite() {
	this.table  = "project_invite";
	this.key    = "id";
	this.colums = ["id","project_id","owner_id","email","first_name","last_name","invite_date","status","category_id","token"];
	this.id = null;
 	this.project_id = null;
 	this.owner_id = null;
 	this.email = null;
 	this.first_name = null;
 	this.last_name = null;
 	this.invite_date = null;
 	this.status = null;
 	this.category_id = null;
 	this.token = null;
 	
}
module.exports = Project_invite;