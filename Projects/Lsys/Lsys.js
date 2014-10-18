"use restrict";
var sys;

function point(x, y){
	this.x = x;
	this.y = y;
}

function line(a, b, c, w){
	this.color = c;
	this.width = w;
	this.start = a;
	this.end = b;
}

line.prototype.draw = function(){
	ctx.strokeStyle = this.color;
	ctx.lineWidth = this.width;
	ctx.beginPath();
	ctx.moveTo(this.start.x>>0, this.start.y>>0);
	ctx.lineTo(this.end.x>>0, this.end.y>>0);
	ctx.stroke();
	ctx.closePath();
}

line.prototype.extend = function(p){
	this.end.x = p.x;
	this.end.y = p.y;
}

function LSys(seed, rules, length, turn){
	this.seed = seed;
	this.system = seed;
	this.rules = rules;
	this.length = length; //in pixels
	this.turn = turn;
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
	var popped = false;
	var isColin = true;
	var posn = new point(0, 0);
	var angl = 90;
	var lns = [new line(new point(0, 0), new point(0, 0), "#000000", 1)];
	var stack = {
		posns: [],
		angls: []
	}
	var colors = (function(){
		var asd = getById("Colors");
		var qwe = {};
		asd = asd.split(",");
		for(i = 0; i<asd.length; i++){
			asd[i].split(":");
			qwe[asd[i][0]] = asd[i][1];
		}

		return qwe;
	})();
	var widths = {};
	
	for(var i = 0; i < this.system.length; i++){
		var c = this.system[i];
		if(c == getById("Push")){
			stack.posns.push(new point(posn.x, posn.y));
			stack.angls.push(angl);
		}
		else if(c == getById("Pop")){
			posn = stack.posns.pop();
			newPosn = new point(123321, 123321)
			angl = stack.angls.pop();
			isColin = false;
			popped = true;
		}
		else if(c == getById("turnCC")){
			angl -= this.turn;
			isColin = false;
		}
		else if(c == getById("turnCW")){
			angl += this.turn;
			isColin = false;
		}
		else{
			var add = true;
			var nodes = getById("nodes").split(",");
			var color = colors[c]?colors[c]:"#000000";
			var width = widths[c]?width[c]:1;
			for(var ns=0; ns < nodes.length; ns++){
				if(c == nodes[ns]) add = false;
			}
			if(add){
				var newPosn = new point(posn.x + this.length*Math.cos(Math.PI/180*angl),
				                        posn.y + this.length*Math.sin(Math.PI/180*angl));

				var prevLine = lns[lns.length-1];
				if(isColin) prevLine.extend(posn);
				else{
					if(!popped) prevLine.extend(posn);
					lns.push(new line(posn, newPosn, color, width));
				}
				posn = new point(newPosn.x, newPosn.y);
			}
			isColin = true;
			popped = false
		}
	}
	return lns;
};

LSys.prototype.draw = function(){
	//Draws lines on canvas
	out("drawing " + this.system);
	for(var i = 0; i < this.lines.length; i += 1){
		this.lines[i].draw()
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
	ctx.translate((cvs.width/2)>>0 -0.5, cvs.height -0.5)
	ctx.scale(1,-1)
});

function getById(id){
	return document.getElementById(id).value;
}

function generate(){
	ctx.clearRect(-(cvs.width/2)>>0,-1,cvs.width,cvs.height);
	out("",1)
	sys = new LSys(
		getById("seed"),
		getById("Rules").split(","),
		getById("length"),
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
			ctx.clearRect(-cvs.width/2,-1,cvs.width,cvs.height);
			sys.system = sys.evolve();
			sys.lines = sys.parse();
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
	else document.getElementById("log").value += "\n" + msg + "\n";
	return msg;
}

function presets(){
	if(getById("preset") == "-");
	else if(getById("preset") == "Tree"){
		document.getElementById("seed"     ).value = "A";
		document.getElementById("Rules"    ).value = "A->B[+A][-A],B->BB";
		document.getElementById("n"        ).value = 8;
		document.getElementById("length"   ).value = 3;
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
		document.getElementById("length"   ).value = 2;
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
		document.getElementById("length"   ).value = 8;
		document.getElementById("nodes"    ).value = "X,Y";
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
		document.getElementById("length"   ).value = 2;
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
		document.getElementById("length"   ).value = 2;
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
		document.getElementById("length"   ).value = 2;
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
		document.getElementById("length"   ).value = 50;
		document.getElementById("nodes"    ).value = "";
		document.getElementById("turnCW"   ).value = "+";
		document.getElementById("turnCC"   ).value = "-";
		document.getElementById("turnAngle").value = "10";
		document.getElementById("Push"     ).value = "[";
		document.getElementById("Pop"      ).value = "]";
	}
}
