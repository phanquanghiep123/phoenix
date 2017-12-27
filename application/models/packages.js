function Packages() {
	this.table  = "packages";
	this.key    = "id";
	this.colums = ["id","name","summary","price","annual","enable","path_file","discount","content1","content2","paypal","max_files","type"];
	this.id = null;
 	this.name = null;
 	this.summary = null;
 	this.price = null;
 	this.annual = null;
 	this.enable = null;
 	this.path_file = null;
 	this.discount = null;
 	this.content1 = null;
 	this.content2 = null;
 	this.paypal = null;
 	this.max_files = null;
 	this.type = null;
 	
}
module.exports = Packages;