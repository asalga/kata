'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';
import SpriteRender from '../components/SpriteRender.js';
import Letter from '../components/Letter.js';
import ScorePoints from '../components/ScorePoints.js';
import Killable from '../components/Killable.js';

// import chars from '../../chars.js';

import Debug from '../../debug/Debug.js';
import Vec2 from '../../math/Vec2.js';
import cfg from "../../cfg.js";

export default function createLetter() {
  
  let e = new Entity({ name: 'letter' });

  e.vel.y = 150;

  e.pos.x = Math.floor(p3.random(0,10)) * (cfg.gameWidth/10);
  e.pos.y = Math.random(-200, -150);
  e.pos.y = -100;

  e.disabled = false;

  let ls = EntityFactory.create('letterselector');
  ls.addSelection({
    'row': 2
  });

  let glyph = ls.getChar();
  let charData = ls.getGlyphData(glyph);

  e.addComponent(new Letter(e, { letter: glyph }));
  e.addComponent(new ScorePoints(e, { points: charData.points }));
  e.addComponent(new Killable(e, { timeToDeath: 1}));

  let spriteRender = new SpriteRender(e, { layerName: 'sprite' });
  spriteRender.draw = function(_p3) {
    _p3.save();
    _p3.fontSize(50);
    _p3.noStroke();
    _p3.translate(e.pos.x, e.pos.y);
    
    _p3.ctx.textAlign = "center";
    _p3.ctx.textBaseline = "middle";

    _p3.fill(cfg.GREEN);

    // TODO: fix
    if(e.letter.wasMissed){
      _p3.fill(255, 0, 0);
    }

    _p3.text(e.letter.letter, 40, 40);
    _p3.ctx.textAlign = "left";
    _p3.ctx.textAlign = "alphabetic";

    // p3.noFill();
    // p3.stroke(255, 0, 0);
    // p3.rect(0, 0, 80, 80);

    _p3.restore();
  };
  e.addComponent(spriteRender);

  e.updateProxy = function(dt) {
    if(e.pos.y > cfg.gameHeight - 80){
      e.letter.miss();
    }
  };

  return e;
}