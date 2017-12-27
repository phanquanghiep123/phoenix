function Cms() {
	this.table  = "cms";
	this.key    = "id";
	this.colums = ["id","title","content","summary","code_lang","slug","created_date","updated_date","author","public_date","media_file"];
	this.id = null;
 	this.title = null;
 	this.content = null;
 	this.summary = null;
 	this.code_lang = null;
 	this.slug = null;
 	this.created_date = null;
 	this.updated_date = null;
 	this.author = null;
 	this.public_date = null;
 	this.media_file = null;
 	
}
module.exports = Cms;