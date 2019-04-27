'use strict';

import Filter from './Filter.js';
import Utils from '../../Utils.js';

/*
  If tag in cfg is empty it is assumed user
  wants all words that do not contain tags.
*/
export default class FilterTags extends Filter {

  /*
    cfg
      - tags Array
  */
  constructor(cfg) {
    super();

    if (cfg) {
      this.tags = cfg.tags || [];
    }
  }

  execute(arr) {
    return arr.filter(el => {
      let intersection = el.tags.filter(t => this.tags.includes(t))
      return intersection.length > 0;
    });
  }
}