'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';

import KBListener from '../components/KBListener.js';

import Debug from '../../debug/Debug.js';

export default function createLetter() {
  
  let e = new Entity({ name: 'keyboardlistener' });

  let kb = new KBListener(e);
  e.addComponent(kb);

  e.updateProxy = function(dt) {
    // let center = new Vec2(p3.width / 2, p3.height / 2);
    // this.vel.x = Math.cos(gameTime) * 300;
    // this.vel.y = Math.sin(gameTime) * 150;
  };

  // e.addComponent(new Killable(e));
  // rocketGun.addComponent(new Killable(rocketGun));
  return e;
}