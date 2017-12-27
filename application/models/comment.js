function Comment() {
	this.table  = "comment";
	this.key    = "id";
	this.colums = ["id","memner_owner_id","reference_id","member_comment_id","follow_comment_id","content","media","created_at","type_comment","type","numlive","numfollow","numreply"];
	this.id = null;
 	this.memner_owner_id = null;
 	this.reference_id = null;
 	this.member_comment_id = null;
 	this.follow_comment_id = null;
 	this.content = null;
 	this.media = null;
 	this.created_at = null;
 	this.type_comment = null;
 	this.type = null;
 	this.numlive = null;
 	this.numfollow = null;
 	this.numreply = null;
 	
}
module.exports = Comment;