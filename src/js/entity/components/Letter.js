'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';
import SpriteRender from './SpriteRender.js';
import Timer from './Timer.js';
import cfg from "../../cfg.js";
import RemoveSelf from './RemoveSelf.js';
import EntityFactory from '../../entity/EntityFactory.js';
import Event from '../../event/Event.js';

var sound = new Howl({
  // src: ['../../../data/explosion.wav'],
  src: ['../../../data/coin2.wav'],
  volume: 0.8
});


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

    sound.play();

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

    // Replace the sprite renderer
    this.entity.removeComponentByName('spriterender');
    let renderAway = new SpriteRender(this.entity, { layerName: 'sprite' });
    renderAway.draw = function(_p3) {
      let e = this.entity;

      _p3.push();
      _p3.textSize(50);
      _p3.noStroke();
      
      _p3.translate(e.pos.x, e.pos.y);

      let t = e.timer.time/.2;
      let a = 1 - t;

      _p3.scale(1+t, 1+t);

      let x = -(t*80)/4;
      let test = (1 + t) ** 2;


      _p3.translate(x+ 40 + test, x + 40 + test);


      _p3.rotate(100);

      let g = cfg.GREEN.slice();
      g[3] = a;
      _p3.fill(g);
      
      _p3.textAlign(CENTER);
      // _p3.ctx.textAlign = "center";
      // _p3.ctx.textBaseline = "middle";

      // _p3.text(e.letter.letter, 30-(1+e.timer.time), 30);
      _p3.text(e.letter.jpChar, 0, 0);

      _p3.textAlign(LEFT);
      // _p3.ctx.textAlign = 'left';

      // _p3.noFill();
      // _p3.stroke(255, 0, 0);
      // _p3.rect(0,0, 80, 80);

      _p3.pop();
    };
    this.entity.addComponent(renderAway);
  }

  miss(){
    if(this.wasMissed) return;

    this.wasMissed = true;
    this.hittable = false;

    //new Event({ evtName: 'decreasescoreimmediate', data:d }).fire();
    new Event({ evtName: 'missed', data: {e:this.entity} }).fire();
    this.entity.addComponent(new RemoveSelf(this.entity, {timer: 1}));
  }

  update(dt) {
    if(this.hasBeenAdded === false && this.entity.pos.y > 0){
      this.hittable = true;
      this.hasBeenAdded = true;
    }
  }
}