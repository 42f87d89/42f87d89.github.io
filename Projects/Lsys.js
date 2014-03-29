var cvs=document.getElementById("CVS");
var ctx=cvs.getContext("2d");

var pStack = [];
var aStack = [];
var sys = "";
var animated = false;//not working
var size = cvs.height/40;

var pos = [cvs.width/2,cvs.height];
var angle = 90;

function listener(){
	out("",1);
	sys = document.getElementById("seed").value;
	pos = [cvs.width/2,cvs.height];
	angle=90;
	
	evolve(document.getElementById("n").value, animated);
	draw(animated);
}

function out(msg,clear=0){
	if(clear) document.getElementById("log").value = "";
	else document.getElementById("log").value += "\n" + msg;
}

function trLine(x, y, r, a){ //Turtle line: cursor x pos, cursor y pos, legth of line, angle counterclock from y=0
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(x+r*Math.cos(0.01745329*a), y-r*Math.sin(0.01745329*a)); //the multiplier converts degrees to radians
	ctx.stroke();
}

function draw(){
	ctx.clearRect(0,0,cvs.width,cvs.height);
	out("drawing " + sys);
	for(i = 0; i<sys.length; i++){
		c=sys[i];
		if(c == document.getElementById("Push").value){
			pStack.push(pos);
			aStack.push(angle);
		}
		else if(c == document.getElementById("Pop").value){
			pos=pStack.pop();
			angle=aStack.pop();
		}
		else if(c == document.getElementById("turnCC").value){
			angle -= document.getElementById("turnAngle").value;
		}
		else if(c == document.getElementById("turnCW").value){
			angle -= -document.getElementById("turnAngle").value; //value is string, so "+" concatenates instead of adding. This is a lazy fix, could use Number() but meh
		}
		else{
			trLine(pos[0], pos[1], size, angle);
			pos=[pos[0]+(size)*Math.cos(0.01745329*angle),
			     pos[1]-(size)*Math.sin(0.01745329*angle)];
		}
	}
}

function evolve(itr=1, anim=false){
	//add regex to rules
	rules=document.getElementById("Rules").value.split(",");
	var newSys = ""; //to avoid weirdness, put new values into newsys, THEN put newsys in sys in the end of the function	
	for(i = 0; i<rules.length; i++){
		newSys = "";
		rule=rules[i].split("->");
		for(j = 0; j<sys.length; j++){
			//out("sys: " + sys);
			//out(rule + " on " + j + ": " + sys[j]);
			if(rule[0]==sys[j]){
				newSys += rule[1];
			}
			else{
				newSys += sys[j];
			}
			//out("newSys: " + newSys)
		}
		sys=newSys;
	}
	//out(sys + " became " + newSys + "\n");
	if(anim && itr>1){
		
		draw();
		setTimeout(evolve(itr-1, true), 1000);
	}
	else if(itr>1) evolve(itr-1, anim);
}
