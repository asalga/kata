'use strict'
/*
	Given a atlas metadata file along with the associated
	images, this script will create the actual atlas
*/
let W, H;
let images = [];
let downloadedImages = false;
let imageCount = 0;
let p5Images = [];
let drawFrame = false;

fetch('images/atlas.json')
  .then(function(response) {
    return response.json().then(data => {
      return data;
    });
  })
  .then(function(data) {
    console.log(data);

    W = data.meta.size.w;
    H = data.meta.size.h;

    imageCount = Object.values(data.frames).length;

    for (let o in data.frames) {
      // console.log(o, '  ----   ', data.frames[o]);
      // console.log(o);

      let frameName = 'images/' + o;
      // debugger;
      images.push({
        src: frameName,
        w: 10,
        h: 10,
        x: data.frames[o].frame.x,
        y: data.frames[o].frame.y,
        load: function() {
          loadImage(frameName, img => {
            p5Images.push(img);
          });
        }
      });
    }
    downloadedImages = true;
  });
let p;

window.setup = function() {
  console.log(W, H);
  p = createCanvas(W, H);
}

window.draw = function() {

  if (downloadedImages && drawFrame === false) {
    images.forEach(i => {
      i.load();
    });
    drawFrame = true;
  }

  if (drawFrame && p5Images.length === imageCount) {
    p5Images.forEach((v, e, a) => {
      image(v, images[e].x, images[e].y);
    });
    save();

    noLoop();
  }
}