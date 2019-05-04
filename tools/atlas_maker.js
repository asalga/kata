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
let cvsCreated = false;
let pg;
let pgbk;
let finalImg;

fetch('data/atlas/hiragana.json')
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

      let frameName = 'data/atlas/hiragana/' + o;

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

window.setup = function() {};

window.draw = function() {

  if (W && H && cvsCreated === false) {
    cvsCreated = true;
    p = createCanvas(W, H);
    pg = createGraphics(W,H);
    pgbk = createGraphics(W,H);
    finalImg = createImage(W,H);
    
    pgbk.noStroke();
    let c = 0;
    let barHeight = 2;
    for(let y = 0; y < H; y += barHeight, c += 2){
      pgbk.fill(10, (c%32)/32 * 255 , 50);
      pgbk.rect(0, y, W, y+barHeight);
    }
  }

  if (downloadedImages && drawFrame === false) {
    images.forEach(i => {
      i.load();
    });
    drawFrame = true;
  }

  if (drawFrame && p5Images.length === imageCount) {
    p5Images.forEach((v, e, a) => {
      // tint(255, 140, 255, 255);
      pg.image(v, images[e].x, images[e].y);
    });

    finalImg.blend(pgbk, 0, 0, W, H, 0, 0, W, H, NORMAL);
    finalImg.mask(pg);
    image(finalImg, 0, 0);
    
    save('__hiragana.png');
    noLoop();
  }
};