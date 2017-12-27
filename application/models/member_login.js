function Member_login() {
	this.table  = "member_login";
	this.key    = "id";
	this.colums = ["id","member_id","login_date_start","login_date_end"];
	this.id = null;
 	this.member_id = null;
 	this.login_date_start = null;
 	this.login_date_end = null;
 	
}
module.exports = Member_login;