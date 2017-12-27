function Photo_category() {
	this.table  = "photo_category";
	this.key    = ["category_id","photo_id"];
	this.colums = ["category_id","photo_id","first_child_category","location"];
	this.category_id = null;
 	this.photo_id = null;
 	this.first_child_category = null;
 	this.location = null;
 	
}
module.exports = Photo_category;