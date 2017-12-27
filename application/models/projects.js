function Projects() {
	this.table  = "projects";
	this.key    = "project_id";
	this.colums = ["project_id","project_name","project_no","start_date","due_date","path_file","created_at","project_specs","member_id","team_member","changed_date","type_project","status"];
	this.project_id = null;
 	this.project_name = null;
 	this.project_no = null;
 	this.start_date = null;
 	this.due_date = null;
 	this.path_file = null;
 	this.created_at = null;
 	this.project_specs = null;
 	this.member_id = null;
 	this.team_member = null;
 	this.changed_date = null;
 	this.type_project = null;
 	this.status = null;
 	
}
module.exports = Projects;