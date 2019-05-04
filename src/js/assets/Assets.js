'use strict';

// const Howler = require('Howler');
// const Howl = require('Howler').Howl;

import Manifest from './Manifest.js';
import Atlas from './Atlas.js';

let instance;

export default function Assets(p) {

  if (instance) {
    return instance;
  }

  instance = this;
  this.cbCalled = false;
  this.cb = function() {};

  this.assetTypes = {
    'image': {},
    'atlas': {},
    'audio': {},
    'json': {},
    'shaders': {}
  };

  this.numAssetsLoaded = 0;

  /*
   */
  this.preload = function(cb) {
    this.cb = cb;

    if (this.isDone()) {
      return;
    }

    let that = this;

    //
    //
    // ** ATLASES
    //
    if (Manifest.atlases) {
      Manifest.atlases.forEach(a => {

        loadImage(a.imgPath, function(atlasImg) {
          // Once the image is loaded, get the meta file
          let xhr = new XMLHttpRequest();
          xhr.onload = function() {
            let atlas = new Atlas({
              name: a.name,
              p5Img: atlasImg,
              meta: xhr.responseText
            });

            that.assetTypes['atlas'][a.name] = atlas;
            that.numAssetsLoaded++;
            console.log('loaded atlas: ', a.name);
          };
          xhr.open('GET', a.metaPath);
          xhr.send();
        });
      });
    }

    //
    //
    // ** AUDIO
    //
    Manifest.audio.forEach(v => {

      let h = new Howl({
        src: v.path,
        volume: 1,
        loop: false,
        autoplay: false,
        onload: v => {
          that.numAssetsLoaded++;
        }
      });

      // that.audio[v.path] = h;
      that.assetTypes['audio'][v.name] = h;
    });

    //
    //
    // ** SHADERS
    //
    Manifest.shaders.forEach(j => {
      let n = j.name;

      let v = fetch(j.vert)
        .then(function(res) {
          return res.text().then( function(shaderSource){
            return { name: n, src: shaderSource };
          })
        });
  
      let f = fetch(j.frag)
        .then(function(res) {
          return res.text().then( function(shaderSource){
            return { name: n, src: shaderSource };
          })
        });

      Promise.all([v, f]).then(function(shaders) {
        let n = shaders[0].name;
        that.assetTypes['shaders'][n] = {
          vert: shaders[0].src,
          frag: shaders[1].src
        };

        console.log('loaded shader: ', n);
        that.numAssetsLoaded++;
      });

    });

    //
    //
    // ** JSON
    //
    Manifest.json.forEach(j => {
      let n = j.name;

      fetch(j.path)
        .then(function(response) {
          return response.json().then(data => {
            return {
              n: j.name,
              json: data
            }
          });
        })
        .then(function(data) {
          that.numAssetsLoaded++;
          that.assetTypes['json'][data.n] = data.json;
          console.log('loaded  json: ', j.name);
        });
    });

    // ** IMAGES **
    if (Manifest.images) {
      Manifest.images.forEach(v => {
        loadImage(v.path, p5img => {
          // that.images[v] = p5img;
          that.numAssetsLoaded++;
          that.assetTypes['image'][v.name] = p5img;
        });
      });
    }

  };

  /*
    TODO: fix
   */
  this.isDone = function() {
    let numAtlases = (Manifest.atlases && Manifest.atlases.length) || 0;
    let numAudio = (Manifest.audio && Manifest.audio.length) || 0;
    let numImages = (Manifest.images && Manifest.images.length) || 0;
    let numDatas = (Manifest.json && Manifest.json.length) || 0;
    let numShaders = (Manifest.shaders && Manifest.shaders.length) || 0;

    let totalAssets = numImages + numAtlases + numAudio + numDatas + numShaders;

    if (this.numAssetsLoaded === totalAssets && this.cbCalled === false) {
      this.cbCalled = true;
      this.cb();
    }

    return this.numAssetsLoaded === totalAssets;
  };

  /*
    Should find a better way of deciding which object to peek in.
   */
  this.get = function(...args) {

    if (args.length === 2) {
      let type = args[0];
      let k = args[1];
      return this.assetTypes[type][k];
    }
  };

};