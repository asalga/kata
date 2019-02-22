'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';

export default class Letter extends Component {
  constructor(e, cfg) {
    super(e, 'letter');

    let defaults = {
    	
    };
    Utils.applyProps(this, defaults, cfg);
  }

  hit(){
  	scene.remove(this.entity);
  }

  update(dt) {}
}