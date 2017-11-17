var driver = null;
if(_Config.database.driver != null){
	driver = require("./drivers/"+_Config.database.driver);
}
module.exports = driver;