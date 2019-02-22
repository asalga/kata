'use strict';

import Component from './Component.js';
import Scene from '../../Scene.js';

export default class KBListener extends Component {
  
  constructor(e) {
    super(e, 'kblistener');

    window.addEventListener('keydown', evt => {

      // Find any matched letter
      for(let e of scene.entities){
        // console.log(e.letter.letter, evt.key);
        if(e.letter && e.letter.letter === evt.key ){
          e.letter.hit();
          break;
        }
      }
    });
  }

  update(dt) {
  }
}