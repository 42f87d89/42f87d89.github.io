function out(msg){
	document.getElementById("out").value += msg + "\n";
}

function get(){
	var raw = document.getElementById("in").value;
	inp = raw.split("\n");
	document.getElementById("in").value = raw.replace(inp[0]+"\n","")
	return inp[0];
}

function parse(src){
	document.getElementById("out").value = null;
	src = src?src:document.getElementById("src").value;
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
			sys[ndx] = get();
		}
	}
	return sys;
}