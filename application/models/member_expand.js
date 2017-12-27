function Member_expand() {
	this.table  = "member_expand";
	this.key    = "id";
	this.colums = ["id","member_id","package_id","status","created_at","start_date","end_date"];
	this.id = null;
 	this.member_id = null;
 	this.package_id = null;
 	this.status = null;
 	this.created_at = null;
 	this.start_date = null;
 	this.end_date = null;
 	
}
module.exports = Member_expand;