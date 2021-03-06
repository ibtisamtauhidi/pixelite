function appInit() {
	$('#controlFrame').css('height',(window.innerHeight-300)+'px');
	$('#cover').css('height',(window.innerHeight-398)+'px');
	$('#splashIMG').css('max-height',(window.innerHeight-200)+'px');
	$('#fileSelect').css('height',(window.innerHeight-62)+'px');
	$('#fileSelect').css('width',(window.innerWidth-272)+'px');
	$('#fileList').css('width',(window.innerWidth-252)+'px');
	$('#infoBox').css('width',(window.innerWidth-232)+'px');
	$('#infoBox').hide();
	$('#fileList').hide();
	$('#loading').remove();

	getStarted.addEventListener("click", function (e) {  
  		if (!clicked) {
    		fileElem.click();
  		}
	}, false);
	getStarted.addEventListener("dragenter", function(evt) {
	  evt.stopPropagation();
	  evt.preventDefault();
	}, false);
	getStarted.addEventListener("dragexit", function(evt) {
	  evt.stopPropagation();
	  evt.preventDefault();
	} , false);
	getStarted.addEventListener("dragover", function(evt) {
	  evt.stopPropagation();
	  evt.preventDefault();
	}, false);
	getStarted.addEventListener("drop", function(evt) {
		evt.stopPropagation();
		evt.preventDefault(); 
		var files = evt.dataTransfer.files;
		var count = files.length;
		if (count > 0)	handleFiles(files);									 											 
	}, false);
}
function appResize() {
	$('body').hide();
	$('#controlFrame').css('height',(window.innerHeight-300)+'px');
	$('#cover').css('height',(window.innerHeight-398)+'px');
	$('#splashIMG').css('max-height',(window.innerHeight-200)+'px');
	$('#fileSelect').css('height',(window.innerHeight-62)+'px');
	$('#fileSelect').css('width',(window.innerWidth-272)+'px');
	$('#fileList').css('width',(window.innerWidth-252)+'px');
	$('#infoBox').css('width',(window.innerWidth-232)+'px');
	$('#fileList').css('height',(window.innerHeight-224)+'px');
    if(image) $('#fileList').html("<img id='image' src='"+image+"' height='"+(window.innerHeight-224)+"' />");
	$('body').show();
}
function handleFiles(files) {  
  if (!files.length) {  
    fileList.innerHTML = "<p>No files selected!</p>";  
  } else {  
  	if(clicked) return;
  	clicked=true;
	$('#fileSelect').hide();
	$('#fileList').show();
	$('#infoBox').show();
	$('#fileList').css('height',(window.innerHeight-224)+'px');

    for (var i = 0; i < files.length; i++) {  
	
	
	  var reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          image = e.target.result;
		  var img = document.createElement("img");  
		  $('#fileList').html("<img id='image' src='"+image+"' height='"+(window.innerHeight-224)+"' />");
		  $('#infoBoxThumb').html("<div style='padding: 5px;'><img src='"+image+"' height='130px;' style='border: 5px solid #333;'/></div>");
		  $('#cover').fadeOut();
		  setZoomFrame(1024,(window.innerHeight-224));
        };
      })(files[i]);

      // Read in the image file as a data URL.
      reader.readAsDataURL(files[i]);
	}  
    	
  }  
} 

