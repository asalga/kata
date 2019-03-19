'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';
import SpriteRender from '../components/SpriteRender.js';
import RemoveSelf from '../components/RemoveSelf.js';
import Timer from '../components/Timer.js';

// import Killable from '../components/Killable.js';

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
    spriteRender.draw = function(_p3) {
      // TODO: get by name?
      let timeElapsed = this.entity.timer.time;

      _p3.save();
      _p3.fontSize(50);
      _p3.noStroke();
      _p3.translate(e.pos.x, e.pos.y - timeElapsed*100);
      
      _p3.ctx.textAlign = "center";
      _p3.ctx.textBaseline = "middle";
      
      let op = (1 - timeElapsed*3) ;
      _p3.fill(`rgba(0, 233, 0, ${op})`);

      _p3.text(answerData.romanji, 40, 40);
      _p3.ctx.textAlign = "left";
      _p3.ctx.textAlign = "alphabetic";

      _p3.restore();
    };
    e.addComponent(spriteRender);
  }

  e.updateProxy = function(dt) {};

  return e;
}