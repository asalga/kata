'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';

import cfg from "../../cfg.js";
import chars from "../../chars.js";
import Utils from '../../Utils.js';

let instance = null;
let selection = '';

let charMap = new Map;

/*
  Given a config object this Entity selects one character
  from a set of possible glyphs.
*/
export default function createLetterSelector() {

  if(instance){
    return instance;
  }

  instance = new Entity({ name: 'letterselector' });

  chars.forEach( g => {
    charMap.set(g.jpChar, g);
  });

  instance.getChar = function(){
    if(selection.length === 0){
      return null;
    }

    let r = Math.floor(p3.random(0, selection.length));
    return selection.charAt(r);
  };

  /*
  
  */
  instance.addSelection = function(obj){

    let entries = Object.entries(obj);

    for(const [k,v] of entries){

       chars.forEach( c => {
          if(c[k] === v)  selection += c.jpChar;
      });
    }

    selection = Utils.removeDuplicateChars(selection);
  };

  instance.getGlyphData = function(glyph){
    return charMap.get(glyph);
  };


  /*

  */
  // instance.getChar = function(obj){

  //   if(obj.set){
  //     let idx = p3.randomInt(0, obj.set.length);
  //     console.log(idx);
  //     return obj.set[idx];
  //   }

  //   if(Array.isArray(obj)){
  //     console.log('implement me');
  //   }
  //   else if(obj.keyrows){
  //     let idx = Math.floor(p3.random(0, obj.keyrows.length));

  //     let row = rows[idx];
      
  //     let charIdx = Math.floor(p3.random(0, row.length));
  //     return row[charIdx];
  //   }
  // }

  return instance;
}