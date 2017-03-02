var tones = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"];
var types = {
    "min": [0, 3, 7],
    "maj": [0, 4, 7]
}

var chord = {
    "type": "",
    "root": 0,
}

function buildChord() {
    return tones[(chord.root+types[chord.type][0])%12] + " " +
           tones[(chord.root+types[chord.type][1])%12] + " " +
           tones[(chord.root+types[chord.type][2])%12];
}

function newChord() {
    document.getElementById("tones").innerText = "";

    chord.root = Math.floor(Math.random()*12);
    if(Math.random() < 0.5) chord.type = "min";
    else chord.type = "maj";

    document.getElementById("chord").innerText = tones[chord.root] + chord.type;
}

function showChord() {
    document.getElementById("tones").innerText = buildChord();
}