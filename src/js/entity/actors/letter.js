'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';

// import Killable from '../components/Killable.js';
import SpriteRender from '../components/SpriteRender.js';
import Letter from '../components/Letter.js';

import Debug from '../../debug/Debug.js';
import Vec2 from '../../math/Vec2.js';
import cfg from "../../cfg.js";

export default function createLetter() {
  
  let e = new Entity({ name: 'letter' });

  e.vel.y = 150;

  e.pos.x = p3.random(0,p3.width);
  e.pos.y = 0;

  let letter = new Letter(e, {letter: 'ち'});
  e.addComponent(letter);

  let spriteRender = new SpriteRender(e, { layerName: 'sprite' });
  spriteRender.draw = function() {
    p3.save();
    p3.noStroke();
    p3.translate(e.pos.x, e.pos.y);
    p3.fill(64, 202, 238);
    p3.text('は', 30, 30);
    // p3.ellipse(0, 0, e.bounds.radius, e.bounds.radius);
    p3.restore();
  };
  e.addComponent(spriteRender);

  e.updateProxy = function(dt) {
    if(e.pos.y > cfg.gameHeight){
      e.pos.y = -20;
    }
    // let center = new Vec2(p3.width / 2, p3.height / 2);
    // this.vel.x = Math.cos(gameTime) * 300;
    // this.vel.y = Math.sin(gameTime) * 150;
  };

  // e.addComponent(new Killable(e));
  // rocketGun.addComponent(new Killable(rocketGun));
  return e;
}