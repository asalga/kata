'use strict';

// import cfg from "../../cfg.js";
import chars from "../../chars.js";
import Utils from '../../Utils.js';

let instance = null;
let charMap = new Map;

/*
  Manage the char data
*/
export default function KanaMap() {

  if(instance){
    return instance;
  }

  instance = {};

  chars.forEach( g => {
    charMap.set(g.jpChar, g);
  });

  instance.getGlyphData = function(glyph){
    return charMap.get(glyph);
  };

  return instance;
}