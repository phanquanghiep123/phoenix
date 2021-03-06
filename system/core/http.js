function Http(){
	const server_port       = _Config.local.port;
	const server_ip_address = _Config.local.host;
	const express           = require('express');
	_App = express();
	_App.use(express.cookieParser('phoneix'));
	_App.use(express.session({ secret: 'phoneix' }));
	_App.use(express.bodyParser());
	_App.use(express.json());
	_App.use(express.urlencoded());
	_App.use(express.multipart());
	_App.use("/skins",express.static(_Path + '/skins'));
	_App.use("/uploads",express.static(_Path + '/uploads'));
	_App.listen(server_port, server_ip_address, function () {
	  console.log( "Listening on " + server_ip_address + ", port " + server_port );
	});
	_App.get('/generator_models',function(req,res,next){
		const _db = require("./db.js");
	    var db    = new _db();
		db.generator_models(function(){
			res.write("Generator models successfully!");
			res.end();
		});
    });
}
module.exports = Http;