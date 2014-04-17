var sys;
function System(seed, rules, length, turn, O){
	this.seed = seed;
	this.system = seed;
	this.rules = rules;
	this.length = length; //in pixels
	this.turn = turn;
	this.O = O;
	this.points = [];
	this.stack = {angles: [], positions: []};
}

System.prototype.evolve = function(){
	var newSys = "";
	for(s = 0; s<this.system.length; s++){
		var replaced = false;
		for(r = 0; r<this.rules.length; r++){
			if(this.system[s] == (rule = this.rules[r].split("->"))[0]){
				newSys += rule[1];
				replaced = true;
				break;
			}
		}
		if(replaced == false){
			newSys += this.system[s];
		}
	}
	return newSys;
};

System.prototype.parse = function(){
	//Turns sys into points
	var pos = this.O;
	var angle = 90;
	var pStk = [];
	var aStk = [];
	var pts = [];
	
	for(i = 0; i<this.system.length; i++){
		c=this.system[i];
		if(c == getById("Push")){
			this.stack.positions.push(pos);
			this.stack.angles.push(angle);
		}
		else if(c == getById("Pop")){
			pos = this.stack.positions.pop();
			angle = this.stack.angles.pop();
		}
		else if(c == getById("turnCC")){
			angle -= this.turn;
		}
		else if(c == getById("turnCW")){
			angle += this.turn;
		}
		else{
			var draw = true;
			var nodes = getById("nodes");
			for(ns=0; ns<nodes.length; ns++){//check if should make line
				if(c == nodes[ns]) draw = false;
			}
			if(draw){
				//SUPER GROSS CODE
				pts.push(pos); //maybe instead of pairs, make a breakpoint
				pos=[pos[0] + this.length*Math.cos(0.01745329*angle),  //PI/180 = 0.01745329
				     pos[1] - this.length*Math.sin(0.01745329*angle)]; //This is negative, so that y is inverted, to match with math
				pts.push(pos);
			}
		}
	}
	return pts;
};

System.prototype.draw = function(){
	//Draws points on canvas
	out("drawing " + this.system);
	for(i = 0; i<this.points.length; i += 2){	
		ctx.beginPath();
		ctx.moveTo(this.points[i][0], this.points[i][1]);
		ctx.lineTo(this.points[i+1][0], this.points[i+1][1]);
		ctx.stroke();
	}
};

System.prototype.move = function(pn){
	this.O = pn;
};

System.prototype.zoom = function(ln){
	this.length = ln;
};

var cvs; var ctx;
document.addEventListener('DOMContentLoaded', function(){
	cvs = document.createElement("canvas");
	cvs.id = "CVS";
	cvs.width = "800";
	cvs.height = "540";
	
	document.getElementById("inject").appendChild(cvs);
	
	ctx = cvs.getContext("2d");
});

function getById(id){
	return document.getElementById(id).value;
}

function generate(){
	ctx.clearRect(0,0,cvs.width,cvs.height);
	out("",1)
	var sys = new System(
		getById("seed"),
		getById("Rules").split(","),
		getById("length")*cvs.height,
		+getById("turnAngle"),  //+ casts to num
		[cvs.width/2,cvs.height]
	);
	if(!document.getElementById("anim").checked){
		for(i = getById("n"); i > 0; i--){
			sys.system = sys.evolve();
		}
		sys.points = sys.parse();
		sys.draw();
	}else{
		(function a(n){
			if(n<1) return;
			ctx.clearRect(0,0,cvs.width,cvs.height);
			sys.system = sys.evolve();
			sys.points = sys.parse();
			sys.draw();
			window.setTimeout(function(){a(n-1)},1000)
		})(getById("n"));
	}
}

function toPNG(){
	window.location = cvs.toDataURL("image/png");
}

function out(msg,clear){
	clear = clear ? true : false;
	
	if(clear) document.getElementById("log").value = "";
	else document.getElementById("log").value += "\n" + msg;
	return msg;
}

