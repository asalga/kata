'use strict';

import Component from './Component.js';
import Scene from '../../Scene.js';

export default class KBListener extends Component {
  
  constructor(e) {
    super(e, 'kblistener');

    window.addEventListener('keydown', e => {
      let key = e.key;

      for(let e of scene.entities){

        if(e.letter && e.letter.letter === key ){
          scene.remove(e);
          break;
        }
      }

      // console.log(scene.entities.size);
    });
  }

  update(dt) {
  }
}