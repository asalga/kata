'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';
import SpriteRender from '../components/SpriteRender.js';
import BHVLeaf from '../components/BHVLeaf.js';

import WordSet from '../../_game/WordSet.js';
import Debug from '../../debug/Debug.js';
import Vec2 from '../../math/Vec2.js';
import cfg from "../../cfg.js";

let size = 80;

export default function createWordSlot() {

  let e = new Entity({ name: 'wordslot' });

  e.pos.x = 0;
  e.pos.y = -size;

  e.timer = 0;

  let launchWord = function() {
    let xPos = 0;
    let word = WordSet.getRandomWord();
    let letters = word.jp.split('');

    letters.forEach( g => {
      let glyph = EntityFactory.create('glyph', {kana: g});
      xPos += 50;
      glyph.pos.set(xPos, 0);
      scene.add(glyph);
    });
  };
  e.addComponent(new BHVLeaf(e, { exe: launchWord }))

  let spriteRender = new SpriteRender(e, { layerName: 'sprite' });
  spriteRender.draw = function(gfx) {
    gfx.push();
    gfx.stroke(0, 255, 0);
    gfx.noFill();
    gfx.rect(e.pos.x, e.pos.y, size, size);
    gfx.pop();
  };
  e.addComponent(spriteRender);

  e.updateProxy = function(dt) {};

  return e;
}