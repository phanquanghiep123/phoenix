function Member_upgrade() {
	this.table  = "member_upgrade";
	this.key    = "id";
	this.colums = ["id","member_id","upgrade_date_start","upgrade_date_end","offer_id"];
	this.id = null;
 	this.member_id = null;
 	this.upgrade_date_start = null;
 	this.upgrade_date_end = null;
 	this.offer_id = null;
 	
}
module.exports = Member_upgrade;