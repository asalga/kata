'use strict';

import Filter from './Filter.js';

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
      return e.jp.length >= this.min && e.jp.length <= this.max;
    });
  }
}