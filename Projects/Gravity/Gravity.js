var G = 0.008844; // In pixels (Sun radii) cubed per earth masses per 1/60 seconds squared

var cvs;
var ctx;

var prs;
var body = [];

function square(x){
	return x*x;
}

function getDist(x1, y1, x2 ,y2){
	var dist = Math.sqrt(square(x1-x2)+square(y1-y2));
	return dist;
}

function getMousePos(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top};
}

/*cvs.addEventListener('click', function(event) {
	var mousePos = getMousePos(cvs, event);
	if(event.button == 0){
		body[body.length] = new circle(mousePos.x,
		                               mousePos.y,
		                               document.getElementById("size").value,
		                               document.getElementById("mass").value,
		                               document.getElementById("speed").value,
		                               document.getElementById("angle").value
		);
	}
});*/

function circle (x,y,r,m,v,A){
	this.x = x;
	this.y = y;
	this.r = r;
	this.mG = m*G;
	this.xVel = v*Math.cos(A*(Math.PI/180));
	this.yVel = v*Math.sin(A*(Math.PI/180));
}	

circle.prototype.draw = function(){
	ctx.fillText(Math.floor(this.x)+"\n"+Math.floor(this.y),this.x+this.r+1,this.y);
	ctx.beginPath();
	ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();
}

circle.prototype.move = function(){
	this.draw();
	if (this != prs){
		this.x += this.xVel;
		this.y += this.yVel;
	}
}

circle.prototype.gravitate = function(){
	if(this.x>10000||this.y>10000){
		this.mG=0;
	}
	else{
		for (var ii=0; ii<body.length; ii++){
			if (this != body[ii]){
				var R = getDist(body[ii].x,body[ii].y,this.x,this.y);
				this.xVel += body[ii].mG*(body[ii].x-this.x)/(R*R*R);
				this.yVel += body[ii].mG*(body[ii].y-this.y)/(R*R*R);
			}
		}
	}
}

body[0] = new circle(400,270,10,100000,0,0);

var time = 0;
function loop (){
	ctx.clearRect(0,0,cvs.width,cvs.height);
	if(body.length+1){
		for (var i=0; i<body.length; i++){
			body[i].gravitate();
		}
		for (var i=0; i<body.length; i++){
			body[i].move();
		}

	}
	time += 1/60;
	ctx.fillText(Math.floor(time*10)/10,500,400);
	if(1){
		setTimeout(loop, 1000/60);
	}
}
document.addEventListener('DOMContentLoaded', function(){
	cvs = document.createElement("canvas");
	cvs.id = "CVS";
	cvs.width = "800"; //Make this dynamic
	cvs.height = "540";

	cvs.addEventListener('click', function(event) {
		var mousePos = getMousePos(cvs, event);
		if(event.button == 0){
			body[body.length] = new circle(mousePos.x,
			                               mousePos.y,
			                               document.getElementById("size").value>>0,
			                               document.getElementById("mass").value>>0,
			                               document.getElementById("speed").value>>0,
			                               document.getElementById("angle").value>>0
			);
		}
	});

	document.getElementById("inject").appendChild(cvs);

	ctx = cvs.getContext("2d");
	ctx.font = "10px Arial"
	loop();
});
