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

  e.pos.x = Math.floor(random(0,10)) * (cfg.gameWidth/10);
  e.pos.y = Math.random(-200, -150);
  e.pos.y = -100;

  // ???
  e.disabled = false;

  let ls = EntityFactory.create('letterselector');
  ls.addSelection({'row': 2});
  let kana = ls.getChar();
  let charData = ls.getKanaData(kana);

  e.addComponent(new Letter(e, { data: charData }));
  e.addComponent(new ScorePoints(e, { points: charData.points }));
  e.addComponent(new Killable(e, { timeToDeath: 1}));

  let spriteRender = new SpriteRender(e, { layerName: 'sprite' });
  spriteRender.draw = function(_p3) {
    _p3.push();

    _p3.textSize(50);
    _p3.textAlign(CENTER, CENTER);

    _p3.noStroke();

    if(e.pos.y < 0){
      _p3.fill(130);
    }
    else if(e.letter.wasMissed){
      _p3.fill(255, 0, 0);
    }
    else{
      _p3.fill(50, 255, 20);
    }

    _p3.translate(e.pos.x, e.pos.y);
    _p3.text(e.letter.jpChar, 40, 40);

    _p3.pop();
  };
  e.addComponent(spriteRender);

  e.updateProxy = function(dt) {
    if(e.pos.y > cfg.gameHeight - cfg.CHAR_SZ){
      e.letter.miss();
    }
  };

  return e;
}