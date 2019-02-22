'use strict';

import ui from './actors/Ui.js';
import letter from './actors/letter.js';
import kb from './actors/KeyboardListener.js';
import ls from './actors/LetterSelector.js';

let createFuncs = new Map();
createFuncs.set('letter', letter);
createFuncs.set('keyboardlistener', kb);
createFuncs.set('letterselector', ls);

export default class EntityFactor {
  static create(str) {
    return createFuncs.get(str)();
  }
}