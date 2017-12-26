_Route.add(
	{   
		name       : "home.index", //unquie display name for url ex: (this.route("home.index"))
		type       : "get",//put or post or get or all.
		url        : "/",//listening request.
		controller : "home", // controller url.
		action     : "index",// action of funciton controller
		midellwell : "notlogin", // is function run before route this.
		rule       : {"id" : "0-9+","member" : "A-Z,a-z"} // validate parameter passed from request url.
	}
);
//------------------------group route post------------------------//
_Route.group("/post",
	[
		{
			name       : "post.index",
			type       : "get",//post or get or all.
			url        : "/",//listening request.
			controller : "post", // controller url.
			action     : "index",// action of funciton controller
			midellwell : null, // is function run before route this.
			rule       : null // validate parameter passed from request url.
		},
		{
			name       : "post.view",
			type       : "get",//post or get or all.
			url        : "/view/:id",//listening request.
			controller : "post", // controller url.
			action     : "view",// action of funciton controller
			midellwell : null, // is function run before route this.
			rule       : null // validate parameter passed from request url.
		},	
	],"notlogin"
);

//------------------------group route post------------------------//


//--------------------------group route-----------------------------//

/*
	@parameter 1 ($admin is format string ) is url before all items child of this group. 

	@parameter 2 ($items is format object ) it is include information of route.

	@parameter 3 ($midellwell is format function ) it is run before route group.
*/
_Route.group("/auth",
	[
		{
			name       : "auth.signup",
			type       : "get",//post or get or all.
			url        : "/signup",//listening request.
			controller : "auth/signup", // controller url.
			action     : "index",// action of funciton controller
			midellwell : null, // is function run before route this.
			rule       : null // validate parameter passed from request url.
		},
		{
			name       : "auth.signup",
			type       : "post",//post or get or all.
			url        : "/signup",//listening request.
			controller : "auth/signup", // controller url.
			action     : "save",// action of funciton controller
			midellwell : null, // is function run before route this.
			rule       : null // validate parameter passed from request url.
		},
		{
			name       : "auth.signin",
			type       : "get",//post or get or all.
			url        : "/signin",//listening request.
			controller : "auth/signin", // controller url.
			action     : "index",// action of funciton controller
			midellwell : null, // is function run before route this.
			rule       : null // validate parameter passed from request url.
		},
		{
			name       : "auth.signin",
			type       : "post",//post or get or all.
			url        : "/signin",//listening request.
			controller : "auth/signin", // controller url.
			action     : "save",// action of funciton controller
			midellwell : null, // is function run before route this.
			rule       : null // validate parameter passed from request url.
		}
		 
	],"islogin"
);
//------------------------!group route------------------------