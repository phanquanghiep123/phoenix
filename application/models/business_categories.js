function Business_categories() {
	this.table  = "business_categories";
	this.key    = "id";
	this.colums = ["id","pid","title","slug","sort","enabled","type","class_icon","show_search"];
	this.id = null;
 	this.pid = null;
 	this.title = null;
 	this.slug = null;
 	this.sort = null;
 	this.enabled = null;
 	this.type = null;
 	this.class_icon = null;
 	this.show_search = null;
 	
}
module.exports = Business_categories;