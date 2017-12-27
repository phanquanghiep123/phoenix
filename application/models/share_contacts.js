function Share_contacts() {
	this.table  = "share_contacts";
	this.key    = "id";
	this.colums = ["id","member_id","email_sent","type_member","created_at"];
	this.id = null;
 	this.member_id = null;
 	this.email_sent = null;
 	this.type_member = null;
 	this.created_at = null;
 	
}
module.exports = Share_contacts;