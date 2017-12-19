function Http(){
	const server_port       = _Config.local.port;
	const server_ip_address = _Config.local.host;
	const express    = require('express');
	const http 	     = require('http');
	const bodyParser = require('body-parser'); 
	const fileUpload = require('express-fileupload');
	const cookieParser = require('cookie-parser');
	const session      = require('express-session');
	_App = express();
	_App.use(fileUpload());
	_App.use(cookieParser());
	_App.use(session({secret: "Shh, its a secret!"}));
	_App.use("/skins",express.static(_Path + '/skins'));
	_App.use("/uploads",express.static(_Path + '/uploads'));
	_App.use(bodyParser.json()); 
	_App.use(bodyParser.urlencoded({ extended: true })); 
	_App.listen(server_port, server_ip_address, function () {
	  console.log( "Listening on " + server_ip_address + ", port " + server_port );
	});
}
module.exports = Http;