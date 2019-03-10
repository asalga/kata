'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';
import SpriteRender from './SpriteRender.js';
import Timer from './Timer.js';
import cfg from "../../cfg.js";
import RemoveSelf from './RemoveSelf.js';

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
    this.hittable = false;
    
    this.wasHit = true;

    this.entity.killable.kill();

    let fadeTimer = new Timer(this.entity, { countdown: 0.3 });
    this.entity.addComponent(fadeTimer);

    // Replace the sprite renderer
    this.entity.removeComponentByName('spriterender');
    let renderAway = new SpriteRender(this.entity, { layerName: 'sprite' });
    renderAway.draw = function(_p3) {
      let e = this.entity;

      _p3.save();
      _p3.fontSize(50);
      _p3.noStroke();
      _p3.translate(e.pos.x, e.pos.y);

      let t = e.timer.time/.1;
      let a = 1 - t;

      _p3.scale(1+t, 1+t);

      let x = -(t*80)/4;
      _p3.translate(x, x);

      let g = cfg.GREEN.slice();
      g[3] = a;
      _p3.fill(g);
      
      _p3.ctx.textAlign = "center";
      _p3.ctx.textBaseline = "middle";

      let test = (1 + t) ** 2;

      // _p3.text(e.letter.letter, 30-(1+e.timer.time), 30);
      _p3.text(e.letter.letter, 40 + test, 40　+ test);

      _p3.ctx.textAlign = 'left';

      // _p3.noFill();
      // _p3.stroke(255, 0, 0);
      // _p3.rect(0,0, 80, 80);

      _p3.restore();
    };
    this.entity.addComponent(renderAway);
  }

  miss(){
    this.wasMissed = true;
    this.hittable = false;

    // this.entity.scorepoints.points = -100;
    // this.entity.killable.kill();
    // this.entity.addComponent(new RemoveSelf(this.entity, {timer: 1}));
  }

  update(dt) {}
}