'use strict';

import data from './data.js';

let isDone = false;
let timer = 0;
let currChar = 0;
let sz = 40;
let font;

window.preload = function() {
  font = loadFont('data/font/light.ttf');
}

window.setup = function(){
	createCanvas(sz*2, sz*2);
	
	textSize(50);
	// textFont('monospace');
	// textFont("Comic Sans MS");
	textAlign(CENTER, CENTER);
}

window.draw = function (){
	background(0);
	clear();

	if(isDone) {
		textSize(20);
		text('done!', 40, 40);
		return;	
	}
	
	timer += 1;

	let c = data[currChar];
	let jpChar = c.jpChar;
	let romanji = c.romanji;

	noStroke();
	fill(0, 255, 0)
	text( jpChar, sz, sz);
	
	if(timer > 10){
		save(`${romanji}.png`);
		timer = 0;
		currChar++;

		if(currChar === data.length){
			isDone = true;
		}
	}
}