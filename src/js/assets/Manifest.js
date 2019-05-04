'use strict';

let dataDir = '../data';

export default {
  images: [{
    name: 'img',
    path: `${dataDir}/img/i.jpg`
  }],

  json: [{
      name: 'chars',
      path: `${dataDir}/json/chars.json`
    },
    {
      name: 'words',
      path: `${dataDir}/json/words.json`
    }
  ],

  shaders: [{
    name: 'passthru',
    vert: `${dataDir}/shaders/pass-thru/test_vert.glsl`,
    frag: `${dataDir}/shaders/pass-thru/test_frag.glsl`
  }],

  atlases: [{
    name: 'hiragana',
    imgPath: `${dataDir}/atlas/hiragana.png`,
    metaPath: `${dataDir}/atlas/hiragana.json`
  }],

  audio: [{
      name: 'coin',
      path: `${dataDir}/audio/coin.wav`
    },
    {
      name: 'missed',
      path: `${dataDir}/audio/missed2.wav`
    }
  ]

};