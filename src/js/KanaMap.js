'use strict';

import chars from "./data/chars.js";
import Utils from "./Utils.js";

let charMap = new Map;

chars.forEach( g => {
  charMap.set(g.jpChar, g);
});

export default class KanaMap {
  static getKanaData(kana){
    return charMap.get(kana);
  }

  static getData(){
    return charMap;
  }
}