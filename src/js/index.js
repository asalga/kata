'use strict';

import Utils from './Utils.js';
import Debug from './debug/Debug.js';
import Scene from './Scene.js';
import Assets from './Assets.js';

import Event from './event/Event.js';
import EventSystem from './event/EventSystem.js';

import GameTimer from './core/GameTimer.js';

import Renderer from './Renderer.js';

import cfg from './cfg.js';
import Pool from './core/Pool.js';

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

let timer;
let perfTimer = new Date();

let avgDelta = 0;
let avgFrames = 0;
let avgCalc = 0;

document.addEventListener('mousedown', e => new Event({ evtName: 'GAME_MOUSE_DOWN', data: e }).fire());
document.addEventListener('mouseup', e => new Event({ evtName: 'GAME_MOUSE_UP', data: e }).fire());
// document.addEventListener('contextmenu', e => e.preventDefault());

let test = function(){

  Renderer.init();

  Pool.init();
  scene = new Scene();

  Debug.init({toggleKey: 'Escape'});
  Debug.setOn(window.debug);
  scene.restartGame();

  // timer = new GameTimer();
  // timer.update = function(dt) {
  //   update(dt);
  //   preRender();
  //   render();
  //   postRender();
  // };
  // timer.start();
  let container = document.getElementById('sketch-container');
  let cvs = document.getElementById('defaultCanvas0');
  container.prepend(cvs);
};

let assets;
window.preload = function(){
  assets = new Assets();
  assets.preload(test);
};

window.setup = function(){
  createCanvas(cfg.gameWidth, cfg.gameHeight);
};

window.draw = function(){

  if(!assets.isDone()){
    return;
  }

	update(0.016);

	preRender();
	render();
	postRender();

	Debug.draw();
};

function update(dt) {
  Debug.add(`Game time: ${Math.floor(window.gameTime)}`);
  Debug.add(`Root Entity count: ${scene.entities.size}`);

  // let totalVec2Calls = window.vec2Ctor.toLocaleString();
  // Debug.add(`Total Vec2 ctor calls: ${totalVec2Calls}`);
  // // Debug.add('Bullets: ' + window.count);

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

// function setup() {
//   let cvs = Utils.getEl('cvs');
//   let ctx = cvs.getContext('2d', { alpha: false });
//   p3 = new P3(cvs, ctx);
//   window.p3 = p3;

//   Pool.init();

//   scene = new Scene();

//   Debug.init({toggleKey: 'Escape'});
//   Debug.setOn(window.debug);

//   scene.restartGame();

//   timer = new GameTimer();
//   timer.update = function(dt) {
//     update(dt);
//     preRender();
//     render();
//     postRender();
//   };
//   timer.start();
// }
// setup();

// function setup() {
//   let cvs = Utils.getEl('cvs');
//   let ctx = cvs.getContext('2d', { alpha: false });
//   p3 = new P3(cvs, ctx);
//   window.p3 = p3;
//-   Pool.init();
//-   scene = new Scene();
//-   Debug.init({toggleKey: 'Escape'});
//-   Debug.setOn(window.debug);
//   scene.restartGame();
//   timer = new GameTimer();
//   timer.update = function(dt) {
//     update(dt);
//     preRender();
//     render();
//     postRender();
//   };
//   timer.start();
// }