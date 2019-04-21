'use strict';

// import GameTimer from './core/GameTimer.js';

import Utils from './Utils.js';
import Debug from './debug/Debug.js';
import Scene from './Scene.js';
import Assets from './assets/Assets.js';

import Event from './event/Event.js';
import EventSystem from './event/EventSystem.js';

import Renderer from './Renderer.js';

import cfg from './cfg.js';
import Pool from './core/Pool.js';

import SpriteParticleFactory from './effects/SpriteParticleFactory.js';

window.scene = null;

window.gameTime = 0;
window.gameFrameCount = 0;
window.Renderer = Renderer;

window.debug = false;
window.Debug = Debug;
window.vec2Ctor = 0;
window.clearArrayCalls = 0;

window.Events = new EventSystem();
window.ignoreDirty = false;

let perfTimer = new Date();

let avgDelta = 0;
let avgFrames = 0;
let avgCalc = 0;
window.testingEffect = null;

let assets;

document.addEventListener('mousedown', e => new Event({ evtName: 'GAME_MOUSE_DOWN', data: e }).fire());
document.addEventListener('mouseup', e => new Event({ evtName: 'GAME_MOUSE_UP', data: e }).fire());
// document.addEventListener('contextmenu', e => e.preventDefault());

let preloadCallback = function() {
  Renderer.init();
  Pool.init();
  SpriteParticleFactory.initWithAtlas(assets.get('atlas', 'hiragana'));
  Debug.init({ toggleKey: 'Escape' });
  Debug.setOn(window.debug);

  scene = new Scene();
  scene.restartGame();

  let container = document.getElementById('sketch-container');
  let cvs = document.getElementById('defaultCanvas0');
  container.prepend(cvs);
};


window.preload = function() {
  assets = new Assets();
  assets.preload(preloadCallback);
};

window.setup = function() {
  createCanvas(cfg.gameWidth, cfg.gameHeight);
};

window.draw = function() {

  if (!assets.isDone()) {
    return;
  }

  update(0.016);

  preRender();
  render();
  postRender();

  // if(window.testingEffect){
  //   window.testingEffect.update(0.016);
  //   window.testingEffect.render();
  // }

  Debug.draw();
};

function update(dt) {
  Debug.add(`Game time: ${Math.floor(window.gameTime)}`);
  Debug.add(`Root Entity count: ${scene.entities.size}`);

  // let totalVec2Calls = window.vec2Ctor.toLocaleString();
  // Debug.add(`Total Vec2 ctor calls: ${totalVec2Calls}`);
  // Debug.add('Bullets: ' + window.count);

  scene.update(dt);

  // Events.printDebug();
  window.gameTime += dt;
}

function preRender() {
  perfTimer = new Date().getTime();
  Renderer.preRender();
}

function render() {
  Renderer.render();
  gameFrameCount++;
}

function postRender() {
  let timeDiff = new Date().getTime() - perfTimer;
  avgDelta += timeDiff;
  avgFrames++;
  if (avgFrames > 100) {
    avgCalc = avgDelta / avgFrames;
    avgFrames = 0;
    avgDelta = 0;
  }

  Debug.add('render ms: ' + timeDiff);
  Debug.add('avg render ms: ' + avgCalc);
  Debug.add('clear array calls: ' + window.clearArrayCalls);
  // Debug.add('pool available: ' + Pool.count());

  Renderer.postRender();

  // EventSystem.printDebug();

  let bytes = window.performance.memory.totalJSHeapSize.toLocaleString();
  Debug.add(`heap: ${bytes} bytes`);
  Debug.draw();
  Debug.postRender();
}