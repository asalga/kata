'use strict';

import cfg from '../cfg.js';
import Utils from '../Utils.js';
import KanaMap from '../KanaMap.js';

let selection = '';

export default class KanaSelector {

  static init(){
    KanaSelector.addSelection(cfg.kanaSelection);
  }

  static addSelection(meta) {

    let entries = Object.entries(meta[0]);
    let data = KanaMap.getData();

    for (const [k, v] of entries) {

      // match
      data.forEach(c => {
        if (c[k] === v) selection += c.jpChar;
      });
    }

    // We could match a glyph several times
    // depeding on our query, so remove dups.
    selection = Utils.removeDuplicateChars(selection);
  }

  static getKana() {
    if (selection.length === 0) {
      return null;
    }

    let r = Math.floor(random(0, selection.length));
    return selection.charAt(r);
  }
}