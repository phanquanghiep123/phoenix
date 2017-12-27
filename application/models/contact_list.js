function Contact_list() {
	this.table  = "contact_list";
	this.key    = "id";
	this.colums = ["id","member_id","email","created_at"];
	this.id = null;
 	this.member_id = null;
 	this.email = null;
 	this.created_at = null;
 	
}
module.exports = Contact_list;