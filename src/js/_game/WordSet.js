'use strict';

import Assets from '../assets/Assets.js';

let subset = {};

/*
  Singleton that contains all the words we can possibly use
*/
export default class WordSet {
  static init() {
    WordSet.reset();
  }

  /*
    chainable
  */
  static applyFilter(filter) {
    subset = filter.execute(subset);
    return this;
  }

  static reset() {
    let assets = new Assets();
    subset = [...assets.get('json', 'words')];

    // We got the data from a CSV converted into a json. 
    // So the tags aren't arrays yet.
    subset.forEach((v, i, a) => {
      // Convert the empty string to an empty Array. 
      // We may want to dynaically alter the array later ?
      if (v.tags.length === 0) {
        v.tags = [];
      } else {
        subset[i].tags = subset[i].tags.split(',');
      }
    });
  }

  static getRandomWord() {
    let idx = Math.floor(Math.random() * subset.length);
    return subset[idx];
  }
}