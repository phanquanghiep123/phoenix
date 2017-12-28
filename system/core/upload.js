function Upload(argument) {
	this.config = {};
	this.errorUpload = [];
	this.phoenix_upload_callback = null;
	this.phoneix_upload_init     = function(){
		this.config.path         = false;
		this.config.extension    = false;
		this.config.max_width    = false;
		this.config.max_height   = false;
		this.config.size         = false;
		this.config.name         = false;
	}
	this.setconfig  = function($config = {}){
		this.config = Object.assign(this.config,$config);
		return this;
	}
	this.resize = function ($path,$config,$newname){

	}
	this.callback = function($callback){
		this.phoenix_upload_callback = $callback;
	}
	this.save = function($file){
		var data_return   = {status:false};
		var errorUpload   = [];
		var config = this.config;
		var check  = true;
		var path   = require('path');
		var exe    = path.extname($file.name);
		exe        = exe.toLowerCase(); 
		if(config.extension != false){
			if(typeof config.extension != "object"){return _Phoenix.phoenix_info.error.push({detail:"Upload error" ,message : "Error: Please config extension is array"});}
			if(config.extension.indexOf(exe.replace(".","")) == -1){
				check = false;
				errorUpload.push("Extension does not support uploads Please upload a file so it should be: " + config.extension.join(", "))
			}
		}
		if(config.size != false){
			if(config.size < $file.size){
				check = false;
				errorUpload.push("Maximum upload file is " + config.size +"Kb");
			}
		}
		if(config.path == false) return _Phoenix.phoenix_info.error.push({detail:"Upload error" ,message : "Error: Please add path save file!"});
		var name = (config.name != false) ? config.name + exe : $file.name ;
		if(check == true){
			var tp = config.path + '/'+ name;
			_Fs.readFileSync($file.path, function (err, data) {
				_Fs.writeFileSync(tp, data, function (err) {  
	                if(err){
	                	return _Phoenix.phoenix_info.error.push({detail:err ,message : err});
	                }else{
	                	var sizeOf = require('image-size');
						var dimensions = sizeOf(tp);
						if(config.max_width != false && dimensions.width > config.max_width){
							check = false;
							_Fs.unlink(tp, function (err) {
				                if(err){
				                	return _Phoenix.phoenix_info.error.push({detail:err ,message : err});
				                }
				                errorUpload.push("Maximum width upload file is " + config.max_width +"px");
				            });
						}
						if(config.max_height != false && dimensions.height > config.max_width){
							check = false;
							_Fs.unlink(tp, function (err) {
				                if(err){
				                	return _Phoenix.phoenix_info.error.push({detail:err ,message : err});
				                }
				                errorUpload.push("Maximum height upload file is " + config.max_height +"px");
				            });
						}
						if(check != false){
							data_return = {
								status   : true,
								name     : name,
								path     : tp,
								datafile : $file
							};
						}	
	                }
	            });
	            // Delete the file
	            _Fs.unlink($file.path, function (err) {
	                if(err){
	                	return _Phoenix.phoenix_info.error.push({detail:err ,message : err});
	                }
	            });
			});
		}else{
			data_return = {
				status   : false,
				error    : errorUpload,
				datafile : $file
			}
			return data_return;	
		}
	}
	this.phoneix_upload_init();
	
}
module.exports = Upload;