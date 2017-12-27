function Offer() {
	this.table  = "offer";
	this.key    = "id";
	this.colums = ["id","title_offer","code","number_uses","start_date","end_date","type","type_offer","summary","price"];
	this.id = null;
 	this.title_offer = null;
 	this.code = null;
 	this.number_uses = null;
 	this.start_date = null;
 	this.end_date = null;
 	this.type = null;
 	this.type_offer = null;
 	this.summary = null;
 	this.price = null;
 	
}
module.exports = Offer;