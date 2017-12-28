function Posts() {
	this.table  = "posts";
	this.key    = "id";
	this.colums = ["id","name","user_id","description","content","created_at","updated_at","post_type","thumb"];
	this.id = null;
 	this.name = null;
 	this.user_id = null;
 	this.description = null;
 	this.content = null;
 	this.created_at = null;
 	this.updated_at = null;
 	this.post_type = null;
 	this.thumb = null;
 	
}
module.exports = Posts;