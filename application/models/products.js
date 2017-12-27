function Products() {
	this.table  = "products";
	this.key    = "product_id";
	this.colums = ["product_id","member_id","member_updated_id","product_name","vendor","created_at","product_no","photo_id","comments","price","qty","product_note","fob","category_id","point"];
	this.product_id = null;
 	this.member_id = null;
 	this.member_updated_id = null;
 	this.product_name = null;
 	this.vendor = null;
 	this.created_at = null;
 	this.product_no = null;
 	this.photo_id = null;
 	this.comments = null;
 	this.price = null;
 	this.qty = null;
 	this.product_note = null;
 	this.fob = null;
 	this.category_id = null;
 	this.point = null;
 	
}
module.exports = Products;