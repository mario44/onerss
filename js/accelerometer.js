//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
var watchLastX=0;
var watchLastY=0;
var watchLastZ=0;


    function startWatch() {
        var options = { frequency: 2000 };
		try {watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);}
		catch(er){}
    }

    // Stop watching the acceleration
    function stopWatch() {
        if (watchID) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
        }
    }

    // onSuccess: Get a snapshot of the current acceleration
    function onSuccess(acceleration) {
		if (acceleration){
			var deltaX=acceleration.x - watchLastX;
			var deltaY=acceleration.y - watchLastY;
			var deltaZ=acceleration.z - watchLastZ;
			var suma=deltaY+deltaZ;
			watchLastY = acceleration.y;
			$('#infotest').innerHTML=' :x:'+deltaX+' :y:'+deltaY+' :z:'+deltaZ+' :s:'+suma;
			if (acceleration.y < -3) {goback(); return;}
			if (acceleration.y > 9)  {gonext(); return;}
			//acceleration.timestamp
		}
    }

    // onError: Failed to get the acceleration
    function onError() {
        //alert('onError!');
    }

//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
