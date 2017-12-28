function Post_category() {
	this.table  = "post_category";
	this.key    = ["post_id","category_id"];
	this.colums = ["post_id","category_id","created_at","updated_at"];
	this.post_id = null;
 	this.category_id = null;
 	this.created_at = null;
 	this.updated_at = null;
 	
}
module.exports = Post_category;