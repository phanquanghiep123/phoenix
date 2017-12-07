function Form() {
	this.stringFrom  = "";
	this.ListForm    = {};
	this.CurentName  = null;
	this.Status      = true;
	this.addStarFrom = false;
	this.attrForm    = {};
	this.start = function($name = null,$attr = {}){
		if(this.Status == false && this.CurentName == null){
			_Phoenix.info.error.push({detail:this ,message : "Error: Please end form before start form!"});
			return false;
		}
		this.CurentName = $name;
		this.ListForm[this.CurentName] = [];
        this.attrForm    = $attr;
		this.Status      = false;
		this.addStarFrom = true;
		var attString;
		if(this.attrForm != null){
			for(var i in this.attrForm){
				if(typeof(this.attrForm[i]) !== "function"){
					attString += i +" = \"" + this.attrForm[i] +"\" ";
				}
			}
		}
		if(!_Phoenix.islayout){
			_Phoenix.dataView += '<form name="'+this.CurentName+'" '+attString+'>';
		}else{
			_Phoenix.layout += '<form name="'+this.CurentName+'" '+attString+'>';
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
			_Phoenix.dataView += '<input type="text" class="form-control" name="'+$name+'" '+attString+'>';
		}else{
			_Phoenix.layout += '<input type="text" class="form-control" name="'+$name+'" '+attString+'>';
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
			_Phoenix.dataView += '<input type="email" class="form-control" name="'+$name+'" '+attString+'>';
		}else{
			_Phoenix.layout += '<input type="email" class="form-control" name="'+$name+'" '+attString+'>';
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
			_Phoenix.dataView += '<input type="password" class="form-control" name="'+$name+'" '+attString+'>';
		}else{
			_Phoenix.layout += '<input type="password" class="form-control" name="'+$name+'" '+attString+'>';
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