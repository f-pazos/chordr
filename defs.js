//Felipe Pazos
//10/2/2018
//A file for object definitions. 

'use strict'; 

/* Some reference values */
var pitches = [261.6, 277.2, 293.7, 311.1, 329.6, 349.2, 370.0, 392.0, 415.3, 440.0, 466.2, 493.9]
var notenames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]


/* Given a note [n], freqs.get(n) gives the pitch value of that note. */
var freqs = new Map();

for(var i = 0; i< pitches.length; i++){
    freqs.set( notenames[i], pitches[i] );
}
/* A [Note] object represents a note. It has a pitch and an [optional] name. */
function Note( arg, name="" ){
    //If arg is a valid note name:
    if( typeof(arg) == "string" && notenames.includes(arg)){
          this.note = arg;
          this.pitch = freqs.get( arg ); 
    }
 
    else if (typeof(arg) == "number" && pitches.includes( arg) ){
        this.note = "" + arg;
        this.pitch = arg;
    }
}

Note.prototype.toString = function(){

    return "(" + this.note + ", " + this.pitch + ")"
}


/* A [Chord] object represents a set of notes, meant to be played at the same time.
 *  -[Chord.notes] is a Set of Note objects containing all the information about a
 *  note in the chord. */
function Chord( notes ){
    this.notes = notes;
}

Chord.prototype.toString = function(){
    let result = "";
    for(var i = 0; i < this.notes.length; i++){
        result += this.notes[i].toString() + "\n";
    }
    return result;
}

