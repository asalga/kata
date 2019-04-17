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
  spriteRender.draw = function(gfx) {
    let e = this.entity;

    gfx.push();

    // Border/Container
    gfx.fill(66, 99, 33, 128);
    gfx.strokeWeight(2);
    gfx.stroke(66, 99, 33);
    gfx.rect(0, 0, w, h);

    gfx.fill(0,255,0);
    gfx.strokeWeight(1);
    gfx.stroke(0);
    gfx.translate(15, 25);

    gfx.textFont('Courier New');
    gfx.textSize(25);
    
    let scoreStr = (e.score.points + '').padStart(7, '0');
    let comboStr = `${e.combo.combo}/${e.combo.best}`;
    comboStr = comboStr.padStart(4, ' ');

    // gfx.text('スコア:   ' + scoreStr, 0, 0);
    gfx.text('SCORE:   ' + scoreStr, 0, 0);

    // Flash combo
    if(e.combo.combo === e.combo.best && e.combo.combo >= 2){
      let t = gfx.millis()/1000;
      let s = (Math.sin(t * 15)+1)/2;
      s *= 100;
      gfx.fill(0, s + 100, 0);
    }
    // gfx.text('ストリーク:  ' + comboStr, 0, 30);
    gfx.text('COMBO:  ' + comboStr, 0, 30);

    gfx.pop();
  };
  e.addComponent(spriteRender);

  return e;
}