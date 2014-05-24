function out(msg){
	document.getElementById("out").value += msg + "\n"
}

function get(){
	return document.getElementById("in").value;
}

function parse(input){
	input = input?input:document.getElementById("src").value
	var sys = [];
	var ndx = 0;
	//todo: remember pos of last [ and ]
	for(i = 0; i<input.length; i++){
		if(input[i] == ">"){
			if(sys[ndx] == undefined) sys[ndx] = 0;
			ndx++;
		}
		else if(input[i] == "<"){
			if(ndx>0) ndx--;
		}
		else if(input[i] == "+"){
			if(sys[ndx] == undefined) sys[ndx] = 1;
			else sys[ndx]++;
		}
		else if(input[i] == "-"){
			if(sys[ndx] == undefined) sys[ndx] = -1;
			else sys[ndx]--;
		}
		else if(input[i] == "["){//!!!!!!!!!!!!!!!!!!IMPORTANT: nesting is broken
			if(sys[ndx]) continue;
			else for(jump = false; !jump; i++){
				if(input[i] == "]") jump = true;
			}
			continue;
		}
		else if(input[i] == "]"){
			if(!sys[ndx]) continue;
			else for(jump = false; !jump; i--){
				if(input[i] == "[") jump = true;
			}
			continue;
		}
		else if(input[i] == "."){
			out(sys[ndx]?sys[ndx]:0);
		}
		else if(input[i] == ","){
			sys[ndx] = get();
		}
	}
	return sys;
}