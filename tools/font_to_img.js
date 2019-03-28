'use strict';

import data from './data.js';

let isDone = false;
let timer = 0;
let currChar = 0;
let sz = 40;

window.setup = function(){
	createCanvas(sz*2, sz*2);
	
	textSize(50);
	
	textFont('monospace');

	textAlign(CENTER, CENTER);
	
	fill(0,250,0);
}

window.draw = function (){
	background(0);

	if(isDone) return;
	
	timer += 1;

	let c = data[currChar];
	let jpChar = c.jpChar;
	let romanji = c.romanji;
	debugger;

	noStroke();
	fill(0,255,0)
	text( jpChar, sz, sz);

	// noFill();
	// stroke(255);
	// rect(0, 0, sz*2, sz*2);

	
	if(timer > 10){
		save(`${romanji}.png`);
		timer = 0;
		currChar++;

		if(currChar === data.length){
			isDone = true;
		}
	}
}