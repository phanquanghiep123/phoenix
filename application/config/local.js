var server_port = process.env.OPENSHIFT_NODEJS_PORT || 80;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || 'phoenix.com';
_Config.local = {
	host : server_ip_address,
	port : server_port,
	defaulController : "home",
	defaulAction     : "index"
}