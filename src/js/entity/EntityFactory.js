'use strict';

// import ui from './actors/Ui.js';
import letter from './actors/letter.js';

let createFuncs = new Map();
createFuncs.set('letter', letter);

export default class EntityFactor {
  static create(str) {
    return createFuncs.get(str)();
  }
}