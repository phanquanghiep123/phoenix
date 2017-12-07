function Form() {
	this.stringFrom  = "";
	this.ListForm    = {};
	this.CurentName  = null;
	this.Status      = true;
	this.addStarFrom = false;
	this.start = function($name = null,$attr = {}){
		if(this.Status == false && this.CurentName == null){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please end form before start form!"});
			return false;
		}
		this.ListForm[$name] = [];
		this.CurentName  = $name;
		this.Status      = false;
		this.addStarFrom = true;
		var attString = "";
		if($attr != null){
			for(var i in $attr){
				if(typeof($attr[i]) !== "function"){
					attString += i +" = \"" + $attr[i] +"\" ";
				}
			}
		}
		if(!_Phoenix.islayout){
			_Phoenix.dataView += '<form name="'+$name+'" '+attString+'>';
		}else{
			_Phoenix.layout += '<form name="'+$name+'" '+attString+'>';
		}
		return true;
	}
	this.inputText = function($name = null,$attr = {}){
		if(this.addStarFrom == false && this.CurentName == null){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "text"
		});
		var attString = "";
    	if($attr != null){
			for(var i in $attr){
				if(typeof($attr[i]) !== "function"){
					attString += i +" = \"" + $attr[i] +"\" ";
				}
			}
		}
		if(!_Phoenix.islayout){
			_Phoenix.dataView += '<input type="text" name="'+$name+'" '+attString+'>';
		}else{
			_Phoenix.layout += '<input type="text" name="'+$name+'" '+attString+'>';
		}
		return true;
	}
	this.inputEmail= function($name = null,$attr = {}){
		if(this.addStarFrom == false && this.CurentName == null){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "email"
		});
		var attString = "";
    	if($attr != null){
			for(var i in $attr){
				if(typeof($attr[i]) !== "function"){
					attString += i +" = \"" + $attr[i] +"\" ";
				}
			}
		}
		if(!_Phoenix.islayout){
			_Phoenix.dataView += '<input type="email" name="'+$name+'" '+attString+'>';
		}else{
			_Phoenix.layout += '<input type="email" name="'+$name+'" '+attString+'>';
		}
		return true;
	}
	this.inputTextarea = function($name = null,$attr = {}){
		if(this.addStarFrom == false && this.CurentName == null){
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
		if(this.addStarFrom == false && this.CurentName == null){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "password"
		});
		var attString = "";
    	if($attr != null){
			for(var i in $attr){
				if(typeof($attr[i]) !== "function"){
					attString += i +" = \"" + $attr[i] +"\" ";
				}
			}
		}
		if(!_Phoenix.islayout){
			_Phoenix.dataView += '<input type="password" name="'+$name+'" '+attString+'>';
		}else{
			_Phoenix.layout += '<input type="password" name="'+$name+'" '+attString+'>';
		}
		return true;
	}
	this.inputMoth = function($name = null,$attr = {}){
		if(this.addStarFrom == false && this.CurentName == null){
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
		if(this.addStarFrom == false && this.CurentName == null){
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
		if(this.addStarFrom == false && this.CurentName == null){
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
		if(this.addStarFrom == false && this.CurentName == null){
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
		if(this.addStarFrom == false && this.CurentName == null){
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
		if(this.addStarFrom == false && this.CurentName == null){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "file"
		});
		var attString = "";
    	if($attr != null){
			for(var i in $attr){
				if(typeof($attr[i]) !== "function"){
					attString += i +" = \"" + $attr[i] +"\" ";
				}
			}
		}
		if(!_Phoenix.islayout){
			_Phoenix.dataView += '<input type="file" name="'+$name+'" '+attString+'>';
		}else{
			_Phoenix.layout += '<input type="file" name="'+$name+'" '+attString+'>';
		}
		return true;
	}
	this.inputSubmit = function($name,$attr = {}){
		if(this.addStarFrom == false && this.CurentName == null){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before add item form!"});
			return false;
		}
		this.ListForm[this.CurentName].push({
			name : $name,
			attr : $attr,
			type : "file"
		});
		var attString = "";
    	if($attr != null){
			for(var i in $attr){
				if(typeof($attr[i]) !== "function"){
					attString += i +" = \"" + $attr[i] +"\" ";
				}
			}
		}
		if(!_Phoenix.islayout){
			_Phoenix.dataView += '<input type="submit" name="'+$name+'" '+attString+'>';
		}else{
			_Phoenix.layout += '<input type="submit" name="'+$name+'" '+attString+'>';
		}
		return true;
	}
	this.end = function(){
		if(this.addStarFrom == false && this.CurentName == null){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please start form before end form!"});
			return false;
		}
		if(!_Phoenix.islayout){
			_Phoenix.dataView += '</form>';
		}else{
			_Phoenix.layout += '</form>';
		}
		
		return true;
	}
}
module.exports = Form;