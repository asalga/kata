'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';

import cfg from "../../cfg.js";
import Utils from '../../Utils.js';
import KanaMap from '../../KanaMap.js';

let instance = null;
let selection = '';

/*
  Given a config object this Entity selects one character
  from a set of possible glyphs.
*/
export default function createLetterSelector() {

  if (instance) {
    return instance;
  }

  instance = new Entity({ name: 'letterselector' });

  instance.getChar = function() {
    if (selection.length === 0) {
      return null;
    }

    let r = Math.floor(random(0, selection.length));
    return selection.charAt(r);
  };

  /*
    TODO: convert this to an array
    meta - selection (ie. {row: 2})
  */
  instance.addSelection = function(meta) {

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
  };

  instance.getKanaData = function(glyph) {
    return KanaMap.getData(glyph);
  };

  return instance;
}