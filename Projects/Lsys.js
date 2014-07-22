
var sys;

function point(x, y, name){
	this.x = x;
	this.y = y;

	//debug, REMOVE
	this.name = name?name:"p";
}

point.prototype.draw = function (){
	ctx.beginPath();
	ctx.arc(this.x+sys.O.x, -this.y+sys.O.y, 5, 0, 6.3)
	ctx.fillText(this.name, this.x+3+sys.O.x, -this.y+3+sys.O.y)
	ctx.stroke()
}

function line(a, b){
	this.a = a;
	this.b = b;
}

line.prototype.draw = function(o){
	ctx.beginPath();
	ctx.moveTo(o.x+(this.a.x-0.5), o.y-(this.a.y-0.5));//0.5 because some dipshit decided to define the integer coords in a canvas to be between pixels
	ctx.lineTo(o.x+(this.b.x-0.5), o.y-(this.b.y-0.5));
	ctx.stroke();
}

line.prototype.isCoLin = function(p){
	if(!p) return false;
	if((this.a.x*(this.b.y - p.y) + this.b.x*(p.y - this.a.y) + p.x*(this.a.y - this.b.y)).toPrecision(3) == 0) return true;
	return false;
}

function LSys(seed, rules, length, turn, O){
	this.seed = seed;
	this.system = seed;
	this.rules = rules;
	this.length = length; //in pixels
	this.turn = turn;
	this.O = O;
	this.lines = [];
}

