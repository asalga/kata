'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';

import SpriteRender from '../components/SpriteRender.js';
import Score from '../components/Score.js';
import Combo from '../components/Combo.js';

export default function createUI() {
  let e = new Entity({ name: 'ui' });

  e.pos.x = 540;
  e.pos.y = 20;

  let w = 300;
  let h = 70;


  e.addComponent(new Score(e, { pointsPerSecond: 80 }));
  e.addComponent(new Combo(e));

  let spriteRender = new SpriteRender(e, { layerName: 'ui' });
  spriteRender.draw = function(_p3) {
    let e = this.entity;

    _p3.push();

    // Border/Container
    _p3.fill('rgba(66, 99, 33, 0.5)');
    _p3.strokeWeight(2);
    _p3.stroke('rgba(66, 99, 33, 1)');
    _p3.rect(0, 0, w, h);

    _p3.fill(0,255,0);
    _p3.strokeWeight(1);
    _p3.stroke(0);
    _p3.translate(15, 25);
    // _p3.ctx.font = 'normal 600 25px Courier New';
    
    let scoreStr = (e.score.points + '').padStart(7, '0');
    let comboStr = `${e.combo.combo}/${e.combo.best}`;
    comboStr = comboStr.padStart(4, ' ');

    _p3.text('スコア:   ' + scoreStr, 0, 0);

    // Flash combo
    if(e.combo.combo === e.combo.best && e.combo.combo >= 2){
      let t = _p3.millis()/1000;
      let s = (Math.sin(t * 15)+1)/2;
      s *= 100;
      _p3.fill(0,s + 100, 0);
    }
    _p3.text('ストリーク:  ' + comboStr, 0, 30);

    _p3.pop();
  };
  e.addComponent(spriteRender);



  return e;
}