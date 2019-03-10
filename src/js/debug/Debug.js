'use strict';

import Utils from '../Utils.js';

let strings = [];
let isOn = true;

export default class Debug {
  
  static init(cfg) {
    document.addEventListener('keydown', function(evt) {
      if (evt.code === cfg.toggleKey) {
        window.debug = !window.debug;
        Debug.setOn(window.debug);
      }
    });
  }
  
  static add(str) {
    if (!isOn) {
      return;
    }
    strings.push(str);
  }

  static setOn(v) {
    isOn = v;
  }

  static draw() {
    if (!isOn) {
      return;
    }

    p3.save();
    p3.noStroke();
    p3.fill(0,255,255);
    p3.cvs.textAlign = 'left';

    let y = 20;
    let ySpacing = 18;

    p3.fontSize(20);

    strings.forEach(s => {
      p3.text(s, 10, y);
      y += ySpacing;
    });
    p3.restore();
  }

  static postRender() {
    if (!isOn) {
      return;
    }
    Utils.clearArray(strings);
  }
}