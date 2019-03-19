'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';

export default class BHVRandomSelector extends Component {
  constructor(e, cfg) {
    super(e, 'bhvrandomselector');

    this.reset();

    let defaults = {};
    Utils.applyProps(this, defaults, cfg);

    this.tags.push('bhv');
  }

  reset(){
    this.state = 'none';
    this.currIndex = 0;
    this.iterations = 0;

    let arr = this.entity.children;//.findComponentsByTagName('bhv');
    arr.forEach( e => {
      let c = e.findComponentByTagName('bhv');
      c.reset();
    });

    // TODO: allow removing node after they've been visited?
    // if(cfg.doNoRepeat){}
  }

  getRandomIndex(){
    let n = this.entity.children.length;
    return Math.floor(p3.random(0, n));
  }

  execute(){
    if(this.state === 'done') return 'done';

    if(this.state === 'none'){
      this.state = 'running';
      this.currIndex = this.getRandomIndex();
    }
    
    // TODO: change to use Tag Name
    let n = this.currIndex;

    // let c = this.entity.children[n].findComponentByName('bhvleaf');
    let c = this.entity.children[n].findComponentByTagName('bhv');
    let childState = c.execute();

    if(childState === 'done'){

      this.iterations++;

      this.entity.children[n].findComponentByTagName('bhv').reset();
      this.currIndex = this.getRandomIndex();
    
      if(this.iterations === 5){
        // debugger;
        this.state = 'done';
      }
    }

    return this.state;
  }

  update(dt) {
    if(this.entity.parent === null){
      this.execute();
    }
  }
}