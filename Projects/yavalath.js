var cvs;
var ctx;
document.addEventListener('DOMContentLoaded', function(){

	cvs = document.createElement("canvas");
	cvs.id = "CVS";
	cvs.width = window.innerWidth-10;
	cvs.height = window.innerHeight-10;
	
	document.getElementById("inject").appendChild(cvs);
	
	ctx = cvs.getContext("2d");
	
	drawGrid();
	loop();
});


function drawGrid(){
	pos
	moveTo(0,cvs.height/2);
	lineTo()
}

function loop(){
	
}
