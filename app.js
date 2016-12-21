( function () {
	
	window.addEventListener( 'tizenhwkey', function( ev ) {
		if(ev.keyName == "back")
            window.webapis.motion.stop("HRM");
            tizen.application.getCurrentApplication().exit();
	} );
	alert("hello bisa4");
	var xmlhttp = null;
	xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function(){
	if (xmlhttp.readyState == xmlhttp.DONE){
	alert(xmlhttp.responseText);
	}
	else{
	alert(xmlhttp.statusText);
	}
	};
	xmlhttp.onerror = function(e){
	alert("onerror: " + xmlhttp.statusText);
	};

	xmlhttp.open("GET", "https://ihealth-mitrais.firebaseio.com/measure.json");

	xmlhttp.send();
	
	window.webapis.motion.start("HRM", onchangedCB);
	document.getElementById("test2").value = "starting....";
	function onchangedCB(hrmInfo) 
	{
		
	   if(hrmInfo.heartRate > 0) {
		   document.getElementById("test2").value =hrmInfo.heartRate;
	   } else {
		   document.getElementById("test2").innerHTML = "No heart rate detected.";
	   }
	}
	   
} () );



