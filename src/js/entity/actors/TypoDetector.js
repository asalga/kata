'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';
import SpriteRender from '../components/SpriteRender.js';

import Debug from '../../debug/Debug.js';
import Vec2 from '../../math/Vec2.js';
import cfg from "../../cfg.js";


export default function createTypoDetector() {
  
  let e = new Entity({ name: 'typodetector' });

  e.pos.x = 0;
  e.pos.y = 0;

  e.timer1 = 0;
  e.isOn = false;

  e.on('typo', function(c){
    this.timer1 = 1;
    this.isOn = true;
  }.bind(e) , e, { onlyOnce: false });


  let spriteRender = new SpriteRender(e, { layerName: 'sprite' });
  spriteRender.draw = function(_p5) {

    let e = this.entity;

    if(e.isOn === false){
      return;
    }

    let t = 1/e.timer1;

    _p5.push();
    _p5.noStroke();
    _p5.fill(200, 0, 0, t);
    _p5.rect(0, 0, cfg.gameWidth, cfg.gameHeight);
    _p5.pop();

    Debug.add(e.timer);
  };
  e.addComponent(spriteRender);

  e.updateProxy = function(dt) {
    
    if(this.isOn === false){return;}

    if(1/this.timer1 < 0.01){
      this.timer1 = 0;
      this.isOn = false;
      return;
    }

    this.timer1 += dt * 10;
  };

  return e;
}