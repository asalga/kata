function sign(n) {
  return n > 0 ? 1 : -1;
}

class Behaviour {

  constructor(cfg) {
    this.sprite = cfg.sprite;
    // this.alphaSpeed = new Float32Array(this.sprite.pxCount);
  }

  applyForce(v) {
    for (let i = 0; i < this.sprite.pxCount; i++) {
      this.sprite.acc[i * 2 + 0] += v.x;
      this.sprite.acc[i * 2 + 1] += v.y;
    }
  }
}


export default class Explode extends Behaviour {

  constructor(cfg) {
    super(cfg);
    this.noiseOffset = random(0, 100);
    this.target = cfg.target;
    this.timer = cfg.timer || 0;
    this.isPlaying = false;
    this.timerStarted = false;
  }

  explode(p) {
    this.timerStarted = true;
    this.isPlaying = true;
    let v = createVector(0, 0);
    let m;
    let up = -350;

    for (let i = 0; i < this.sprite.pxCount; i++) {

      v.set(this.sprite.pos[i * 2 + 0], this.sprite.pos[i * 2 + 1]);
      v.sub(p);
      m = v.mag() * .85;

      this.sprite.acc[i * 2 + 0] += (50 / m) * v.x + sign(v.x) + (noise((i + this.noiseOffset) * 13) * 2 - 1) * 50;
      this.sprite.acc[i * 2 + 1] += up + (50 / m) * v.y + sign(v.x) + (noise(i + this.noiseOffset * 3) * 2 - 1) * 150;
    }
  }


  reset() {
    // this.isPlaying = true;

    // let x, y, rot, a;
    // // this.offset = this.sprite.position.x /100;

    // for(let i = 0; i < this.sprite.pxCount; i++){

    // 	x = this.sprite.pos[i * 2 + 0] / 150;
    // 	y = this.sprite.pos[i * 2 + 1] / 150;

    // 	rot = (noise(x + this.offset, y + this.offset))-1;

    // 	this.flowField[i*2 +0] = cos(rot * TWO_PI) * 10;
    // 	this.flowField[i*2 +1] = sin(rot * TWO_PI) * 10;

    // 	a = random(0.4, 0.8) + (noise((x + this.offset)*1, (y + this.offset) * 1));
    // 	this.alphaSpeed[i] = a * 200;
    // }
  }


  update(dt) {
    this.timer -= dt;

    if (this.timer < 0 && this.isPlaying === false) {
    	
      this.isPlaying = true;
      this.explode(createVector(this.sprite.center.x/2, this.sprite.center.y/2));
    }

    if (this.timer < -3) {
    	// debugger;
      this.sprite.reset();
    }

    if (this.isPlaying) {
      this.applyForce(createVector(0, 15));
    }

    for (let i = 0; i < this.sprite.pxCount; i++) {
      //this.trails[i].add({x:this.pos[i*2+0], y: this.pos[i*2+1]});

      this.sprite.vel[i * 2 + 0] += this.sprite.acc[i * 2 + 0];
      this.sprite.vel[i * 2 + 1] += this.sprite.acc[i * 2 + 1];

      this.sprite.pos[i * 2 + 0] += dt * this.sprite.vel[i * 2 + 0];
      this.sprite.pos[i * 2 + 1] += dt * this.sprite.vel[i * 2 + 1];

			this.sprite.col[i * 4 + 3] -= dt * 100;

      // bounce off walls
      if(this.sprite.position.x + this.sprite.pos[i*2] < 0){
      	this.sprite.vel[i*2] = -this.sprite.vel[i*2];
      }
      
      if(this.sprite.position.x + this.sprite.pos[i*2] > 640){
      	this.sprite.vel[i*2] = -this.sprite.vel[i*2];
      }
      // if (abs(this.vel[i*2]) > 0) {
      // this.col[i * 4 + 3] = this.col[i * 4 + 3]  * this.alphaSpeed[i] * 0.95;
      //dt * this.alphaSpeed[i] * 100;
      // }

      // this.vel[i*2+0] *= 0.9;
      // this.vel[i*2+1] += 2.1;
      // if(this.pos[i*2+1] < 0){
      // this.pos[i*2+1] = 0;
      // this.vel[i*2+1] = -this.vel[i*2+1];
      // }
    }

    this.sprite.clearAcceleration();

    // for (let i = 0; i < this.pxCount; i++) {
    //   this.trails[i].add({
    //     x: this.pos[i * 2 + 0],
    //     y: this.pos[i * 2 + 1]
    //   });
    // }
  }

}