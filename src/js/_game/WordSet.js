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

  static applyfilter(){}

  static clearFilters(){
    let assets = new Assets();
    subset = [...assets.get('json', 'words')];
  }

  static getRandomWord(){
    let idx = Math.floor(Math.random() * subset.length);
    return subset[idx];
  }
}