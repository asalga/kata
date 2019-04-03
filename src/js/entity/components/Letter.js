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
import ExplodeBehaviour from '../../effects/ExplodeBehaviour.js';

export default class Letter extends Component {
  constructor(e, cfg) {
    super(e, 'letter');

    let defaults = {};
    Utils.applyProps(this, defaults, cfg);

    this.jpChar = cfg.data.jpChar;
    this.enChar = cfg.data.enChar;
    this.romanji = cfg.data.romanji;

    this.wasMissed = false;
    this.wasHit = false;
    this.hittable = false;
    this.hasBeenAdded = false;
  }

  hit() {
    if (this.wasMissed || this.wasHit || this.hasBeenAdded === false) {
      return;
    }

    this.hittable = false;
    this.wasHit = true;

    if (cfg.showRomanjiAnswer || cfg.hearRomanjiAnswer) {
      let answer = EntityFactory.create('romanjianswer');
      answer.setAnswer(this.jpChar);
      answer.pos.set(this.entity.pos);
      scene.add(answer);
    }

    let cb = function() {
      this.entity.killable.kill();
    }.bind(this);

    this.sprite = SpriteParticleFactory.createSprite({
      name: this.romanji,
      rot: false,
      trails: false,
      position: this.entity.pos
    });
    this.sprite.mutator = new ExplodeBehaviour({ sprite: this.sprite, isDone: cb });
    this.sprite.mutator.execute(createVector(this.sprite.center.x / 2, this.sprite.center.y / 2));
    let that = this;

    // Replace the sprite renderer
    this.entity.removeComponentByName('spriterender');
    let renderAway = new SpriteRender(this.entity, { layerName: 'sprite' });
    renderAway.draw = function(gfx) {
      let e = this.entity;

      gfx.push();
      gfx.translate(e.pos.x, e.pos.y);
      that.sprite.render(gfx);
      gfx.pop();
    };
    this.entity.addComponent(renderAway);
  }

  miss() {
    if (this.wasMissed) return;

    this.wasMissed = true;
    this.hittable = false;

    //new Event({ evtName: 'decreasescoreimmediate', data:d }).fire();
    new Event({ evtName: 'missed', data: { e: this.entity, onlyOnce: true } }).fire();
    // this.entity.addComponent(new RemoveSelf(this.entity, {timer: 3}));
  }

  update(dt) {
    if (this.sprite) {
      this.sprite.update(dt);
    };

    if (this.hasBeenAdded === false && this.entity.pos.y > 0) {
      this.hittable = true;
      this.hasBeenAdded = true;
    }
  }
}
// let fadeTimer = new Timer(this.entity, { countdown: 2 });
// this.entity.addComponent(fadeTimer);

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