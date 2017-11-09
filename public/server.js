_Path         = __dirname + "/";
_Fs   	      = require('fs');
var _require  = require(_Path + '../system/autoload.js');
var _autoload = new _require();
_App         = null ;
_Response    = null;
_Request     = null;
_Setup       = new _autoload.setup();
//--------------------------set path folder------------------------------------------;
_F_controlers = _Path + ".." + _Setup._F_controlers;
_F_views      = _Path + ".." + _Setup._F_views;
_F_helppers   = _Path + ".." + _Setup._F_helppers;
_F_libralys   = _Path + ".." + _Setup._F_libralys;
_F_https      = _Path + ".." + _Setup._F_https;
_F_models     = _Path + ".." + _Setup._F_models;
_F_config     = _Path + ".." + _Setup._F_config;

//-------------------------------------------!set path folder--------------------------------------------;

//-------------------------------------------load libelary--------------------------------------------;
	//--------------------------------------------set user config --------------------------------------------//
	
	_Config = new _autoload.config();
	require(_F_config + 'local');
	require(_F_config + 'database');

	//--------------------------------------------!set user config --------------------------------------------//
	_App         = new _autoload.express();
	_Phoenix     = new _autoload.phoenix();
	_Route       = new _autoload.route();
	_Http        = new _autoload.http();
	_Controller  = new _autoload.controller();
	_Model       = new _autoload.model();
	_Midellwell  = new _autoload.midellwell();

	//----------------------------------------------!load libelary--------------------------------------------;

//-----------------------------------------------Add custom route---------------------------------;

require(_F_https + "midellwell.js");
require(_F_https + "route.js");

//-----------------------------------------------!Add custom route---------------------------------;