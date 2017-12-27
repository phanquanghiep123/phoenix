function Campaign() {
	this.table  = "campaign";
	this.key    = "id";
	this.colums = ["id","title","summary","start_date","end_date","package_id","num_days"];
	this.id = null;
 	this.title = null;
 	this.summary = null;
 	this.start_date = null;
 	this.end_date = null;
 	this.package_id = null;
 	this.num_days = null;
 	
}
module.exports = Campaign;