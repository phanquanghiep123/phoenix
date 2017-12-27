function Common_view() {
	this.table  = "common_view";
	this.key    = "id";
	this.colums = ["id","reference_id","member_owner","member_id","ip","type_object","created_at","type_share_view","type_share","createdat_profile","createdat_photo_blog","createdat_email","createdat_facebook","createdat_twitter","createdat_linkedin"];
	this.id = null;
 	this.reference_id = null;
 	this.member_owner = null;
 	this.member_id = null;
 	this.ip = null;
 	this.type_object = null;
 	this.created_at = null;
 	this.type_share_view = null;
 	this.type_share = null;
 	this.createdat_profile = null;
 	this.createdat_photo_blog = null;
 	this.createdat_email = null;
 	this.createdat_facebook = null;
 	this.createdat_twitter = null;
 	this.createdat_linkedin = null;
 	
}
module.exports = Common_view;