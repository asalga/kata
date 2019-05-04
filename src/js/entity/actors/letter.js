'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';
import SpriteRender from '../components/SpriteRender.js';
import Letter from '../components/Letter.js';
import ScorePoints from '../components/ScorePoints.js';
import Killable from '../components/Killable.js';

import Assets from '../../assets/Assets.js';
import Debug from '../../debug/Debug.js';
import Vec2 from '../../math/Vec2.js';
import gameCfg from '../../cfg.js';

import KanaSelector from '../../_game/KanaSelector.js';
import KanaMap from '../../KanaMap.js';

let assets = new Assets();
export default function createLetter(cfg) {

  let e = new Entity({ name: 'letter' });
let _coords = Vec2.create();
  e.vel.y = 80;

  e.pos.x = Math.floor(random(0, 10)) * (gameCfg.gameWidth / 10);
  e.pos.y = Math.random(-200, -150);
  e.pos.y = -100;

  // ???
  e.disabled = false;

  let kana = (cfg && cfg.kana) ? cfg.kana : KanaSelector.getKana();
  let charData = KanaMap.getData(kana);

  e.addComponent(new Letter(e, { data: charData }));
  e.addComponent(new ScorePoints(e, { points: charData.points }));
  e.addComponent(new Killable(e, { timeToDeath: 3 }));

  let spriteRender = new SpriteRender(e, { layerName: 'sprite', timer: 1.1 });
  spriteRender.draw = function(gfx) {
    let atlas = assets.get('atlas', 'hiragana');
    let char = atlas.get(charData.romanji);
    
    _coords.zero(); 
    this.entity.getWorldCoords(_coords);
    gfx.image(char, _coords.x, _coords.y);

    // gfx.push();
    // gfx.translate(e.pos.x, e.pos.y);    
    // gfx.pop();
  };
  e.addComponent(spriteRender);

  e.updateProxy = function(dt) {
    if (e.pos.y > gameCfg.gameHeight - gameCfg.CHAR_SZ) {
      e.letter.miss();
    }
  };

  return e;
}

// gfx.textFont(testFont);
// gfx.textSize(50);
// gfx.textAlign(CENTER, CENTER);
// gfx.noStroke();
// if(e.pos.y < 0){
//   gfx.fill(130);
// }
// else if(e.letter.wasMissed){
//   gfx.fill(255, 0, 0);
// }
// else{
//   gfx.fill(50, 255, 20);
// }