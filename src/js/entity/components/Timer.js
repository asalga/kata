'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';

export default class Timer extends Component {
  constructor(e, cfg) {
    super(e, 'timer');
    // Utils.applyProps(this, defaults, cfg);

    this.reset();
  }

  reset(){
    this.time = 0;
  }

  update(dt) {
    this.time += dt;
  }
}