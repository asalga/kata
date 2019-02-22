'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';

export default class Letter extends Component {
  constructor(e, cfg) {
    super(e, 'letter');

    let defaults = {
    	
    };
    Utils.applyProps(this, defaults, cfg);

    this.disabled = false;
  }

  hit(){
    if(this.disabled){
      return;
    }
    
  	scene.remove(this.entity);
  }

  update(dt) {}
}