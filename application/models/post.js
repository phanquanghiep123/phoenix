function Post() {
	this.table  = "post";
	this.key    = "id";
	this.colums = ["id","title","slug","content","parent_id","template","banner","banner_title","created_at","type"];
	this.id = null;
 	this.title = null;
 	this.slug = null;
 	this.content = null;
 	this.parent_id = null;
 	this.template = null;
 	this.banner = null;
 	this.banner_title = null;
 	this.created_at = null;
 	this.type = null;
 	
}
module.exports = Post;