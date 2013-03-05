    var canvas = document.getElementById('sun');
    canvas.width = $(window).width();
    canvas.height = $(window).height();
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
        //context.shadowColor = '#000';
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
    	    //context.font = 'bold 30px monospace';
    	    //context.textAlign = "center";
	        //context.fillText("Global Warming!!!", centerX, 100);
	    }

	    //console.log(l);
        d(radius, color);

    }, 17);



// Command stuff
var about = new Array(
'<div class="command">vim about</div><div class="result">',
'I\'m an amateur h^cker - mainly working with HTML, CSS & JS.<br>',
'I\'m a big fan of minimalism and imperfectionism.<br>',
'Sorry girls, I\'m already in love :P',
'</div><div id="next" class="command"><blink>_</blink></div>'
);
var contact = new Array(
'<div class="command">vim contact</div>',
'H^ckers need Friends.',
'<dl><dt>Email</dt><dd>w.rexy.me@gmail.com</dd>',
'<dt>Twitter</dt><dd>rexy__me</dd></dl>',
'I\'m <b>not</b> looking for any new position & projects at the moment.',
'<div id="next" class="command"><blink>_</blink></div>'
);
var blog = new Array(
'<div class="command">vim blog</div><div class="result">',
'Oopps, it\'s not made public until this 14 Feb. ',
'See ya then! >;->',
'</div><div id="next" class="command"><blink>_</blink></div>'
);
/*var demos = new Array(
'<div class="command">vim demos</div>',
'Lot\'s of other shitty awesome demos are on their ways<br>',
'Stay tuned folks! >;->',
'<div id="next" class="command"><blink>_</blink></div>'
);*/
var philosophy = new Array(
'<div class="command">vim philosophy</div>',
'"Fear" is just another name of "Stupidity" & "Ignorance".<br>',
'"Experience" is not "Expertise". ',
'"Ready" is a must!<br>',
'"Attack" is a choice; "Peace" is a solution.<br>',
'"Impossible" is such an unthoughtful saying.',
'<div id="next" class="command"><blink>_</blink></div>'
);

// auto type text variables
var speed= 40;
var index=0; text_pos=0;
var str_length;
var contents, row;
var sectionName;
// Section elements
var contactSection = '<section id="contact"></section>';
var aboutSection = '<section id="about"></section>';
var blogSection = '<section id="blog"></section>';
var demosSection = '<section id="demos"></section>';
var philosophySection = '<section id="philosophy"></section>';

// Document ready 
$(function() {
    $(".primary a").click(function() {
        
        var name = $(this).html();
        // Check if the section is created || this link was clicked before
        if ($("#" + name).length == 0) {
            // Remove the current cmd - can improve!!!
            // Handle multiple clicks at the same time
            // Put this first to avoid appending the info section in advance
            try {
                var next = document.getElementById("next");
                next.parentNode.removeChild(next);
            } catch (err) {
                //console.log(err);
                return false;
            }
            // Remove link cursor
            $(this).css("cursor", "auto");
            // Append the section
            var dsSection = window[name + "Section"];
            $(".terminal").append(dsSection);
            type_text(name);
        }
    });
    
    $(window).resize(function() {
        if ($(".terminal").height() + 20 >= $(window).height()) {
            $("body").css("overflow-y", "auto");
        } else {
            $("body").css("overflow-y", "hidden");
        }
    });

});

// Parameter: string
var type_text = function(rex) {
    
    // localise the passing variable
    var rexy = window[rex];
    sectionName = rex;
    // Default
    str_length =  rexy[0].length;
    
    contents ='';
    // get the highest value
    row = Math.max(0,index-9);
    
    // ?? Convert the array to string ??
    while(row<index) {
        contents += rexy[row++]; 
    }
    // Display each character
    document.getElementById(rex).innerHTML = contents + rexy[index].substring(0,text_pos) + "_";
    // Check if it reached the length of a string
    if (text_pos++ == str_length)
    {
        text_pos=0;
        index++;
        // Check whether it reached the end of the array
        if(index!=rexy.length)
        {
          str_length=rexy[index].length;
          setTimeout("type_text(sectionName)",800);
        } else {
            //Finish - Restart the counters
            index = 0;
            text_pos = 0;
            contents = "";
        }
    } else {
        // interate through characters of each string
        setTimeout("type_text(sectionName)",speed);
    }
        
}
