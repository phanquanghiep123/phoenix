function Photo_keyword() {
	this.table  = "photo_keyword";
	this.key    = ["keyword_id","photo_id"];
	this.colums = ["keyword_id","photo_id"];
	this.keyword_id = null;
 	this.photo_id = null;
 	
}
module.exports = Photo_keyword;