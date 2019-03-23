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
  // this.p5 = this.p5 || p;

  this.images = {};
  this.atlases = {};
  this.audio = {};
  this.json = {};

  this.numAssetsLoaded = 0;

  /*
   */
  this.preload = function() {

    if (this.isDone()) {
      return;
    }

    let that = this;

    // ** ATLASES **
    if(Manifest.atlases){
      Manifest.atlases.forEach((v) => {

        loadImage(v.atlas, function(atlasImg) {
          // Once the image is loaded, get the meta file
          let xhr = new XMLHttpRequest();
          xhr.onload = function() {

            let atlas = new Atlas({
              name: v.name,
              img: atlasImg,
              meta: xhr.responseText,
              p: that.p5
            });

            that.atlases[v.name] = atlas;

            that.numAssetsLoaded++;
          };
          xhr.open('GET', v.meta);
          xhr.send();
        });
      });
    }

    // ** AUDIO
    Manifest.audio.forEach((v) => {
      // 
      that.audio[v.path] = new Howl({
        src: v.path,
        volume: 1,
        loop: false,
        autoplay: false,
        onload: v => {
          that.numAssetsLoaded++;
        }
      });
    });

    // ** JSON
    Manifest.json.forEach( j => {
      let n = j.name;

      fetch(j.path)
        .then(function(response){
          return response.json().then( data => {
            return {
              n: j.name,
              json: data
            }
          });
        })
        .then(function(data){
          that.numAssetsLoaded++;
          that.json[data.n] = data.json
        });
    })

    // ** IMAGES **
    if(Manifest.images){
      Manifest.images.forEach(v => {
        loadImage(v, p5img => {
          that.images[v] = p5img;
          that.numAssetsLoaded++;
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

    let totalAssets = numImages + numAtlases + numAudio + numDatas;

    return this.numAssetsLoaded === totalAssets;
  };

  /*
    Should find a better way of deciding which object to peek in.
   */
  this.get = function(key) {

    // We tried to get an asset that wasn't downloaded yet.
    if (!this.images[key] && !this.atlases[key] && !this.audio[key] && !this.json[key]) {
      throw Error(`${key} needs to be preloaded before it can be used.`);
    }

    if(this.json[key]){
      return this.json[key]
    }

    if (this.images[key]) {
      return this.images[key];
    }

    if (this.audio[key]) {
      return this.audio[key];
    }
  };

};