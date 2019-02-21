'use strict';

// import ui from './actors/Ui.js';
import letter from './actors/letter.js';
import kb from './actors/KeyboardListener.js';

let createFuncs = new Map();
createFuncs.set('letter', letter);
createFuncs.set('keyboardlistener', kb);

export default class EntityFactor {
  static create(str) {
    return createFuncs.get(str)();
  }
}