function Notification() {
	this.table  = "notification";
	this.key    = "id";
	this.colums = ["id","title","summary","content","image","author","created_at"];
	this.id = null;
 	this.title = null;
 	this.summary = null;
 	this.content = null;
 	this.image = null;
 	this.author = null;
 	this.created_at = null;
 	
}
module.exports = Notification;