'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';
import SpriteRender from './SpriteRender.js';
import Timer from './Timer.js';
import cfg from "../../cfg.js";
import RemoveSelf from './RemoveSelf.js';
import EntityFactory from '../../entity/EntityFactory.js';
import Event from '../../event/Event.js';

import SpriteParticleFactory from '../../effects/SpriteParticleFactory.js';
import Explode from '../../effects/ExplodeBehaviour.js';

export default class Letter extends Component {
  constructor(e, cfg) {
    super(e, 'letter');

    let defaults = {};
    Utils.applyProps(this, defaults, cfg);

    this.jpChar = cfg.data.jpChar;
    this.enChar = cfg.data.enChar;

    this.wasMissed = false;
    this.wasHit = false;
    this.hittable = false;
    this.hasBeenAdded = false;
  }

  hit(){
    if(this.wasMissed || this.wasHit || this.hasBeenAdded === false){
      return;
    }

    this.hittable = false;
    this.wasHit = true;

    this.entity.killable.kill();

    if(cfg.showRomanjiAnswer || cfg.hearRomanjiAnswer){
      let answer = EntityFactory.create('romanjianswer');
      answer.setAnswer(this.jpChar);
      answer.pos.set(this.entity.pos);
      scene.add(answer);
    }

    let fadeTimer = new Timer(this.entity, { countdown: 2 });
    this.entity.addComponent(fadeTimer);

    this.testing = SpriteParticleFactory.createSprite({
      name: 'chi',
      rot: false,
      trails: false
    });
    this.testing.mutator = new Explode({sprite:this.testing, timer: 0});
    let that = this;

    // Replace the sprite renderer
    this.entity.removeComponentByName('spriterender');
    let renderAway = new SpriteRender(this.entity, { layerName: 'sprite' });
    renderAway.draw = function(gfx) {
      let e = this.entity;

      gfx.push();
      gfx.translate(e.pos.x, e.pos.y);

      if(that.testing){
        that.testing.render(gfx);
      }
      // gfx.textSize(50);
      // gfx.noStroke();
      // let t = e.timer.time/.2;
      // gfx.translate(e.pos.x, e.pos.y);
      // gfx.scale(1+t, 1+t);
      // let x = -(t*80)/4;
      // let test = (1 + t) ** 3;
      // gfx.translate(x + 40 + test, x + 40 + test);
      // gfx.rotate(100);
      // let g = cfg.GREEN.slice();
      // g[3] = (1 - t) * 255;
      // gfx.fill(g);
      // gfx.textAlign(CENTER, CENTER);
      // // gfx.text(e.letter.letter, 30-(1+e.timer.time), 30);
      // gfx.text(e.letter.jpChar, 0, 0);
      gfx.pop();
    };
    this.entity.addComponent(renderAway);
  }

  miss(){
    if(this.wasMissed) return;

    this.wasMissed = true;
    this.hittable = false;

    //new Event({ evtName: 'decreasescoreimmediate', data:d }).fire();
    new Event({ evtName: 'missed', data: {e:this.entity, onlyOnce: true} }).fire();
    this.entity.addComponent(new RemoveSelf(this.entity, {timer: 1}));
  }

  update(dt) {
    if(this.testing){
      this.testing.update(dt)
    };

    if(this.hasBeenAdded === false && this.entity.pos.y > 0){
      this.hittable = true;
      this.hasBeenAdded = true;
    }
  }
}