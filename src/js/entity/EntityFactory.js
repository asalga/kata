'use strict';

// import ls from './actors/LetterSelector.js';

import glyph from './actors/letter.js';
import kb from './actors/KeyboardListener.js';
import slot from './actors/CharSlot.js';
import ui from './actors/Ui.js';
import typo from './actors/TypoDetector.js';
import empty from './actors/Empty.js';
import audio from './actors/AudioEventListener.js';

// Playing around with new paths
import ws from '../_game/entity/actors/WordSelector.js';

// BHV
import sequenceselector from './actors/SequenceSelector.js';
import randomselector from './actors/RandomSelector.js';
import romanjianswer from './actors/RomanjiAnswer.js';

import background from './actors/decorations/Background.js';

let createFuncs = new Map([
	['glyph', glyph],
	['keyboardlistener', kb],
	// ['letterselector', ls],
	['wordselector', ws],
	['slot', slot],
	['ui', ui],
	['typo', typo],
	['empty', empty],
	['audioeventlistener', audio],

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