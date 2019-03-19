'use strict';

import chars from "./chars.js";
import Utils from "./Utils.js";

let charMap = new Map;

chars.forEach( g => {
  charMap.set(g.jpChar, g);
});

/*
  Manage the char data
*/

export default class KanaMap{

  static getKanaData(kana){
    return charMap.get(kana);
  }

  // if(instance){
  //   return instance;
  // }

  // instance = {};

  

  // instance.getKanaData = function(kana){
  //   
  // };

  // return instance;
}