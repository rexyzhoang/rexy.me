/* Author:
    Rexy.me
    Info:
        v.1.0: 264 
        v.2.0: 260 (-15)
                lines of codes
    Note:   Should refactor this code asap
            (39 & 123 lines of CSS & JS codes respectively.)
    # Possible improvement:
    # 1. Sound on/off
    # 2. Text effects
    Rooms for improvement:
    + Auto br
    + Click when the "next" command is displaying... => small error
    + Terminal Too long: => temp fix by setting oveflow auto
    + Command fire once only: FIXED
    + Remove current command: start from the prev
    + Auto type text function: GOOD

*/

// Browser detection
navigator.sayswho= (function(){
  var N= navigator.appName, ua= navigator.userAgent, tem;
  var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
  if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
  M= M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];
  return M;
 })();
//console.log(navigator.sayswho);

// Go
window.onload = function() {
    // Chrome
    if (navigator.sayswho[0] == "Chrome") {
        Fireworks.initialize();
        //moon_init();
        run();
    } else if (navigator.sayswho[0] == "MSIE") {
        $("body").html("<b>IE doens't just suck. It sucks badly. You should NEVER ever ever EVER use IE! - rexy.me</b>");      
    } else {
        $(".chrome-msg").fadeIn();
        //after();
    }
};

// Simulate mouse events
var dispatchMouseEvent = function(target, var_args) {
  var e = document.createEvent("MouseEvents");
  // If you need clientX, clientY, etc., you can call
  // initMouseEvent instead of initEvent
  e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
  target.dispatchEvent(e);
};

var count = 5; // for countingdown
var isfakeClick = true; // for different fireworks sounds 
// Moon canvas
var moon = document.getElementById('moon');
moon.width = $(window).width();
moon.height = $(window).height();
var mcontext = moon.getContext('2d');

// Fireworks Countdown
var run = function() {

    var canvas = document.getElementById('fireworks');
    var main1Context = canvas.getContext('2d');
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    // Sound notification
    var imageObj = new Image();
    imageObj.onload = function() {
        mcontext.drawImage(imageObj, moon.width-50, 0);
    };
    imageObj.src = 'img/sound-icon.png';
	    
    // Countdown counter
    var counter=setInterval(timer, 1000); // will run it every 1 second
    
    // Countdown timer
    function timer()
    {
        count = count-1;
        if (count <= 0) {
            clearInterval(counter);
            //counter ended, do something here
            return;
        }
        // Countdown Clock  
        main1Context.font = 'bold 80px monospace';
        main1Context.fillStyle = 'white';
    	main1Context.textAlign = "center";
        main1Context.fillText("00:0" + count, centerX, centerY);
    }

    // After counting down, set fireworks
    setTimeout(function() {
        // Play the long sound first
        Sound.play("34955^fireworks");
        Sound.play("HappyNewYear_Abba");
        dispatchMouseEvent(home, 'mouseup', true, true); 
        setTimeout(function() {
            for (var i=0; i < 2; i++) {
                dispatchMouseEvent(home, 'mouseup', true, true);
            }
        }, 3000);
        setTimeout(function() {
            for (var i=0; i < 8; i++) {
                dispatchMouseEvent(home, 'mouseup', true, true);
            }
        }, 6000);
        setTimeout(function() {
            for (var i=0; i < 18; i++) {
                dispatchMouseEvent(home, 'mouseup', true, true);
            }
        }, 10000);

        setTimeout(function() {
            after();
        }, 10000);
    }, 5000);

}

// Wishes 
function after() {

    var mcenterX = moon.width / 2;
    var mcenterY = moon.height / 2;
    var txt = "rexy.me wishes you & your family \n a Happy & Properous 'Tet' - Lunar New Year!"
    var lines = txt.split('\n');
    var lineheight = 30;
    var blur = 10;

    mcontext.font = 'bold 21px monospace';
    mcontext.fillStyle = 'white';
	mcontext.textAlign = "center";
    mcontext.textBaseline = "top";
    mcontext.shadowColor = "white";
    mcontext.shadowOffsetX = blur/3;
    mcontext.shadowOffsetY = 0;
    mcontext.shadowBlur = blur;
	
	for (var i = 0; i < lines.length; i++)
        mcontext.fillText(lines[i], mcenterX, 100 + (i*lineheight));
        
    isfakeClick = false;
}

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
