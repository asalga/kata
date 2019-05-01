'use strict';

import Entity from '../../../entity/Entity.js';
import EntityFactory from '../../../entity/EntityFactory.js';

import SpriteRender from '../../../entity/components/SpriteRender.js';

export default function createWord(cfg) {

  let e = new Entity({ name: 'word' });

  e.vel.y = 20;

  e.pos.x = 80;
  e.pos.y = 100;

  let xPos = 0;
  let letters = cfg.word.jp.split('');
  let len = letters.length;

  letters.forEach(g => {
    let glyph = EntityFactory.create('glyph', { kana: g });
    glyph.pos.set(xPos, 0);
    e.add(glyph);
    xPos += 50;
  });

 e.updateProxy = function(dt) {
 	// console.log(e.pos.y);
 };

 // let spriteRender = new SpriteRender(e, { layerName: 'sprite' });
 //  spriteRender.draw = function(gfx) {
 //    gfx.push();
 //    gfx.stroke(0, 255, 0);
 //    gfx.noFill();
 //    gfx.rect(e.pos.x, e.pos.y, 50 * len, 50);
 //    gfx.pop();
 //  };
 //  e.addComponent(spriteRender);

  return e;
}