function setEffect(id) {
	$('#controlSettingsHTML').hide();
	switch(id) {
		case 'BLUR'		:	$('#controlSettingsHTML').html("<div id='controlSettingsTitle'>BLUR</div><div id='controlSettingsOptions'><div id='controlSettingsSlider'><input type='range' id='blurlevel' min='0.0' max='5.0' step='0.1' value='2'></div><div><button class='controlSettingsButton' onClick='setBlur();'>BLUR</button><button class='controlSettingsButton' onClick='cancelEffect();'>CANCEL</button></div></div>");
							break;
							
		case 'BRIGHTNESS'		:	$('#controlSettingsHTML').html("<div id='controlSettingsTitle'>BRIGHTNESS</div><div id='controlSettingsOptions'><div id='controlSettingsSlider'><input type='range' id='brightnesslevel' min='-150' max='150' step='1' value='0'></div><div><button class='controlSettingsButton' onClick='setBrightness();'>SET</button><button class='controlSettingsButton' onClick='cancelEffect();'>CANCEL</button></div></div>");
							break;
							
		case 'CONTRAST'		:	$('#controlSettingsHTML').html("<div id='controlSettingsTitle'>CONTRAST</div><div id='controlSettingsOptions'><div id='controlSettingsSlider'><input type='range' id='contrastlevel' min='-1.0' max='3.0' step='0.1' value='0'></div><div><button class='controlSettingsButton' onClick='setContrast();'>SET</button><button class='controlSettingsButton' onClick='cancelEffect();'>CANCEL</button></div></div>");
							break;
							
							
		case 'COLOR'		:	$('#controlSettingsHTML').html("<div id='controlSettingsTitle'>COLOR ADJUST</div><div id='controlSettingsOptions'><div id='controlSettingsSlider' style='font-size: 11px;'><span style='color: red;'>RED</span><br /><input type='range' id='redlevel' min='-1.0' max='1.0' step='0.1' value='0'><br /><br /><span style='color: green;'>GREEN</span><br /><input type='range' id='greenlevel' min='-1.0' max='1.0' step='0.1' value='0'><br /><br /><span style='color: #06F;'>BLUE</span><br /><input type='range' id='bluelevel' min='-1.0' max='1.0' step='0.1' value='0'></div><div><button class='controlSettingsButton' onClick='setColor();'>SET</button><button class='controlSettingsButton' onClick='cancelEffect();'>CANCEL</button></div></div>");
							break;
							
							
		case 'CROP'			:	$('#controlSettingsHTML').html("<div id='controlSettingsTitle'>CROP</div><div id='controlSettingsOptions'><div id='controlSettingsSlider' style='font-size: 10px; color: #CCC;'>CROP IMAGE BY CLICKING AND DRAGGING MOUSE OVER PHOTO</div><div><button class='controlSettingsButton' onClick='setCrop2();'>SET</button><button class='controlSettingsButton' onClick='cancelCrop();'>CANCEL</button></div></div>");
								setCrop();
								break;

		case 'DESATURATE'	:	setDesaturate();
							break;

		case 'EDGE1'		:	setEdge1();
							break;


		case 'EDGE2'		:	setEdge2();
							break;
							

		case 'EMBOSS'		:	setEmboss();
							break;
							
		case 'FLIPH'		:	setFlipH();
							break;
							
		case 'FLIPV'		:	setFlipV();
							break;
							
		case 'GLOW'			:	setGlow();
							break;
							
		case 'HUESAT'		:	$('#controlSettingsHTML').html("<div id='controlSettingsTitle'>HUE / SATURATION</div><div id='controlSettingsOptions'><div id='controlSettingsSlider' style='font-size: 11px;'><span style='color: white;'>HUE</span><br /><input type='range' id='huevalue' min='-180' max='180' step='1' value='20' /><br /><br /><span style='color: white;'>SATURATION</span><br /><input type='range' id='saturationvalue' min='-100' max='100' step='1' value='40' /><br /><br /><span style='color: white;'>LIGHTNESS</span><br /><input type='range' id='lightnessvalue' min='-100' max='100' step='1' value='30' /></div><div><button class='controlSettingsButton' onClick='setHueSat();'>SET</button><button class='controlSettingsButton' onClick='cancelEffect();'>CANCEL</button></div></div>");
							break;
							


		case 'INVERT'	:	setInvert();
							break;
							
							
		case 'NOISE'	:	setNoise();
							break;
							
		case 'SEPIA'	:	setSepia();
							break;
		case 'SOLARIZE'	:	setSolarize();
							break;
	}
	$('#controlSettingsHTML').fadeIn();
}
function cancelEffect() {
	$('#controlSettingsHTML').fadeOut(500, function(){ $('#controlSettingsHTML').html("<br /><br /><br /><img src='img/splash.png' width='170px;' />"); $('#controlSettingsHTML').fadeIn(); });
}
function resetImage() {
	edited=false;
	undoimage=image;
	$('#fileList').html("<img id='image' src='"+image+"' height='"+(window.innerHeight-224)+"' />");
    $('#infoBoxThumb').html("<div style='padding: 5px;'><img src='"+image+"' height='130px;' style='border: 5px solid #333;'/></div>");
}
function generateThumb() {
	var canvas = document.getElementById("image");
	var img    = canvas.toDataURL("image/jpg");
	$('#infoBoxThumb').html("<div style='padding: 5px;'><img src='"+img+"' height='130px;' style='border: 5px solid #333;'/></div>");
}
function setUndoFrame() {
	$('#controlSettingsHTML').hide();
	$('#controlSettingsHTML').html("<div style='padding-top: 40px;'><button class='controlSettingsButton' onClick='undo();'>UNDO</button><br /><br /><br /><img src='./img/splash.png' width='170px;' /></div>");
	$('#controlSettingsHTML').fadeIn();
}
function saveForUndo() {
	var canvas = document.getElementById("image");
	undoimage = canvas.toDataURL("image/jpg");
}
function undo() {
	$('#fileList').html("<img id='image' src='"+undoimage+"' height='"+(window.innerHeight-224)+"' />");
    $('#infoBoxThumb').html("<div style='padding: 5px;'><img src='"+undoimage+"' height='130px;' style='border: 5px solid #333;'/></div>");
	$('#controlSettingsHTML').html("<br /><br /><br /><img src='./img/splash.png' width='170px;' />");
	edited=false;
}
function zoom() {
	$('#image').css('height',$('#zoomlevel').val()+'px');
}
function setZoomFrame(maxm,curr) {	
	$('.infoIcon').css('background','#333');
	$('#zoomButton').css('background','#555');
	$('#infoBoxSetting').hide();
	$('#infoBoxSetting').html("<div id='zoom' style='text-align: right; font-family: myFont1; color: #FFF; padding-right: 5px;'>ZOOM</div><div style='background: #666; border-radius: 5px; margin-left: 50px; margin-top: 40px; margin-bottom: 10px; margin-right: 10px; padding-right: 10px; text-align: center; float: left;'><div style='float: left;'><img src='img/836188492660525616.png' style='padding: 3px; margin-right: 10px;'/></div><div style='float: left; padding-top: 10px; text-align: center;'><input id='zoomlevel' type='range' min='5' max='"+maxm+"' value='"+curr+"' step='1' onChange='zoom();'/></div><div style='float: left;'><img src='img/3274527452000960463.png' style='padding: 3px; margin-left: 10px; margin-right: 10px;' /></div></div><div style='background: #666; border-radius: 5px; margin-top: 40px; margin-bottom: 10px; text-align: center; float: left;' id='resetZoom' onMouseOver=\"$('#resetZoom').css('background','#777');\" onMouseOut=\"$('#resetZoom').css('background','#666');\"><img src='img/18621351541094580459.png' style='padding: 3px;' onClick=\"$('#image').css('height','"+(window.innerHeight-224)+"px');\"/></div>");
	$('#infoBoxSetting').fadeIn();
}
function setShare() {
	Pixastic.process(document.getElementById("image"),  "blurfast", { amount : 0 });
	var canvas = document.getElementById("image");
	crop0 = canvas.toDataURL("image/jpg");
	$('.infoIcon').css('background','#333');
	$('#shareButton').css('background','#555');
	$('#infoBoxSetting').hide();
	$('#infoBoxSetting').html("<div style='text-align: right; font-family: myFont1; color: #FFF; padding-right: 5px;'>QUICK FIX</div><div style=\"margin-top: 20px; text-align: center; font-size: 11px; color: #970;\">BRIGHTNESS<br /><input id='quickbrightnesslevel' type='range' min='-150' max='150' value='0' step='1' onChange='quickbrightness();' onMouseUp='generateThumb();'/><br /><br />CONTRAST<br /><input id='quickcontrastlevel' type='range' min='0' max='50' value='0' step='1' onChange='quickcontrast();' onMouseUp='generateThumb();'/></div>");
	$('#infoBoxSetting').fadeIn();
}
function setSave() {
	Pixastic.process(document.getElementById("image"),  "blurfast", { amount : 0 });
	var canvas = document.getElementById("image");
	crop0 = canvas.toDataURL("image/jpg");
	$('.infoIcon').css('background','#333');
	$('#saveButton').css('background','#555');
	$('#infoBoxSetting').hide();
	$('#infoBoxSetting').html("<div style='text-align: right; font-family: myFont1; color: #FFF; padding-right: 5px;'>SHARE / SAVE / EXIT</div><div style=\"margin-top: 20px; text-align: center;\"><img id='facebook' onMouseOver=\"$('#facebook').css('background','#777');\" onMouseOut=\"$('#facebook').css('background','#666');\" src=\"img/5584308811493483683.png\" style=\"border-radius: 5px; padding: 10px; margin: 5px; background: #666;\" onClick='shareFacebook();'/><img id='twitter' onMouseOver=\"$('#twitter').css('background','#777');\" onMouseOut=\"$('#twitter').css('background','#666');\" src=\"img/13380647351485798528.png\" style=\"border-radius: 5px; padding: 10px; margin: 5px; background: #666;\" onClick='downloadImage();'/><img id='google' onMouseOver=\"$('#google').css('background','#777');\" onMouseOut=\"$('#google').css('background','#666');\" src=\"img/1610475607355154324.png\" style=\"border-radius: 5px; padding: 10px; margin: 5px; background: #666;\" onClick='restartApp();'></div></div>");	
	$('#infoBoxSetting').fadeIn();
}
function shareFacebook() {
	if(confirm("This will share the image on Facebook. Continue?")) {
		$('body').append("<div id='loading'><span style=\"color: #060; font-family: impact; text-shadow: 5px 5px #000; font-size: 23px;\"><img src=\"./img/splash.png\" width=\"200px;\" /><br /><br /></span><img src=\"img/loading.gif\" /><br /><br /><span style=\"color: #CCC; font-family: Verdana, Geneva, sans-serif; font-size: 10px;\">Please wait while we save the image...</span></div>")
		$.post("./save", { 
			   id: 1,
			   image: document.getElementById("image").toDataURL("image/png")
			},
   			function(data) {
				$('#loading').html("<span style=\"color: #CCC; font-family: Verdana, Geneva, sans-serif; font-size: 10px;\">Redirecting... please wait.</span>");
				window.location="./share/"+data;
 			});
	}
}
function downloadImage() {
	Pixastic.process(document.getElementById("image"),  "blurfast", { amount : 0 });
	var canvas = document.getElementById("image");
	$('body').append("<div id='downloadFrame' style='background: rgba(11,11,11,0.9); text-align: center; padding-top: 50px; overflow: auto; position: absolute; top: 0px; left: 0px; bottom: 0px; right: 0px; z-index: 4; font-family: Verdana; color: #ccc; font-size: 11px;'>RIGHT CLICK AND SELECT <em>Save image as...</em><br /><br /><img src='"+canvas.toDataURL('image/png')+"' style='border: 5px solid #000;' /><br /><br /><button onClick=\"$('#downloadFrame').fadeOut(500, function() { $('#downloadFrame').remove(); });\">CLOSE</button></div>");
}
function restartApp() {
	window.location.reload();
}
