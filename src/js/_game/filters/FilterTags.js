'use strict';

import Utils from '../../Utils.js';

/*
  Filter based on tags
*/
export default class FilterTags extends Filter {

  /*
    cfg
  */
  constructor(cfg) {
    super();
    let defaults = {};
    Utils.applyProps(this, defaults, cfg);
  }

  execute(arr) {}
}