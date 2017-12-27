function Member_sale_rep() {
	this.table  = "member_sale_rep";
	this.key    = "id";
	this.colums = ["id","member_id","email","pwd","token","created_at","avatar"];
	this.id = null;
 	this.member_id = null;
 	this.email = null;
 	this.pwd = null;
 	this.token = null;
 	this.created_at = null;
 	this.avatar = null;
 	
}
module.exports = Member_sale_rep;