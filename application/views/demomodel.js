<!DOCTYPE html>
<html>
<head>
	<title>WellCome</title>
</head>
<body>
 	<h1> Demo Call model and view</h1>
 	<div>
	<?node 
		members.foreach(function(key,val){
			write(val.name + " "+ val.email + "<br/>");
		});
	?>
</div>
</body>
</html>