function Users() {
	this.table  = "users";
	this.insert = function($data,$callback = null){
		this.db.insert(this.table,$data,$callback);
	}
}
module.exports = Users;