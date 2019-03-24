'use strict';

import glyph from './actors/letter.js';
import kb from './actors/KeyboardListener.js';
import ls from './actors/LetterSelector.js';
import slot from './actors/Slot.js';
import ui from './actors/Ui.js';
import typo from './actors/TypoDetector.js';
import empty from './actors/Empty.js';

// BHV
import sequenceselector from './actors/SequenceSelector.js';
import randomselector from './actors/RandomSelector.js';
import romanjianswer from './actors/RomanjiAnswer.js';

import background from './actors/decorations/Background.js';

let createFuncs = new Map([
	['glyph', glyph],
	['keyboardlistener', kb],
	['letterselector', ls],
	['slot', slot],
	['ui', ui],
	['typo', typo],
	['empty', empty],

	['sequenceselector', sequenceselector],
	['randomselector', randomselector],
	['romanjianswer', romanjianswer],

	['background', background],
]);

export default class EntityFactory {
  static create(str) {
    return createFuncs.get(str)();
  }
}