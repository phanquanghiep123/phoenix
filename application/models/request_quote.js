function Request_quote() {
	this.table  = "request_quote";
	this.key    = "id";
	this.colums = ["id","photo_id","point_id","data","created_at"];
	this.id = null;
 	this.photo_id = null;
 	this.point_id = null;
 	this.data = null;
 	this.created_at = null;
 	
}
module.exports = Request_quote;