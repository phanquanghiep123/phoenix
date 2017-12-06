function Http(){
	var server_port       = _Config.local.port;
	var server_ip_address = _Config.local.host;
	var express    = require('express');
	var http 	   = require('http');
	var bodyParser = require('body-parser'); 
	_App 	       = express();
	_App.use("/skins",express.static(_Path + '/skins'));
	_App.use("/uploads",express.static(_Path + '/uploads'));
	_App.use(bodyParser.json()); 
	_App.use(bodyParser.urlencoded({ extended: true })); 
	http.createServer(_App).listen(server_port,server_ip_address, function(req,res) {
		console.log("listen: "+server_port);
		console.log("listen: "+server_ip_address);
	});
}
module.exports = Http;