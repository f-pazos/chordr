/* Felipe Pazos */
/* Chordr: A musical project. */
/* 10/2/2018 */

'use strict'; 

/* [chord] is a chord object representing the chord currently being played. */
var chord = new Chord();

/* [notes] is a list of strings for what notes are pressed */
var notes = []

/* [chords] keeps track of the chords the user has made. */
var chords = []

/* Main jQuery stuff */
$(document ).ready(function(){
    //When you click on a note
    $(".note").on( 'click', function(){
        var name = this.id;
        var note = new Note( name );

        //If note in the chord, remove it.
        if(notes.includes(name)){
            notes.splice( notes.indexOf(name), 1 );
            $(this).css( "background-color", "" );
        }
        //Otherwise add it. 
        else{
            notes.push( name );
            $(this).css( "background-color", "red" );
        } 

        chord = notes.map( function(name){ return new Note( name )} );
        play( chord );
    });

    $("#stop").on( 'click', function(){
        notes = [];
        $(".note").css( "background-color", "" );
        play( new Chord );
    });

    $("#addchord").on( 'click', function(){
        //Create a new chord
        var c = new Chord( notes );
        chords.push( c );
        $("#chords").append( "<div>" + c.toString() + "</div>" );
    });
});
var context = new ( window.AudioContext || window.webkitAudioContext)();

var osc = context.createOscillator();
osc.type = 'sine'; 
osc.frequency.value = 440;
osc.connect( context.destination );

oscs = [osc];


/* TODO TESTS TODO */
console.log( "SOME TEST PRINTS" );

var p = console.log;

var a = new Note( "A" );
console.log( a.note, a.pitch );
console.log( a.toString() );

console.log( "<B>" );
var b = new Note( 440 );
console.log( "B: " + b.toString() );
var c = new Note( 440.0 );
console.log( "C: " + c.toString());
p( c.note, c.pitch);
p( "TO STRING: " + c.toString() );

var dmin7 = new Set();
dmin7.add( new Note( "D" ));
dmin7.add( new Note( "F#"));
dmin7.add( new Note( "A" ));
dmin7.add( new Note( "C" ));

console.log( new Chord(dmin7).toString() );

console.log( "END TEST PRINTS" );
/* \TODO */

