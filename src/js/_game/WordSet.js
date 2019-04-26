'use strict';

import Assets from '../assets/Assets.js';

let subset = {};

/*
  Singleton that contains all the words we can possibly use
*/
export default class WordSet {
  static init(){
    WordSet.clearFilters();
  }

  /*
    chainable
  */
  static applyfilter(filter){
    subset = filter.execute(subset);
    // do inplace?
    // filter.execute(subset);
    return this;
  }

  static reset(){
    let assets = new Assets();
    subset = [...assets.get('json', 'words')];
  }

  static getRandomWord(){
    let idx = Math.floor(Math.random() * subset.length);
    return subset[idx];
  }
}