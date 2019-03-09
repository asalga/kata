'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';
import SpriteRender from '../components/SpriteRender.js';
// import Letter from '../components/Letter.js';

import Debug from '../../debug/Debug.js';
import Vec2 from '../../math/Vec2.js';
import cfg from "../../cfg.js";
// import timer from "../../Timer.js";

let size = 80;

export default function createSlot() {
  
  let e = new Entity({ name: 'slot' });

  e.pos.x = 0;
  e.pos.y = -size;

  e.timer = 0;

  // let letter = new Letter(e, {letter: char});
  // e.addComponent(letter);

  let spriteRender = new SpriteRender(e, { layerName: 'sprite' });
  spriteRender.draw = function() {
    p3.save();
    
    p3.stroke(0, 255, 0);
    // p3.translate(e.pos.x, e.pos.y);
    p3.noFill();
    p3.rect(e.pos.x, e.pos.y, size ,size);

    p3.restore();
  };
  e.addComponent(spriteRender);

  e.updateProxy = function(dt) {
    this.timer += dt;

    if(this.timer > 2){
      this.timer = 0;
      
      let glyph = EntityFactory.create('glyph');
      glyph.pos.set(e.pos);

      scene.add(glyph);
     }
  };

  return e;
}