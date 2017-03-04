var tones = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"];
var types = {
    "min": [0, 3, 7],
    "maj": [0, 4, 7],
    "dim": [0, 3, 6],
    "aug": [0, 4, 8],
};

var chord = {
    "type": "",
    "root": 0,
};

function buildChord(chord) {
    var result = "";
    for(var i = 0; i<types[chord.type].length; i++) {
        result += tones[(chord.root+types[chord.type][i])%12] + " "
    }
    return result;
}

function newChord() {
    document.getElementById("tones").innerText = "";

    chord.root = Math.floor(Math.random()*12);
    chord.type = Object.keys(types)[Math.floor(Math.random()*Object.keys(types).length)];

    document.getElementById("chord").innerText = tones[chord.root] + chord.type;
}

function showChord() {
    document.getElementById("tones").innerText = buildChord(chord);
}