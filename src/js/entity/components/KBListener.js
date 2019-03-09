'use strict';

import Component from './Component.js';
import Scene from '../../Scene.js';

let matched = [];

export default class KBListener extends Component {

  constructor(e) {
    super(e, 'kblistener');

    window.addEventListener('keydown', evt => {

      // Find all matched glyphs
      for(let e of scene.entities){
        if(e.letter && e.letter.letter === evt.key && e.letter.hittable){

          // (e.letter.wasMissed === false || e.letter.wasHit === false)) {

          matched.push(e);
        }
      }

      console.log(matched);

      // a bit overkill by sorting them all but we have a small collections and it
      // keeps the code clean.
      if(matched.length > 0){
        matched.sort( (a, b) => a.pos.y - b.pos.y );
        matched[matched.length-1].letter.hit();
      }

      matched.length = 0;
    });
  }

  update(dt) {}
}