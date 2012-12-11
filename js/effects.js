function setBlur() {
	if(edited) saveForUndo();
	Pixastic.process(document.getElementById("image"), "blurfast", {
		amount : $('#blurlevel').val()
	});
    generateThumb();
	setUndoFrame();
	edited=true;
	if(!undoimage) {
		undoimage=image;
		edited=false;	
	}
}
function setBrightness() {
	if(edited) 	saveForUndo();
	Pixastic.process(document.getElementById("image"), "brightness", {
		brightness : $("#brightnesslevel").val(),
		legacy : true
	});
    generateThumb();
	setUndoFrame();
	edited=true;
	if(!undoimage) {
		undoimage=image;
		edited=false;	
	}
}
function setContrast() {
	if(edited)	saveForUndo();
	Pixastic.process(document.getElementById("image"), "brightness", {
		contrast : $("#contrastlevel").val(),
		legacy : true
	});
    generateThumb();
	setUndoFrame();
	edited=true;
	if(!undoimage) {
		undoimage=image;
		edited=false;	
	}
}
function setColor() {
	if(edited) 	saveForUndo();
	Pixastic.process(document.getElementById("image"), "coloradjust", {
		red : $("#redlevel").val(),
		green : $("#greenlevel").val(),
		blue : $("#bluelevel").val()
	});
    generateThumb();
	setUndoFrame();
	edited=true;
	if(!undoimage) {
		undoimage=image;
		edited=false;	
	}
}
function setDesaturate() {
	if(edited) 	saveForUndo();
	Pixastic.process(document.getElementById("image"), "desaturate", {
		average: true
	});
    generateThumb();
	setUndoFrame();
	edited=true;
	if(!undoimage) {
		undoimage=image;
		edited=false;	
	}
}
function setEdge1() {
	if(edited) 	saveForUndo();
	Pixastic.process(document.getElementById("image"), "edges", {
		mono: true,
		invert: true
	});
    generateThumb();
	setUndoFrame();
	edited=true;
	if(!undoimage) {
		undoimage=image;
		edited=false;	
	}
}
function setEdge2() {
	if(edited) 	saveForUndo();
	Pixastic.process(document.getElementById("image"), "edges2");
    generateThumb();
	setUndoFrame();
	edited=true;
	if(!undoimage) {
		undoimage=image;
		edited=false;	
	}
}
function setEmboss() {
	if(edited) 	saveForUndo();
	Pixastic.process(document.getElementById("image"), "emboss", {
		strength: 2.0,
		greyLevel: 150,
		direction:"topright",
		blend: true
		});
    generateThumb();
	setUndoFrame();
	edited=true;
	if(!undoimage) {
		undoimage=image;
		edited=false;	
	}
}
function setFlipH() {
	if(edited) 	saveForUndo();
	Pixastic.process(document.getElementById("image"),  "blurfast", {
		amount : 0
	});
    Pixastic.process(document.getElementById("image"), "fliph");
    generateThumb();
	setUndoFrame();
	edited=true;
	if(!undoimage) {
		undoimage=image;
		edited=false;	
	}
}
function setFlipV() {
	if(edited) 	saveForUndo();
	Pixastic.process(document.getElementById("image"),  "blurfast", {
		amount : 0
	});
	Pixastic.process(document.getElementById("image"), "flipv");
    generateThumb();
	setUndoFrame();
	edited=true;
	if(!undoimage) {
		undoimage=image;
		edited=false;	
	}
}
function setGlow() {
	if(edited) 	saveForUndo();
	Pixastic.process(document.getElementById("image"), "glow", {
		amount:0.25,
		radius:1.0
	});
    generateThumb();
	setUndoFrame();
	edited=true;
	if(!undoimage) {
		undoimage=image;
		edited=false;	
	}
}
function setHueSat() {
	if(edited) 	saveForUndo();
	Pixastic.process(document.getElementById("image"), "hsl", {
		hue : $("#huevalue").val(),
		saturation : $("#saturationvalue").val(),
		lightness : $("#lightnessvalue").val()
	});
    generateThumb();
	setUndoFrame();
	edited=true;
	if(!undoimage) {
		undoimage=image;
		edited=false;	
	}
}
function setInvert() {
	if(edited) 	saveForUndo();
	Pixastic.process(document.getElementById("image"), "invert");	
    generateThumb();
	setUndoFrame();
	edited=true;
	if(!undoimage) {
		undoimage=image;
		edited=false;	
	}
}
function setNoise() {
	if(edited) 	saveForUndo();
	Pixastic.process(document.getElementById("image"), "noise", {
		mono:true,
		amount:0.5,
		strength:0.5
	});
    generateThumb();
	setUndoFrame();
	edited=true;
	if(!undoimage) {
		undoimage=image;
		edited=false;	
	}
}
function setSepia() {
	if(edited)	saveForUndo();
	Pixastic.process(document.getElementById("image"), "sepia");
    generateThumb();
	setUndoFrame();
	edited=true;
	if(!undoimage) {
		undoimage=image;
		edited=false;	
	}
}
function setSolarize() {
	if(edited)	saveForUndo();
	Pixastic.process(document.getElementById("image"), "solarize");
    generateThumb();
	setUndoFrame();
	edited=true;
	if(!undoimage) {
		undoimage=image;
		edited=false;	
	}
}
function setCrop() {
	$('#cover').show();
	Pixastic.process(document.getElementById("image"),  "blurfast", { amount : 0 });
	var canvas = document.getElementById("image");
	crop0 = canvas.toDataURL("image/jpg");
	edited=true;
	if(edited)	saveForUndo();
	var ctx = canvas.getContext("2d");
	ctx.beginPath();  
	ctx.moveTo(20,20);  
	ctx.lineTo(20,200);  
	ctx.lineTo(100,200);
	ctx.lineTo(100,20);
	ctx.lineTo(20,20);
	ctx.stroke(); 
	$('#image').bind('mousedown', function(e) {
		cropX0 = e.pageX - $('#image').offset().left;
		cropY0 = e.pageY - $('#image').offset().top;		
		$('#image').bind('mousemove', function(e) {		
			cropX1 = e.pageX - $('#image').offset().left;
			cropY1 = e.pageY - $('#image').offset().top;
			
			var img = new Image(); 
			img.onload = function(){  
				var canvas = document.getElementById("image");
				var ctx = canvas.getContext("2d");
				ctx.drawImage(img,0,0);
				ctx.beginPath();  
				ctx.moveTo(cropX0,cropY0);  
				ctx.lineTo(cropX0,cropY1);  
				ctx.lineTo(cropX1,cropY1);
				ctx.lineTo(cropX1,cropY0);
				ctx.lineTo(cropX0,cropY0);
				ctx.stroke(); 
			};  
			img.src = crop0;
		});
	});
	$('#image').bind('mouseup',function(e) {
		$('#image').unbind('mousemove');
	});
}
function setCrop2() {
	var img = new Image(); 
	img.onload = function(){  
		var canvas = document.getElementById("image");
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img,0,0);
		Pixastic.process(document.getElementById("image"), "crop", {
			rect : { left : cropX0, top : cropY0, width : (cropX1-cropX0), height : (cropY1-cropY0) }
		});
		$('#image').css('height',(window.innerHeight-224)+"px");
		generateThumb();
		setUndoFrame();
		edited=true;
		if(!undoimage) {
			undoimage=image;
			edited=false;	
		}
		$('#cover').hide();
	};  
	img.src = crop0;
}
function quickbrightness() {
	var img = new Image(); 
	img.onload = function(){  
		var canvas = document.getElementById("image");
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img,0,0);
		Pixastic.process(document.getElementById("image"), "brightness", {
			brightness : $("#quickbrightnesslevel").val(),
			legacy : true
		});
		edited=true;
	};  
	img.src = crop0;
}
function quickcontrast() {
	var img = new Image(); 
	img.onload = function(){  
		var canvas = document.getElementById("image");
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img,0,0);
		Pixastic.process(document.getElementById("image"), "brightness", {
			contrast : $("#quickcontrastlevel").val(),
			legacy : true
		});
		edited=true;
	};  
	img.src = crop0;
}
