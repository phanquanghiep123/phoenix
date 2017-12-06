function Form() {
	this.stringFrom  = "";
	this.ListForm    = [];
	this.CurentName  = "";
	this.Status      = true;
	this.addStarFrom = false;
	this.start = function($name = null,$attr = {}){
		if(this.Status == false){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please end form before start form!"});
			return false;
		}
		this.ListForm[this.CurentName] = [];
		this.Status = false;
		this.addStarFrom = true;
		return true;
	}
	this.inputText = function($name = null,$attr = {}){
		if(this.addStarFrom == false){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "text"
		});
		return true;
	}
	this.inputEmail= function($name = null,$attr = {}){
		if(this.addStarFrom == false){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "email"
		});
		return true;
	}
	this.inputTextarea = function($name = null,$attr = {}){
		if(this.addStarFrom == false){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "textarea"
		});
		return true;
	}
	this.inputPassword = function($name = null,$attr = {}){
		if(this.addStarFrom == false){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "password"
		});
		return true;
	}
	this.inputMoth = function($name = null,$attr = {}){
		if(this.addStarFrom == false){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "moth"
		});
		return true;
	}
	this.inputDay = function($name = null,$attr = {}){
		if(this.addStarFrom == false){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "date"
		});
		return true;
	}
	this.inputCheckbox = function($name = null,$attr = {}){
		if(this.addStarFrom == false){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "checkbox"
		});
		return true;
	}
	this.inputRadio = function($name = null,$attr = {}){
		if(this.addStarFrom == false){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "radio"
		});
		return true;
	}
	this.inputSelect = function($table,$attr={}, $key_value,$key_lable,$active = null){
		if(this.addStarFrom == false){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "select",
			key_value:$key_value,
			key_lable:$key_lable,
			active:$active
		});
		return true;
	}
	this.inputFile = function($name,$attr = {}){
		if(this.addStarFrom == false){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "file"
		});
		return true;
	}
	this.end = function($name = null,$attr = {}){
		if(this.addStarFrom == false){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before end form!"});
			return false;
		}
		reader();
		this.stringFrom  = "";
		this.Status      = true;
		this.addStarFrom = false;
		return true;
	}
	function reader (){

	}

}
module.exports = Form;