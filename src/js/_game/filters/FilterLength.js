'use strict';

import Utils from '../../Utils.js';

/*
  Filter based on length of chars
*/
export default class FilterLengthRange extends Filter {
  /*
    cfg
      min - inclusive
      max - inclusive
  */
  constructor(cfg) {
    super();
    let defaults = {
      min: 1,
      max: Infinity
    };
    Utils.applyProps(this, defaults, cfg);
  }

  execute(arr) {
    return arr.filter(e => {
      return e.word.length >= this.min && e.word.length <= this.max;
    });
  }
}