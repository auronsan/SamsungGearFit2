( function () {
	
	document.getElementById('send1').addEventListener("click", function() {
    alert("Berhasil terkirim kedatabase!");	
		var config = {
			    apiKey: "AIzaSyAaur_ZQezXFdXMCbnctsfFDOMp1NirXP0",
			    authDomain: "ihealth-mitrais.firebaseapp.com",
			    databaseURL: "https://ihealth-mitrais.firebaseio.com",
			    storageBucket: "ihealth-mitrais.appspot.com",
			    messagingSenderId: "1036085841953"
			  };
			  firebase.initializeApp(config);
			  var database = firebase.database();
		var $heart = document.getElementById('test2').value;
	    firebase.database().ref('patient/99').set({
	    	Heartbeat : $heart});
	});

	
	function onError(error){
		console.warn( "An error occurred " + error.message );
	}

	var systeminfo = {

		systeminfo: null,

		lowThreshold : 0.04,

		listenBatteryLowState: function(){
			var self = this;
			try {
				this.systeminfo.addPropertyValueChangeListener(
					'BATTERY',
					function change(battery){
						if(!battery.isCharging) {
							try {
								tizen.application.getCurrentApplication().exit();
							} catch (ignore) {
							}
						}
					},
					{
						lowThreshold : self.lowThreshold
					},
					onError
				);
			} catch (ignore) {
			}
		},

		checkBatteryLowState: function(){
			var self = this;
			try {
				this.systeminfo.getPropertyValue(
					'BATTERY',
					function(battery) {
						if(battery.level < self.lowThreshold && !battery.isCharging) {
							try {
								tizen.application.getCurrentApplication().exit();
							} catch (ignore) {
							}
						}
					},
					null);
			} catch (ignore) {
			}
		},

		init: function(){
			if (typeof tizen === 'object' && typeof tizen.systeminfo === 'object'){
				this.systeminfo = tizen.systeminfo;
				this.checkBatteryLowState();
				this.listenBatteryLowState();
			}
			else{
				console.warn('tizen.systeminfo is not available.');
			}
		}
	};

	systeminfo.init();
	
	
} () );
