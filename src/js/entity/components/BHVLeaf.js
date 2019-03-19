'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';

export default class BHVLeaf extends Component {
  constructor(e, cfg) {
    super(e, 'bhvleaf');

    this.state = 'none';

    this.timer = 0;

    let defaults = {};
    Utils.applyProps(this, defaults, cfg);

    // this.entity.tags.push('bhv');
    this.tags.push('bhv');
  }

  reset(){
    this.state = 'none';
  }

  execute(){
    if(this.state === 'none'){
      if(this.exe){
        this.exe();
        this.state = 'running';
      }
    }

    return this.state;
  }

  update(dt) {

    if(this.state === 'running'){
      this.timer += dt;
      if(this.timer > 1.0){
        this.timer = 0;
        this.state = 'done';
      }
    }
  }
}