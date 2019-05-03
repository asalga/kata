'use strict';

import Filter from './Filter.js';

import Utils from '../../Utils.js';

export default class FilterChars extends Filter {

  /*
    cfg 
      allowed: Array
      dakutenFromAllowed - 
        - if false, does nothing
        - If true, based on the glyphs that CAN have dakuten from the allowed set,
          this will add those glyps.
          For example if "は" is in allowed and this flag is true, "ば" will be
          added as an allowed glyph 
  */
  constructor(cfg) {
    super();
    let defaults = {};
    Utils.applyProps(this, defaults, cfg);

    // Reasoning: If the user didn't pass in く then 
    // it wouldn't make sense to allow the ぐ since the player hasn't 
    // learned how to type that key. That's why we do an intersection
    // of the allowed kana
    if (cfg.dakutenFromAllowed) {
      let glyphsWithDakutens = 'かきくけこ';

      let arr = Utils.strIntersection(glyphsWithDakutens, cfg.allowed);

      // Seems like the unicode chars are just offset by 1
      let toAdd = arr.map(g => String.fromCharCode(g.charCodeAt(0) + 1));

      toAdd.forEach(v => this.allowed += v);

      // use may have used a dakuten glyph in allowed, so remove potential dups
      this.allowed = Utils.removeDuplicateChars(this.allowed);
    }

    // Only useful if we want all dakutens
    // if (cfg.dakuten) {
    //   let dakutens = "がぎぐげござじずぜぞだぢづでどばびぶべ";
    //   this.allowed.concat(dakutens);
    // }

    // if (cfg.handakuten) {
    //   let handakutens = "ぽぴぷぺま゜";
    //   this.allowed.concat(handakutens);
    // }

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