'use strict';

import Assets from './Assets.js';

let charMap = new Map;
let firstTime = true;

function loadData(){
	let assets = new Assets();
	let chars = assets.get('chars');

	chars.forEach( g => {
	  charMap.set(g.jpChar, g);
	});
}
export default class KanaMap {

  static getKanaData(kana){
  	if(firstTime){
  		loadData();
  	}
  	
  	return charMap.get(kana);
  }

  static getData(){
  	if(firstTime){
  		loadData();
  	}
    return charMap;
  }
}