function runCode() {
	var headID = document.getElementsByTagName("head")[0];
	var newScript = document.createElement("script");
	newScript.type = "text/javascript";
	newScript.innerHTML = document.getElementById("textarea").value;
	headID.appendChild(newScript);
}

var doc = document.createDocumentFragment()
