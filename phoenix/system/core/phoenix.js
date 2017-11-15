function Phoenix(argument) {
	var _load = require("./loader.js");
	var _db   = require("./db.js");
	this.load = new _load();
	this.db   = new _db();
	this.loadview = function($file, $data, $return = false){
		var view = _Fs.readFileSync(_F_views + $file, 'utf8');
		var DataString = strEval = evalString = "";
		var phoenix = _Controller[_Controller.info.controller].phoenix;
		if ($data != null) {
			for (var key in $data ){
				eval("var " + key + " = $data[key];" );
			}
		}
		try {
			view = view.split("<?node");
            var countArg = view.length;
            var evalArg ;
            for (var i = 0; i <= (countArg -1); i++) {
  				if (view[i].indexOf("?>") == "-1") {
					DataString += view[i];
				}else{
					var evalArg = view[i].split("?>");
					evalString = evalArg[0].trim();
					evalString = evalString.replaceAll("write", "DataString += ");
					try {
						eval(evalString.trim());
						DataString += evalArg[1];
					} catch (e) {
						if (e instanceof SyntaxError) write(e.message);
						else write(e);
					}
				}
            }
			
		}
		catch (e) {
			if (e instanceof SyntaxError) write(e.message);
			else write(e);
		}
		return DataString;
	}
}
String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.split(search).join(replacement);
};
module.exports = Phoenix;