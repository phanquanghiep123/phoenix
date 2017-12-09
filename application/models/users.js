function Users() {
	this.table  = "users";
	this.insert = function($data){
		var id = this.db.insert(this.table,$data);
		return id;
	}
}
module.exports = Users;