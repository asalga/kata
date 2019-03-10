'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';
import SpriteRender from '../components/SpriteRender.js';
import Letter from '../components/Letter.js';

import Debug from '../../debug/Debug.js';
import Vec2 from '../../math/Vec2.js';
import cfg from "../../cfg.js";

export default function createLetter() {
  
  let e = new Entity({ name: 'letter' });

  e.vel.y = 50;

  e.pos.x = Math.floor(p3.random(0,10)) * (cfg.gameWidth/10);
  e.pos.y = Math.random(-200, -150);
  e.pos.y = -100;

  e.disabled = false;

  let ls = EntityFactory.create('letterselector');
  ls.addSelection({
    'row': 2
  });


  let char = ls.getChar();

  let letter = new Letter(e, {letter: char});
  e.addComponent(letter);

  let spriteRender = new SpriteRender(e, { layerName: 'sprite' });
  spriteRender.draw = function() {
    p3.save();
    p3.fontSize(50);
    p3.noStroke();
    p3.translate(e.pos.x, e.pos.y);
    
    p3.ctx.textAlign = "center";
    p3.ctx.textBaseline = "middle";
    p3.fill(cfg.GREEN);
    p3.text(letter.letter, 40, 40);
    p3.ctx.textAlign = "left";
    p3.ctx.textAlign = "alphabetic";

    // p3.noFill();
    // p3.stroke(255, 0, 0);
    // p3.rect(0, 0, 80, 80);

    p3.restore();
  };
  e.addComponent(spriteRender);


  e.updateProxy = function(dt) {
    
    if(e.pos.y > cfg.gameHeight - 80){
      e.letter.miss();
    }

    // if(e.pos.y > cfg.gameHeight){

    //   scene.remove(this);

    //   // let char = EntityFactory.create('glyp');
    //   // scene.add(char);
    // }
  };

  return e;
}