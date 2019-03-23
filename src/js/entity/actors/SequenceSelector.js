'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';
import SpriteRender from '../components/SpriteRender.js';
// import BHVLeaf from '../components/BHVLeaf.js';
import BHVSequenceselector from '../components/BHVSequenceSelector.js';

import Debug from '../../debug/Debug.js';
import Vec2 from '../../math/Vec2.js';
import cfg from "../../cfg.js";

export default function createSequenceSelector() {

  let e = new Entity({ name: 'sequenceselector' });

  e.addComponent(new BHVSequenceselector(e, {}));

  e.updateProxy = function(dt) {};

  return e;
}