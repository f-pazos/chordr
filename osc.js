// Felipe Pazos
// 10/2/2018
// File for all sound related code. 

'use strict'; 

/* [oscs] is a global array of AudioContext Oscillators. */ 
var oscs = [];

/* [active_oscs] keeps track of active oscillators. */
var active_oscs = [];

/* [play(c)] plays the chord defined by c. */ 
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
/* [initOscs(c)] initializes the oscillators necessary in oscs for all notes in 
 * chord c. */
var initOscs = function( c ){
    //Reset oscs. 
    oscs = [];

    console.log( c );
    //Create each oscillator. 
    for( var i = 0; i < c.length; i++){
        var o = context.createOscillator();
        var g = context.createGain();

        o.type = 'sine';
        o.frequency.value = c[i].pitch;

        g.gain.value = 0.05;

        o.connect( g ); 
        g.connect( context.destination );

        oscs.push( o );

    }
}


