function Users() {
	this.table  = "users";
	this.key    = "id";
	this.colums = ["id","full_name","email","password"];
	this.id = null;
 	this.full_name = null;
 	this.email = null;
 	this.password = null;
 	
}
module.exports = Users;