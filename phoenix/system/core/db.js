var driver;
switch(_Config.database.driver) {
    case "mysql":
        driver = require("./drivers/mysql");
        break;
    case "NoSQL":
        driver = require("./drivers/nosql");
        break;
    case "PostgreSQL":
        driver = require("./drivers/postgresql");
   		break;
}
module.exports = driver;