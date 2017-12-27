function Track_logging() {
	this.table  = "track_logging";
	this.key    = "id";
	this.colums = ["id","date","member_id","company_name","action","sub_action","response","responsmessage","url"];
	this.id = null;
 	this.date = null;
 	this.member_id = null;
 	this.company_name = null;
 	this.action = null;
 	this.sub_action = null;
 	this.response = null;
 	this.responsmessage = null;
 	this.url = null;
 	
}
module.exports = Track_logging;