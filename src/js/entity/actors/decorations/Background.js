'use strict';

import Entity from '../../Entity.js';
import EntityFactory from '../../EntityFactory.js';
import Vec2 from '../../../math/Vec2.js';
import cfg from '../../../cfg.js';

import SpriteRender from '../../components/SpriteRender.js';

const COUNT = 100;
let pos = new Array(COUNT);
let vel = new Array(COUNT);
let sz = new Array(COUNT);
let green = 'rgba(33, 166, 22, .4)';

// let img = p3.loadImage('../../../../i.jpg');

export default function createBackground() {

  let e = new Entity({ name: 'background' });

  for (let i = 0; i < COUNT; i++) {
    pos[i] = [p3.random(0, cfg.gameWidth * 2), p3.random(-cfg.gameHeight * 2, cfg.gameHeight)];

    vel[i] = -p3.random(50, 200);

    sz[i] = 2 + (((vel[i] / 400)-0.5)*20.0);
    sz[i] /= 5.0;
  }

  let spriteRender = new SpriteRender(e, { layerName: 'background' });
  
  spriteRender.update = function(dt) {
    for (let i = 0; i < COUNT; i++) {
      
      // only x for now
      pos[i][1] -= vel[i] * dt;

      if (pos[i][1] > cfg.gameHeight) {
        pos[i][0] = p3.random(0, cfg.gameWidth);
        pos[i][1] = p3.random(-10, -cfg.gameHeight * 2);
      }
    }
  };

  spriteRender.draw = function(_p3) {
    _p3.noStroke();
    _p3.fill( 'rgba(0,0,0,0.2)');
    _p3.rect(0, 0, cfg.gameWidth, cfg.gameHeight);
    
    _p3.fill(green);
    for (let i = 0; i < COUNT; i++) {
      _p3.rect(pos[i][0], pos[i][1], sz[i], sz[i]);
    }

    // image(img, 0, 0);
    // image(img, 0, 0);
  };

  e.addComponent(spriteRender);

  return e;
}