_Route.add(
	{
		type       : "get",//put or post or get or all.
		url        : "/home/index/:id/:member",//listening request.
		controller : "home", // controller url.
		action     : "index",// action of funciton controller
		midellwell : _Midellwell.auth(), // is function run before route this.
		rule       : {"id" : "0-9+","member" : "A-Z,a-z"} // validate parameter passed from request url.
	}
);
//------------------------!add route------------------------

//------------------------group route------------------------

/*
	@parameter 1 ($admin is format string ) is url before all items child of this group. 

	@parameter 2 ($items is format object ) it is include information of route.

	@parameter 3 ($midellwell is format function ) it is run before route group.
*/

_Route.group("/admin",
	[
		{
			type       : "get",//post or get or all.
			url        : "/home",//listening request.
			controller : "home", // controller url.
			action     : "index",// action of funciton controller
			midellwell : true, // is function run before route this.
			rule       : null // validate parameter passed from request url.
		},
		{
			type       : "get",//post or get or all.
			url        : "/home/hello/:id",//listening request.
			controller : "home", // this path folder contain controller url.
			action     : "hello",// this is action of funciton controller
			midellwell : null, // is function run before route this.
			rule       : {"id" : "0-9+","member" : "A-Z,a-z"} // validate parameter passed from request url.
		},
		{
			type       : "get",//post or get or all.
			url        : "/home/page/:slug",//listening request.
			controller : "home", // this path folder contain controller url.
			action     : "index",// this is action of funciton controller
			midellwell : true, // this is function run before route this.
			rule       : {"slug" : "A-Z,a-z"} // validate parameter passed from request url.
		}
	],null
);

//------------------------!group route------------------------