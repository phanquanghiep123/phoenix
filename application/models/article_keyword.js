function Article_keyword() {
	this.table  = "article_keyword";
	this.key    = "id";
	this.colums = ["id","keyword_id","article_id","created_at"];
	this.id = null;
 	this.keyword_id = null;
 	this.article_id = null;
 	this.created_at = null;
 	
}
module.exports = Article_keyword;