'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';
import SpriteRender from '../components/SpriteRender.js';
import RemoveSelf from '../components/RemoveSelf.js';
import Timer from '../components/Timer.js';

import Debug from '../../debug/Debug.js';
import Vec2 from '../../math/Vec2.js';
import cfg from "../../cfg.js";
import KanaMap from '../../KanaMap.js';

export default function createRomanjiAnswer() {
  
  let e = new Entity({ name: 'romanjianswer' });

  let answerData;

  e.setAnswer = function(kana){
    answerData = KanaMap.getKanaData(kana);
  };

  e.addComponent(new Timer(e, {countdown: 2}));
  e.addComponent(new RemoveSelf(e, {time: 1}));

  if(cfg.showRomanjiAnswer){
    let spriteRender = new SpriteRender(e, { layerName: 'sprite' });
    spriteRender.draw = function(gfx) {
      // TODO: get by name?
      let timeElapsed = this.entity.timer.time;

      gfx.push();
      gfx.textSize(25);
      gfx.noStroke();
      gfx.translate(e.pos.x, e.pos.y - timeElapsed*30);
      
      gfx.textAlign(CENTER, CENTER);
      
      let a = (1 - timeElapsed);
      gfx.fill(0, 233, 0, a*255);

      gfx.text(answerData.romanji, 40, 40);

      gfx.pop();
    };
    e.addComponent(spriteRender);
  }

  e.updateProxy = function(dt) {};

  return e;
}