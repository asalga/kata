'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';

export default class Letter extends Component {
  constructor(e, cfg) {
    super(e, 'letter');
    // this.letter = 'a';
    
    let defaults = {
    	
    };
    Utils.applyProps(this, defaults, cfg);
  }

  update(dt) {}
}