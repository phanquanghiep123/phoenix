function Member_payment() {
	this.table  = "member_payment";
	this.key    = "id";
	this.colums = ["id","first_name","last_name","credit_card","address1","address2","city","state","zipcode","country","expire_month","expire_year","price","qty_month","created_at","type_payment","member_id","package_id","package_summary"];
	this.id = null;
 	this.first_name = null;
 	this.last_name = null;
 	this.credit_card = null;
 	this.address1 = null;
 	this.address2 = null;
 	this.city = null;
 	this.state = null;
 	this.zipcode = null;
 	this.country = null;
 	this.expire_month = null;
 	this.expire_year = null;
 	this.price = null;
 	this.qty_month = null;
 	this.created_at = null;
 	this.type_payment = null;
 	this.member_id = null;
 	this.package_id = null;
 	this.package_summary = null;
 	
}
module.exports = Member_payment;