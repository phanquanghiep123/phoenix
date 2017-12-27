function Photo_bin() {
	this.table  = "photo_bin";
	this.key    = "id";
	this.colums = ["id","photo_id","datime_remove","data_status","date_delete"];
	this.id = null;
 	this.photo_id = null;
 	this.datime_remove = null;
 	this.data_status = null;
 	this.date_delete = null;
 	
}
module.exports = Photo_bin;