function presets(){
	if(getById("preset") == "-");
	else if(getById("preset") == "Tree"){
		document.getElementById("seed").value = "A";
		document.getElementById("Rules").value = "A->B[+A][-A],B->BB";
		document.getElementById("n").value = 8;
		document.getElementById("length").value = 0.003;
		document.getElementById("nodes").value = "";
		document.getElementById("turnCW").value = "+";
		document.getElementById("turnCC").value = "-";
		document.getElementById("turnAngle").value = "45";
		document.getElementById("Push").value = "[";
		document.getElementById("Pop").value = "]";
	}

	else if(getById("preset") == "SierpinskiTriangle"){
		document.getElementById("seed").value = "A";
		document.getElementById("Rules").value = "A->B-A-B,B->A+B+A";
		document.getElementById("n").value = 8;
		document.getElementById("length").value = 0.003;
		document.getElementById("nodes").value = "";
		document.getElementById("turnCW").value = "+";
		document.getElementById("turnCC").value = "-";
		document.getElementById("turnAngle").value = "60";
		document.getElementById("Push").value = "[";
		document.getElementById("Pop").value = "]";
	}

	else if(getById("preset") == "DragonCurve"){
		document.getElementById("seed").value = "++FX";
		document.getElementById("Rules").value = "X->X+YF+,Y->-FX-Y";
		document.getElementById("n").value = 12;
		document.getElementById("length").value = 0.01;
		document.getElementById("nodes").value = "F";
		document.getElementById("turnCW").value = "+";
		document.getElementById("turnCC").value = "-";
		document.getElementById("turnAngle").value = "90";
		document.getElementById("Push").value = "[";
		document.getElementById("Pop").value = "]";
	}

	else if(getById("preset") == "KochCurve"){
		document.getElementById("seed").value = "A";
		document.getElementById("Rules").value = "A->A-A++A-A";
		document.getElementById("n").value = 5;
		document.getElementById("length").value = 0.003;
		document.getElementById("nodes").value = "";
		document.getElementById("turnCW").value = "+";
		document.getElementById("turnCC").value = "-";
		document.getElementById("turnAngle").value = "60";
		document.getElementById("Push").value = "[";
		document.getElementById("Pop").value = "]";
	}

	else if(getById("preset") == "KochSnowflake"){
		document.getElementById("seed").value = "+A--A--A";
		document.getElementById("Rules").value = "A->A+A--A+A";
		document.getElementById("n").value = 5;
		document.getElementById("length").value = 0.003;
		document.getElementById("nodes").value = "";
		document.getElementById("turnCW").value = "+";
		document.getElementById("turnCC").value = "-";
		document.getElementById("turnAngle").value = "60";
		document.getElementById("Push").value = "[";
		document.getElementById("Pop").value = "]";
	}

	else if(getById("preset") == "WeirdSnowflake"){
		document.getElementById("seed").value = "+A--A--A";
		document.getElementById("Rules").value = "A->A-A++A-A";
		document.getElementById("n").value = 5;
		document.getElementById("length").value = 0.003;
		document.getElementById("nodes").value = "";
		document.getElementById("turnCW").value = "+";
		document.getElementById("turnCC").value = "-";
		document.getElementById("turnAngle").value = "60";
		document.getElementById("Push").value = "[";
		document.getElementById("Pop").value = "]";
	}

	else if(getById("preset") == "BushyTree"){
		document.getElementById("seed").value = "A";
		document.getElementById("Rules").value = "A->BB++[+A][---A]A";
		document.getElementById("n").value = 5;
		document.getElementById("length").value = 0.05;
		document.getElementById("nodes").value = "";
		document.getElementById("turnCW").value = "+";
		document.getElementById("turnCC").value = "-";
		document.getElementById("turnAngle").value = "10";
		document.getElementById("Push").value = "[";
		document.getElementById("Pop").value = "]";
	}
}