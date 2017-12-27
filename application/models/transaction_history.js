function Transaction_history() {
	this.table  = "transaction_history";
	this.key    = "id";
	this.colums = ["id","member_id","payment_date","payment_id","payment_name","price","transaction_status","transaction_code","ip","type"];
	this.id = null;
 	this.member_id = null;
 	this.payment_date = null;
 	this.payment_id = null;
 	this.payment_name = null;
 	this.price = null;
 	this.transaction_status = null;
 	this.transaction_code = null;
 	this.ip = null;
 	this.type = null;
 	
}
module.exports = Transaction_history;