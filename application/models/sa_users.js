function Sa_users() {
	this.table  = "sa_users";
	this.key    = "id";
	this.colums = ["id","username","pwd","email","first_name","last_name","role"];
	this.id = null;
 	this.username = null;
 	this.pwd = null;
 	this.email = null;
 	this.first_name = null;
 	this.last_name = null;
 	this.role = null;
 	
}
module.exports = Sa_users;