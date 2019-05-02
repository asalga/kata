'use strict';
/*
  TODO:
    allowed
    allowSmall
    allowDakuten
    allowHandakuten
*/

import Filter from './Filter.js';

import Utils from '../../Utils.js';

export default class FilterChars extends Filter {

  /*
    allowed: Array
    dakuten: boolean
  */
  constructor(cfg) {
    super();
    let defaults = {};
    Utils.applyProps(this, defaults, cfg);

    // replace this with working version.
    if (cfg.dakuten) {
      let dakutens = "がぎぐげござじずぜぞだぢづでどばびぶべ";
      this.allowed.concat(dakutens);
    }

    if (cfg.handakuten) {
      let handakutens = "ぽぴぷぺま゜";
      this.allowed.concat(handakutens);
    }

    // TODO: remove dups
    // User may have added dakuten chars in 'allowed' Array.
  }

  execute(arr) {
    let self = this;

    function kanaIsAllowed(k) {
      let a = self.allowed.indexOf(k) >= 0;
      return a;
    }

    return arr.filter(w => {
      let kanas = w.jp.split('');
      let allowed = true;

      kanas.forEach(function(k) {
        if (!kanaIsAllowed(k)) {
          allowed = false;
        }
      });

      return allowed;
    });
  }
}