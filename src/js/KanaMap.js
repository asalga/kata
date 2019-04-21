'use strict';

/*
  Transforms the data from an Array into a Map.
*/

import Assets from './assets/Assets.js';

let charMap = new Map;
let firstTime = true;

function loadData() {
  let assets = new Assets();
  let chars = assets.get('json', 'chars');

  chars.forEach(g => charMap.set(g.jpChar, g));
}

export default class KanaMap {

  static getData(kana) {
    if (firstTime) {
      firstTime = false;
      loadData();
    }

    if(kana){
      return charMap.get(kana);
    }

    return charMap;
  }
}