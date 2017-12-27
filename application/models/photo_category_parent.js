function Photo_category_parent() {
	this.table  = "photo_category_parent";
	this.key    = "id";
	this.colums = ["id","id_cat_parent","cats","id_photo"];
	this.id = null;
 	this.id_cat_parent = null;
 	this.cats = null;
 	this.id_photo = null;
 	
}
module.exports = Photo_category_parent;