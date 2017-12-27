function Categories() {
	this.table  = "categories";
	this.key    = "id";
	this.colums = ["id","pid","parents_id","title","slug","slug_key","sort","enabled","type","type_show","requi","tooltip","class_icon","show_search"];
	this.id = null;
 	this.pid = null;
 	this.parents_id = null;
 	this.title = null;
 	this.slug = null;
 	this.slug_key = null;
 	this.sort = null;
 	this.enabled = null;
 	this.type = null;
 	this.type_show = null;
 	this.requi = null;
 	this.tooltip = null;
 	this.class_icon = null;
 	this.show_search = null;
 	
}
module.exports = Categories;