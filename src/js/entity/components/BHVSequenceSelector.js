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

    this.entity.tags.push('bhv');
  }

  execute(){
    // this.exe && this.exe();
  }

  update(dt) {
    
    let n = this.currNode;
    let c = this.entity.children[n].findComponentByName('bhvleaf');
    let state = c.execute();

    if(state === 'done'){

      this.currNode++;

      // fix this. we need to get a list of ONLY the bhv children
      if(this.currNode >= this.entity.children.length){
        this.currNode = 0;

        this.entity.children.forEach( c => {
          c.findComponentByName('bhvleaf').reset();
        });
      }
    }

    // this.timer += dt;
    // if(this.timer > 1){
    //   this.timer = 0;
    //   debugger;
    //   this.execute();
    // }
  }
}