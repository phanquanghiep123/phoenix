function History() {
	this.table  = "history";
	this.key    = "id";
	this.colums = ["id","order","member_id","packages_id","date_create"];
	this.id = null;
 	this.order = null;
 	this.member_id = null;
 	this.packages_id = null;
 	this.date_create = null;
 	
}
module.exports = History;