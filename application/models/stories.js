function Stories() {
	this.table  = "stories";
	this.key    = "id";
	this.colums = ["id","photo_id","member_id","title","media_url","story_type","story_content","createdat","sort","type","profile_name","caption_title"];
	this.id = null;
 	this.photo_id = null;
 	this.member_id = null;
 	this.title = null;
 	this.media_url = null;
 	this.story_type = null;
 	this.story_content = null;
 	this.createdat = null;
 	this.sort = null;
 	this.type = null;
 	this.profile_name = null;
 	this.caption_title = null;
 	
}
module.exports = Stories;