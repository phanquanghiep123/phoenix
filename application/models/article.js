function Article() {
	this.table  = "article";
	this.key    = "id";
	this.colums = ["id","title","sub_title","content","thumbnail","keyword","member_id","status","date_create"];
	this.id = null;
 	this.title = null;
 	this.sub_title = null;
 	this.content = null;
 	this.thumbnail = null;
 	this.keyword = null;
 	this.member_id = null;
 	this.status = null;
 	this.date_create = null;
 	
}
module.exports = Article;