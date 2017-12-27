function Member_setting() {
	this.table  = "member_setting";
	this.key    = "id";
	this.colums = ["id","member_id","newslettter","general_updates","promotions","research_emails","image_comment","image_like","dezignwall_comment","dezignwall_like","dezignwall_folder_comment","dezignwall_folder_like","newsletter_edition"];
	this.id = null;
 	this.member_id = null;
 	this.newslettter = null;
 	this.general_updates = null;
 	this.promotions = null;
 	this.research_emails = null;
 	this.image_comment = null;
 	this.image_like = null;
 	this.dezignwall_comment = null;
 	this.dezignwall_like = null;
 	this.dezignwall_folder_comment = null;
 	this.dezignwall_folder_like = null;
 	this.newsletter_edition = null;
 	
}
module.exports = Member_setting;