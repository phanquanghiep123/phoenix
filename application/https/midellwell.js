function Midellwell(argument) {
	this.islogin = function (){
		var auth = this.session.get("Auth");
		if(auth != false) this.redirect(route("home.index"));
	}
	this.notlogin = function (){
		var auth = this.session.get("Auth");
		if(auth == false) this.redirect(route("auth.signin"));
	}
	this.isadmin = function(){
		return true;
	}
}
module.exports = Midellwell;