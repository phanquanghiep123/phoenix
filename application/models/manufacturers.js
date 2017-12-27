function Manufacturers() {
	this.table  = "manufacturers";
	this.key    = "id";
	this.colums = ["id","name","logo","member_id","type","createat","description"];
	this.id = null;
 	this.name = null;
 	this.logo = null;
 	this.member_id = null;
 	this.type = null;
 	this.createat = null;
 	this.description = null;
 	
}
module.exports = Manufacturers;