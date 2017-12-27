function Web_setting() {
	this.table  = "web_setting";
	this.key    = "id";
	this.colums = ["id","group_id","key_identify","title","selected_item"];
	this.id = null;
 	this.group_id = null;
 	this.key_identify = null;
 	this.title = null;
 	this.selected_item = null;
 	
}
module.exports = Web_setting;