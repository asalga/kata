'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';

import SpriteRender from '../components/SpriteRender.js';
import Score from '../components/Score.js';

export default function createUI() {
  let e = new Entity({ name: 'ui' });

  e.pos.x = 540;
  e.pos.y = 20;

  let w = 300;
  let h = 70;

  e.addComponent(new Score(e, { pointsPerSecond: 80 }));
  // e.addComponent(new Streak(e, {}));

  let spriteRender = new SpriteRender(e, { layerName: 'ui' });
  spriteRender.draw = function(_p3) {
    _p3.save();

    // Border/Container
    _p3.fill('rgba(66, 99, 33, 0.5)');
    _p3.strokeWeight(2);
    _p3.stroke('rgba(66, 99, 33, 1)');
    _p3.rect(0, 0, w, h);

    _p3.fill(0,255,0);
    _p3.strokeWeight(1);
    _p3.stroke(0);
    _p3.translate(15, 25);
    _p3.ctx.font = 'normal 600 25px Courier New';
    
    let p = (this.entity.score.points + '').padStart(7, '0');
    let c = '13/16'.padStart(4, ' ');

    _p3.text('スコア:   ' + p, 0, 0);
    _p3.text('ストリーク:  ' + c, 0, 30);

    _p3.restore();
  };
  e.addComponent(spriteRender);

  return e;
}