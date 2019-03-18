'use strict';

import glyph from './actors/letter.js';
import kb from './actors/KeyboardListener.js';
import ls from './actors/LetterSelector.js';
import slot from './actors/Test.js';
import ui from './actors/Ui.js';
import typo from './actors/TypoDetector.js';
import empty from './actors/Empty.js';
import sequenceSelector from './actors/SequenceSelector.js';
import randomSelector from './actors/randomSelector.js';
import background from './actors/decorations/Background.js';

let createFuncs = new Map([
	['glyph', glyph],
	['keyboardlistener', kb],
	['letterselector', ls],
	['slot', slot],
	['ui', ui],
	['background', background],
	['typo', typo],
	['empty', empty],
	['sequenceSelector', sequenceSelector],
	['randomSelector', randomSelector]
]);

export default class EntityFactory {
  static create(str) {
    return createFuncs.get(str)();
  }
}