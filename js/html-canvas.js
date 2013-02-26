setInterval(function() {

}, 1000);

function moon_init() {

    var canvas = document.getElementById('fireworks');
    var context = canvas.getContext('2d');
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    

    var radius = 20;
    var l = 0;
    var color = "white";
    var gw1Color = "#FFD824";
    var gw2Color = "#CC0000";


    function d(r, color) {
        context.beginPath();
        context.arc(centerX, centerY, r, 0, 2 * Math.PI, false);
        //context.closePath();
        context.fillStyle = color;
        context.fill();
        context.shadowColor = '#000';
        context.shadowBlur = 8;
        context.shadowOffsetX = 5;
        context.shadowOffsetY = 5;    
    }
    
    setInterval(function() {
        // Clear the canvas
        //context.clearRect(0,0,canvas.width,canvas.height);
	    l++;
	    if(l<=80) {
		    radius+=.2;
	    } else if (l==140) {
		    l=0;
	    } else {
		    radius-=.2;
	    }
	    
	    if (radius <= 20 && radius > 10) {
	        color = gw1Color;
	    } else if (radius > 40 && radius <= 140) {
	        color = gw2Color;
    	        // Add words
    	    context.font = 'bold 30px monospace';
    	    context.textAlign = "center";
	        context.fillText("Global Warming!!!", centerX, 100);
	    }

	    //console.log(l);
        d(radius, color);

    }, 17);
    
}
