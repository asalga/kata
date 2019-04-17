'use strict';

let data = null;
let isDone = false;
let delayTimer = 0;
let currChar = 0;
let sz = 32;
let font;


fetch('../../data/json/chars.json')
  .then( res => {
    res.json().then( j => {
      data = j;
    })
  });

window.preload = function() {
  font = loadFont('data/font/light.ttf');
}

window.setup = function() {
  createCanvas(sz * 2, sz * 2);
  textSize(50);
  // textFont(font);
  textAlign(CENTER, CENTER);
}


window.draw = function() {
  background(0);
  clear();

  if (data) {

    if (isDone) {
      background(0);
      textSize(20);
      text('done!', 40, 40);
      return;
    }

    delayTimer += 1;

    let c = data[currChar];
    let jpChar = c.jpChar;
    let romanji = c.romanji;

    noStroke();
    fill(0, 255, 0)
    text(jpChar, sz, sz);

    if (delayTimer > 10) {
      save(`__${romanji}.png`);
      delayTimer = 0;
      currChar++;

      if (currChar === data.length) {
        isDone = true;
      }
    }
  }
}