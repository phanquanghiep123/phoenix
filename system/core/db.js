var driver = null;
if(_Config.database.driver != null){
	try {
		driver = require("./drivers/"+_Config.database.driver);
	}catch (e){
		if (e instanceof SyntaxError) _Controller.info.error.push({detail:e ,message : e.message});
		else _Controller.info.error.push({detail:e ,message : e});
	}
}
module.exports = driver;