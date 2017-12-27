function Menu() {
	this.table  = "menu";
	this.key    = "id";
	this.colums = ["id","pid","slug","title","code_lang","url","class","sort_id","created_date","author","group_id"];
	this.id = null;
 	this.pid = null;
 	this.slug = null;
 	this.title = null;
 	this.code_lang = null;
 	this.url = null;
 	this.class = null;
 	this.sort_id = null;
 	this.created_date = null;
 	this.author = null;
 	this.group_id = null;
 	
}
module.exports = Menu;