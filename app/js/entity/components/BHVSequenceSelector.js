'use strict';

import Component from './Component.js';
import Utils from '../../Utils.js';

export default class BHVSequenceSelector extends Component {
  constructor(e, cfg) {
    super(e, 'bhvsequenceselector');

    this.state = 'none';
    this.currNode = 0;

    let defaults = {};
    Utils.applyProps(this, defaults, cfg);

    this.tags.push('bhv');
  }

  init(){
    this.bhvChildCount = this.entity.getChildrenWithComponentTagName('bhv').length;
  }



  reset(){
    this.currNode = 0;
    this.state = 'none';

    let arr = this.entity.children;
    arr.forEach( e => {
      let c = e.findComponentByTagName('bhv');
      c.reset();
    });

    // TODO: allow removing node after they've been visited?
    // if(cfg.doNoRepeat){}
  }

  execute(){
    if(this.state === 'done') return 'done';

    if(this.state === 'none') this.state = 'running';

    // TODO: change to use Tag Name
    let n = this.currNode;
    let c = this.entity.children[n].findComponentByTagName('bhv');
    let childState = c.execute();

    // Last child is done, then we are done
    if(childState === 'done'){
      this.currNode++;

      if(this.currNode === this.bhvChildCount-1){
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