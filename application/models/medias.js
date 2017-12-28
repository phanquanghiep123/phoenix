function Medias() {
	this.table  = "medias";
	this.key    = "id";
	this.colums = ["id","user_id","thumb","l_path","md_path","sm_path","full_path","description","name"];
	this.id = null;
 	this.user_id = null;
 	this.thumb = null;
 	this.l_path = null;
 	this.md_path = null;
 	this.sm_path = null;
 	this.full_path = null;
 	this.description = null;
 	this.name = null;
 	
}
module.exports = Medias;