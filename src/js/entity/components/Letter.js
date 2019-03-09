'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';
import SpriteRender from './SpriteRender.js';
import Timer from './Timer.js';

export default class Letter extends Component {
  constructor(e, cfg) {
    super(e, 'letter');

    let defaults = {};
    Utils.applyProps(this, defaults, cfg);

    this.wasMissed = false;
    this.wasHit = false;
    this.hittable = true;
  }

  hit(){
    if(this.wasMissed || this.wasHit){
      return;
    }
    this.hittable =false;
    
    this.wasHit = true;

    this.entity.removeComponentByName('spriterender');

    let timer = new Timer(this.entity);
    this.entity.addComponent(timer);

    let renderAway = new SpriteRender(this.entity, { layerName: 'sprite' });
    renderAway.draw = function() {
      let e = this.entity;

      p3.save();
      p3.fontSize(50);
      p3.noStroke();
      p3.translate(e.pos.x, e.pos.y);
      
      let a = 1 - (e.timer.time * 1);

      p3.fill(0, 0, 240,  a);

      console.log(e.timer.time);

      p3.text(e.letter.letter, 30, 30);
      p3.restore();
    };
    this.entity.addComponent(renderAway);
  }

  miss(){
    this.wasMissed = true;
    this.hittable = false;
  }

  update(dt) {
    if(this.entity.timer)
      if(this.entity.timer.time  > 1){
        debugger;
        scene.remove(this.entity);
      }

  }
}