function Project_member() {
	this.table  = "project_member";
	this.key    = "id";
	this.colums = ["id","project_id","member_id","type_role","join_date"];
	this.id = null;
 	this.project_id = null;
 	this.member_id = null;
 	this.type_role = null;
 	this.join_date = null;
 	
}
module.exports = Project_member;