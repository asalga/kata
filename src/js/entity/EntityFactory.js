'use strict';

// import ui from './actors/Ui.js';

let createFuncs = new Map();

export default class EntityFactor {
  static create(str) {
    return createFuncs.get(str)();
  }
}