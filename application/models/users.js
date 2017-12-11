function Users() {
	this.table  = "users";
	this.key    = "id";
	this.insert = function($data,$callback = null){
		this.db.insert(this.table,$data,$callback);
	}
	this.checkUser = function ($where,$callback){
		this.db.from(this.table);
		this.db.where($where);
		this.db.get($callback);
		return true;
	}
}
module.exports = Users;