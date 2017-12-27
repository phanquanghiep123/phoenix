function Social_posts() {
	this.table  = "social_posts";
	this.key    = "id";
	this.colums = ["id","member_id","content","path","thumb","created_at","public","numlive","numconment"];
	this.id = null;
 	this.member_id = null;
 	this.content = null;
 	this.path = null;
 	this.thumb = null;
 	this.created_at = null;
 	this.public = null;
 	this.numlive = null;
 	this.numconment = null;
 	
}
module.exports = Social_posts;