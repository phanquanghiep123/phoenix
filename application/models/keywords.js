function Keywords() {
	this.table  = "keywords";
	this.key    = "keyword_id";
	this.colums = ["keyword_id","title","type"];
	this.keyword_id = null;
 	this.title = null;
 	this.type = null;
 	
}
module.exports = Keywords;