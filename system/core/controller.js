function Controller() {
	const _pix_setsection = "setsection_";
	const _pix_addsection = "addsection_";
	this.readFlie = function($file){
		if(_Fs.existsSync($file) == false){
			this.info.error.push({detail:_Fs ,message : "File not exists : " + $file});
			return false;
		}
		var content = _Fs.readFileSync($file, 'utf8');
		return content;	
	}
}
module.exports = Controller;