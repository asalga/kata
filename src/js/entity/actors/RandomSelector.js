'use strict';

import Entity from '../Entity.js';

import BHVRandomSelector from '../components/BHVRandomSelector.js';

import cfg from "../../cfg.js";

export default function createRandomSelector() {

  let e = new Entity({ name: 'randomSelector' });

  e.addComponent(new BHVRandomSelector(e, {}));

  e.updateProxy = function(dt) {};

  return e;
}