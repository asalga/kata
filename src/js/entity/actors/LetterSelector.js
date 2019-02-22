'use strict';

import Entity from '../Entity.js';
import EntityFactory from '../EntityFactory.js';

import cfg from "../../cfg.js";

let instance = null;
let rows = [
  'ぬふあうえおやゆよわ',
  'たていすかんなにらせ'
];

export default function createLetterSelector() {

  if(instance){
    return instance;
  }

  instance = new Entity({ name: 'letterselector' });

  instance.getChar = function(obj){

    if(obj.set){
      let idx = p3.randomInt(0, obj.set.length);
      console.log(idx);
      return obj.set[idx];
    }

    if(Array.isArray(obj)){
      console.log('implement me');
    }
    else if(obj.keyrows){
      let idx = Math.floor(p3.random(0, obj.keyrows.length));

      let row = rows[idx];
      
      let charIdx = Math.floor(p3.random(0, row.length));
      return row[charIdx];
    }
  }

  return instance;
}