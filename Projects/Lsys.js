var cvs;
var ctx;

document.addEventListener('DOMContentLoaded', function(){

	cvs = document.createElement("canvas");
	cvs.id = "CVS";
	cvs.width = "800px";
	cvs.height = "540px";
	
	document.getElementById("inject").appendChild(cvs);
	
	ctx = cvs.getContext("2d");
	
});

/*var vars = {
	pStack: [],
	aStack: [],
	sys: "",
	animated: false,//not working
	length: 0,
	rules: [],
	turn: 0,
	
	O: [cvs.width/2,cvs.height],
	pos: O,
	angle: 90
};*/

var pStack = [];
var aStack = [];
var sys = "";
var animated = false;//not working
var length = 0;
var rules = [];
var turn = 0;

var O = [400, 540];
var pos = O;
var angle = 90;

/*function loop(func, delay=0){
	if(delay);
}*/

function getById(id){
	return document.getElementById(id).value;
}

function getVals(){
	sys = getById("seed");
	pos = O;
	angle = 90;
	turn = getById("turnAngle");
	animated = document.getElementById("anim").checked;
	rules = getById("Rules").split(",");
	length = getById("length")*cvs.height;
}

function topng(){
	window.location = cvs.toDataURL("image/png");
}

function listener(){
	out("",1);
	
	getVals();
	
	evolve(getById("n"), animated);
	draw();
}

function out(msg,clear){
	
	clear = clear ? true : false;
	
	if(clear) document.getElementById("log").value = "";
	else document.getElementById("log").value += "\n" + msg;
	return msg;
}

function trLine(x, y, r, a){ //Turtle line: cursor x pos, cursor y pos, legth of line, angle counterclock from y=0
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(x+r*Math.cos(0.01745329*a), y-r*Math.sin(0.01745329*a)); //the multiplier converts degrees to radians
	ctx.stroke();
}

function draw(system){
	
	system = system ? system : "";
	
	ctx.clearRect(0,0,cvs.width,cvs.height);
	out("drawing " + sys);
	for(i = 0; i<sys.length; i++){
		c=sys[i];
		if(c == getById("Push")){
			pStack.push(pos);
			aStack.push(angle);
		}
		else if(c == getById("Pop")){
			pos=pStack.pop();
			angle=aStack.pop();
		}
		else if(c == getById("turnCC")){
			angle -= getById("turnAngle");
		}
		else if(c == getById("turnCW")){
			angle -= -getById("turnAngle"); //value is string, so "+" concatenates instead of adding. This is a lazy fix, could use Number() but meh
		}
		/*else if(c == getById("invisible")){
			
		}*/
		else{
			trLine(pos[0], pos[1], length, angle);
			pos=[pos[0]+(length)*Math.cos(0.01745329*angle),
			     pos[1]-(length)*Math.sin(0.01745329*angle)];
		}
	}
}

function evolve(itr, anim){
	if(itr<1) return;
	var newSys = "";
	for(s = 0; s<sys.length; s++){
		var replaced = false;
		for(r = 0; r<rules.length; r++){
			if(sys[s] == rules[r].split("->")[0]){
				newSys += rules[r].split("->")[1];
				replaced = true;
				break;
			}
		}
		if(replaced == false){
			newSys += sys[s];
		}
	}
	sys=newSys;
	evolve(itr-1, anim);
}
