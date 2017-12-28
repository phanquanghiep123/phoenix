function Post_media() {
	this.table  = "post_media";
	this.key    = ["post_id","media_id"];
	this.colums = ["post_id","media_id","created_at","updated_at"];
	this.post_id = null;
 	this.media_id = null;
 	this.created_at = null;
 	this.updated_at = null;
 	
}
module.exports = Post_media;