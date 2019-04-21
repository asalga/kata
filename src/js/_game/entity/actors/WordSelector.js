'use strict';

import EntityFactory from '../../../entity/EntityFactory.js';
import Entity from '../../../entity/Entity.js';

import cfg from '../../../cfg.js';
import Utils from '../../../Utils.js';

let instance = null;
let selection = '';

/*
*/
export default function createWordSelector() {

  if (instance) {
    return instance;
  }

  instance = new Entity({ name: 'wordselector' });

  // instance.getChar = function() {
  //   if (selection.length === 0) {
  //     return null;
  //   }

  //   let r = Math.floor(random(0, selection.length));
  //   return selection.charAt(r);
  // };

  /*
  */
  instance.addSelection = function(meta) {

    // WordMap.getData();
    // getWord()


    // let entries = Object.entries(meta);
    // let data = KanaMap.getData();

    // for (const [k, v] of entries) {

    //   // match
    //   data.forEach(c => {
    //     if (c[k] === v) selection += c.jpChar;
    //   });
    // }

    // // We could match a glyph several times
    // // depeding on our query, so remove dups.
    // selection = Utils.removeDuplicateChars(selection);
  };

  // instance.getKanaData = function(glyph) {
  //   return KanaMap.getData(glyph);
  // };

  return instance;
}