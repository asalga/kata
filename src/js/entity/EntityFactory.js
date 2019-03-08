'use strict';

import ui from './actors/Ui.js';
import glyph from './actors/letter.js';
import kb from './actors/KeyboardListener.js';
import ls from './actors/LetterSelector.js';
import slot from './actors/Slot.js';

let createFuncs = new Map([
	['glyph', glyph],
	['keyboardlistener', kb],
	['letterselector', ls],
	['slot', slot]
]);

export default class EntityFactory {
  static create(str) {
    return createFuncs.get(str)();
  }
}