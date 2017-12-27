function Project_categories() {
	this.table  = "project_categories";
	this.key    = "category_id";
	this.colums = ["category_id","project_id","title","specs","type_category","path_file","status"];
	this.category_id = null;
 	this.project_id = null;
 	this.title = null;
 	this.specs = null;
 	this.type_category = null;
 	this.path_file = null;
 	this.status = null;
 	
}
module.exports = Project_categories;