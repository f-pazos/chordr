'use strict'; 


/* Some reference values */
var pitches = [261.6, 277.2, 293.7, 311.1, 329.6, 349.2, 370.0, 392.0, 415.3, 440.0, 466.2, 493.9]
var notenames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]


/* Given a note [n], freqs.get(n) gives the pitche value of that note. */
var freqs = new Map();

for(var i = 0; i< pitches.length; i++){
    freqs.set( notenames[i], pitches[i] );
}


/* [notes] is a set of the notes currently in the chord. */
var notes = new Set();

/* [oscs] is a global array of AudioContext Oscillators. */ 
var oscs = [];

/* [active_oscs] keeps track of active oscillators. */
var active_oscs = [];

/* [initOscs(c)] initializes the oscillators necessary in oscs for all notes in 
 * chord c. */
var initOscs = function( notes ){
    //Reset oscs. 
    oscs = [];

    var c = Array.from( notes ).map( x => freqs.get( x ));

    console.log( c );
    //Create each oscillator. 
    for( var i = 0; i < c.length; i++){
        var o = context.createOscillator();
        var g = context.createGain();

        o.type = 'sine';
        o.frequency.value = c[i];

        g.gain.value = 0.05;

        o.connect( g ); 
        g.connect( context.destination );

        oscs.push( o );

    }
}

/* [play()] is a void function that starts all of the oscillators defined in [oscs].*/ 
var play = function(c){
    console.log( c );
    initOscs( c );
    stop();
    for( var i = 0; i < oscs.length; i++){
        console.log( oscs[i] );
        oscs[i].start(0);
    }

    active_oscs = oscs;
}

/* [stop()] is a void function that stops all of the oscillators maintained in [oscs]. */
var stop = function(){
    for( var i = 0; i < active_oscs.length; i++){
        active_oscs[i].stop(0);
    }
}
$(document ).ready(function(){
    $("#start").on( 'click', function(){
        console.log( "start" );
        play( ["C", "E", "G"]);
    });

    $("#stop").on( 'click', function(){
        console.log( "stop" );
        stop();
    });

    $(".note").on( 'click', function(){
        var note = this.id;

        if(notes.has(note)){
            notes.delete( note );
            $(this).css( "background-color", "" );
        }
        else{
            notes.add( note );
            $(this).css( "background-color", "red" );
        }

        play( notes );


    });
});
var context = new ( window.AudioContext || window.webkitAudioContext)();

var osc = context.createOscillator();
osc.type = 'sine'; 
osc.frequency.value = 440;
osc.connect( context.destination );

oscs = [osc];


