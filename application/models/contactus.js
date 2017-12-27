function Contactus() {
	this.table  = "contactus";
	this.key    = "id";
	this.colums = ["id","name","email","subject","message","created_date","is_read"];
	this.id = null;
 	this.name = null;
 	this.email = null;
 	this.subject = null;
 	this.message = null;
 	this.created_date = null;
 	this.is_read = null;
 	
}
module.exports = Contactus;