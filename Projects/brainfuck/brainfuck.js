function out(msg){
	if(document.getElementById("ascii").checked){
		document.getElementById("out").value += String.fromCharCode(msg);
	}
	else document.getElementById("out").value += msg + "\n";
}

function get(){
	var raw = document.getElementById("in").value;
	inp = raw.split("\n");
	return inp;
}

function parse(src){
	document.getElementById("out").value = null;
	src = src?src:document.getElementById("src").value;
	inp = get();
	var sys = [0];
	var ndx = 0;
	/*//preprocessing. index parens
	for(;0;){
		if(0){
		}
	}*/
	for(i = 0; i<src.length; i++){
		if(src[i] == ">"){
			ndx++;
			if(sys[ndx] == undefined) sys[ndx] = 0;
		}
		else if(src[i] == "<"){
			if(ndx>0) ndx--;
		}
		else if(src[i] == "+"){
			sys[ndx]++;
		}
		else if(src[i] == "-"){
			sys[ndx]--;
		}
		else if(src[i] == "["){
			asdf = 0;
			if(!sys[ndx]) for(jump = false; !jump; i++){
				if(src[i] == "[") asdf++;
				else if(src[i] == "]"){
					asdf--;
					if(asdf == 0) jump = true;
				}
			}
			continue;
		}
		else if(src[i] == "]"){
			asdf = 0;
			if(sys[ndx]) for(jump = false; !jump; i--){
				if(src[i] == "]") asdf--;
				else if(src[i] == "["){
					asdf++;
					if(asdf == 0) jump = true;
				}
			}
			continue;
		}
		else if(src[i] == "."){
			out(sys[ndx]?sys[ndx]:0);
		}
		else if(src[i] == ","){
			sys[ndx] = inp.shift();
		}
	}
	return sys;
}