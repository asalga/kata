'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';
import SpriteRender from './SpriteRender.js';
import Timer from './Timer.js';
import cfg from "../../cfg.js";

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

    let timer = new Timer(this.entity,{countdown:.3, cb: ()=>scene.remove(this.entity) });
    this.entity.addComponent(timer);

    let renderAway = new SpriteRender(this.entity, { layerName: 'sprite' });
    renderAway.draw = function() {
      let e = this.entity;

      p3.save();
      p3.fontSize(50);
      p3.noStroke();
      p3.translate(e.pos.x, e.pos.y);

      let t = e.timer.time/.2;
      let a = 1 - t;

      p3.scale(1+t, 1+t);

      let x = -(t*80)/4;
      p3.translate(x, x);

      let g = cfg.GREEN.slice();
      g[3] = a;
      p3.fill(g);
      
      p3.ctx.textAlign = "center";
      p3.ctx.textBaseline = "middle";

      
      let test = Math.sqrt((1 + t) ** 2) * 2;

      // p3.text(e.letter.letter, 30-(1+e.timer.time), 30);
      p3.text(e.letter.letter, 40 + test, 40　+ test);

      p3.ctx.textAlign = 'left';

      // p3.noFill();
      // p3.stroke(255, 0, 0);
      // p3.rect(0,0, 80, 80);

      p3.restore();
    };
    this.entity.addComponent(renderAway);
  }

  miss(){
    this.wasMissed = true;
    this.hittable = false;
    scene.remove(this.entity);
  }

  rem(){

  }

  update(dt) {}
}