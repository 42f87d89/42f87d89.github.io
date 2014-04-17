//TODO: add zoom and scrolling. Make things halt when they get out of hand
var cvs;
var ctx;

document.addEventListener('DOMContentLoaded', function(){
	cvs = document.createElement("canvas");
	cvs.id = "CVS";
	cvs.width = "800";
	cvs.height = "540";
	
	document.getElementById("inject").appendChild(cvs);
	
	ctx = cvs.getContext("2d");
});

var pStack = [];
var aStack = [];
var sys = "";
var animated = false;
var length = 0;
var rules = [];
var turn = 0;

var O = [400, 540];
var pos = O;
var angle = 90;

var halt=false;

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
	
	sys=evolve(sys, getById("n"), animated);
	draw(sys);
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
	out("drawing " + system);
	
	ctx.clearRect(0,0,cvs.width,cvs.height);
	
	for(i = 0; i<system.length; i++){
		c=system[i];
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
		else{
			var draw=true;
			var nodes = getById("nodes");
			for(ns=0;ns<nodes.length;ns++){
				if(c == nodes[ns]) draw=false;
			}
			if(draw){
				trLine(pos[0], pos[1], length, angle);
				pos=[pos[0]+(length)*Math.cos(0.01745329*angle), //This is not very good code
				     pos[1]-(length)*Math.sin(0.01745329*angle)];
			}
		}
	}
}

function move(x,y){
	O = [x,cvs.height-y];
	pos = O;
	pStack=[];
	aStack=[];
	draw(sys);
}

function zoom(size){
	//add return fail/success
	length = size;
	pos = O;
	pStack=[];
	aStack=[];
	draw(sys);
}

function compress(system){
	//Might be easier/better to regex
	//Limited to compressing only the same character AABB->2(A)2(B) but ABAB -> ABAB
	var newSys = "";
	for(i=0;i<system.length;i++){
		if(Number(system[i])%1==0||system[i]=="("||system[i]==")"){
			newSys += system[i];
			continue;
		}
		if(system[i]==system[i+1]){
			var num=2;
			while(num<system.length-i){
				if(system[i]!=system[i+num]){
					break;
				}
				num++;
			}
			newSys += num + "(" + system[i] + ")"
			i+=num-1;
		}
		else newSys += system[i];
	}
	return newSys;
}

function rgxComp(system){
	var cprSys = "";
	var splitSys = system.replace(/((.+)\2+)/g, ",$1,").split(",");
	cprSys += splitSys[0];
	//var matches = system.match(/((.+)\2+)/g); //matches contains an array of strings that have the same sequence repeated
	for(i=1;i<splitSys.length;i++){
		
	}
	cprSys += splitSys[splitSys.length-1];
	
	//2(2(a))->4(a): find first ), count n adjacent ), from first ) go left and multiply n preceding numbers
	return cprSys;
}

function decompress(system){
	//3(AB2(c))->3(ABcc)
	//find first ), find matching (, expand that by the number in front of (
	var a=0; //last ( before b
	var b=0; //first )
	var c=0; //last number before a (from right to left)
	for(i=0;i<system.length;i++){
		if(system[i]=="(") a=i; //last open paren
		else if(system[i]==")"){
			b=i;
			break;
		}
	}
	if(a==0) return system; //not the best way to do this, but w/e
	for(i=a-1;i>=0;i--){
		if(!(Number(system[i])%1===0)) break;
		c=i;
	}
	var newSys=system.substring(0,c);
	for(i=0;i<Number(system.substring(c,a));i++) newSys += system.substring(a+1,b);
	newSys+= system.substring(b+1,system.length);
	return decompress(newSys);
}

function evolve(system, itr, anim){
	itr=itr?itr:0;
	anim=anim?anim:false;
	if(itr<1){
		return system;
	}
	var newSys = "";
	for(s = 0; s<system.length; s++){
		var replaced = false;
		for(r = 0; r<rules.length; r++){
			if(system[s] == (rule=rules[r].split("->"))[0]){
				newSys += rule[1];
				replaced = true;
				break;
			}
		}
		if(replaced == false){
			newSys += system[s];
		}
	}
	if(anim){//remove loop from here. Put outside
		pos=O;
		pStack=[];
		aStack=[];
		angle=90;
		draw(newSys);

		window.setTimeout(function(){evolve(newSys, itr-1,true)}, 1000);
	}
	else return evolve(newSys, itr-1, anim);
}