LSys.prototype.evolve = function(){
	var newSys = "";
	for(var s = 0; s < this.system.length; s++){
		var replaced = false;
		for(var r = 0; r < this.rules.length; r++){
			var rule;
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

LSys.prototype.parse = function(){
	//Turns sys into lines
	var posn = new point(0, 0);
	var angl = 90;
	var lns = [new line(posn, posn)];
	var stack = {
		posns: [],
		angls: []
	}
	
	for(var i = 0; i < this.system.length; i++){
		var c = this.system[i];
		if(c == getById("Push")){
			stack.posns.push(posn);
			stack.angls.push(angl);
		}
		else if(c == getById("Pop")){
			posn = stack.posns.pop();
			angl = stack.angls.pop();
		}
		else if(c == getById("turnCC")){
			angl -= this.turn;
		}
		else if(c == getById("turnCW")){
			angl += this.turn;
		}
		else{
			var add = true;
			var nodes = getById("nodes");
			for(var ns=0; ns < nodes.length; ns++){
				if(c == nodes[ns]) add = false;
			}
			if(add){
				var newPosn = new point(Math.round(posn.x + this.length*Math.cos(Math.PI/180*angl)).toPrecision(3)>>0,
				                        Math.round(posn.y + this.length*Math.sin(Math.PI/180*angl)).toPrecision(3)>>0, "np");

				var prevLine = lns[lns.length-1];
				if(prevLine.isCoLin(posn)) prevLine.b = new point(posn.x, posn.y);
				if(!prevLine.isCoLin(newPosn)) lns.push(new line(posn, newPosn));
				posn = new point(newPosn.x, newPosn.y, "p");
			}
		}
	}
	return lns;
};

LSys.prototype.draw = function(){
	//Draws lines on canvas
	out("drawing " + this.system);
	for(var i = 0; i < this.lines.length; i += 1){
		this.lines[i].draw(this.O)
	}
};

LSys.prototype.move = function(pn){//REDO
	//drag with mouse to move
};

LSys.prototype.zoom = function(ln){//REDO
	//scroll to zoom
};

var cvs; var ctx;
document.addEventListener('DOMContentLoaded', function(){
	cvs = document.createElement("canvas");
	cvs.id = "CVS";
	cvs.width = String(document.getElementById("inject").offsetWidth-210); //Make this dynamic
	cvs.height = String(document.getElementById("inject").offsetHeight);
	
	document.getElementById("inject").appendChild(cvs);
	
	ctx = cvs.getContext("2d");
});

function getById(id){
	return document.getElementById(id).value;
}

function generate(){
	ctx.clearRect(0,0,cvs.width,cvs.height);
	out("",1)
	sys = new LSys(
		getById("seed"),
		getById("Rules").split(","),
		getById("length")*cvs.width,
		+getById("turnAngle"),  //+ casts to num
		new point((cvs.width/2)>>0,cvs.height)
	);
	if(!document.getElementById("anim").checked){
		for(var i = getById("n"); i > 0; i--){
			sys.system = sys.evolve();
		}
		sys.lines = sys.parse();
		sys.draw();
	}else{
		(function a(n){
			if(n<1) return;
			ctx.clearRect(0,0,cvs.width,cvs.height);
			sys.system = sys.evolve();
			sys.lines = sys.parse();
			sys.draw();
			window.setTimeout(function(){a(n-1)},1000)
		})(getById("n"));
	}
}

function isCoLin(a, b, c){
	if((!a)||(!b)||(!c)) return false;
	if((a.x*(b.y-c.y) + b.x*(c.y-a.y) + c.x*(a.y-b.y)).toPrecision(3) == 0) return true;
	return false;
}

function toPNG(){
	window.location = cvs.toDataURL("image/png");
}

function out(msg,clear){
	clear = clear ? true : false;
	
	if(clear) document.getElementById("log").value = "";
	else document.getElementById("log").value += "\n" + msg + "\n";
	return msg;
}

function presets(){
	if(getById("preset") == "-");
	else if(getById("preset") == "Tree"){
		document.getElementById("seed"     ).value = "A";
		document.getElementById("Rules"    ).value = "A->B[+A][-A],B->BB";
		document.getElementById("n"        ).value = 8;
		document.getElementById("length"   ).value = 0.003;
		document.getElementById("nodes"    ).value = "";
		document.getElementById("turnCW"   ).value = "+";
		document.getElementById("turnCC"   ).value = "-";
		document.getElementById("turnAngle").value = "45";
		document.getElementById("Push"     ).value = "[";
		document.getElementById("Pop"      ).value = "]";
	}

	else if(getById("preset") == "SierpinskiTriangle"){
		document.getElementById("seed"     ).value = "A";
		document.getElementById("Rules"    ).value = "A->B-A-B,B->A+B+A";
		document.getElementById("n"        ).value = 8;
		document.getElementById("length"   ).value = 0.002;
		document.getElementById("nodes"    ).value = "";
		document.getElementById("turnCW"   ).value = "+";
		document.getElementById("turnCC"   ).value = "-";
		document.getElementById("turnAngle").value = "60";
		document.getElementById("Push"     ).value = "[";
		document.getElementById("Pop"      ).value = "]";
	}

	else if(getById("preset") == "DragonCurve"){
		document.getElementById("seed"     ).value = "++FX";
		document.getElementById("Rules"    ).value = "X->X+YF+,Y->-FX-Y";
		document.getElementById("n"        ).value = 12;
		document.getElementById("length"   ).value = 0.01;
		document.getElementById("nodes"    ).value = "F";
		document.getElementById("turnCW"   ).value = "+";
		document.getElementById("turnCC"   ).value = "-";
		document.getElementById("turnAngle").value = "90";
		document.getElementById("Push"     ).value = "[";
		document.getElementById("Pop"      ).value = "]";
	}

	else if(getById("preset") == "KochCurve"){
		document.getElementById("seed"     ).value = "A";
		document.getElementById("Rules"    ).value = "A->A-A++A-A";
		document.getElementById("n"        ).value = 5;
		document.getElementById("length"   ).value = 0.003;
		document.getElementById("nodes"    ).value = "";
		document.getElementById("turnCW"   ).value = "+";
		document.getElementById("turnCC"   ).value = "-";
		document.getElementById("turnAngle").value = "60";
		document.getElementById("Push"     ).value = "[";
		document.getElementById("Pop"      ).value = "]";
	}

	else if(getById("preset") == "KochSnowflake"){
		document.getElementById("seed"     ).value = "+A--A--A";
		document.getElementById("Rules"    ).value = "A->A+A--A+A";
		document.getElementById("n"        ).value = 5;
		document.getElementById("length"   ).value = 0.002;
		document.getElementById("nodes"    ).value = "";
		document.getElementById("turnCW"   ).value = "+";
		document.getElementById("turnCC"   ).value = "-";
		document.getElementById("turnAngle").value = "60";
		document.getElementById("Push"     ).value = "[";
		document.getElementById("Pop"      ).value = "]";
	}

	else if(getById("preset") == "WeirdSnowflake"){
		document.getElementById("seed"     ).value = "+A--A--A";
		document.getElementById("Rules"    ).value = "A->A-A++A-A";
		document.getElementById("n"        ).value = 5;
		document.getElementById("length"   ).value = 0.002;
		document.getElementById("nodes"    ).value = "";
		document.getElementById("turnCW"   ).value = "+";
		document.getElementById("turnCC"   ).value = "-";
		document.getElementById("turnAngle").value = "60";
		document.getElementById("Push"     ).value = "[";
		document.getElementById("Pop"      ).value = "]";
	}

	else if(getById("preset") == "BushyTree"){
		document.getElementById("seed"     ).value = "A";
		document.getElementById("Rules"    ).value = "A->BB++[+A][---A]A";
		document.getElementById("n"        ).value = 5;
		document.getElementById("length"   ).value = 0.05;
		document.getElementById("nodes"    ).value = "";
		document.getElementById("turnCW"   ).value = "+";
		document.getElementById("turnCC"   ).value = "-";
		document.getElementById("turnAngle").value = "10";
		document.getElementById("Push"     ).value = "[";
		document.getElementById("Pop"      ).value = "]";
	}
}
