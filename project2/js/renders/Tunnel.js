//Deals with the perlin noise tunnel of doom!

let deployed = false;
let angle = 0;

class Tunnel {
  constructor(layer) {
    this.NUM_RING = NUM_RING - 1; //to get tunnel length before the array is ceated
    this.radius = 150;
    this.layer = layer; //layer number in the tunnel array
    this.zPositionOffset = 0;
    this.profondeur = 5;
    this.deploymentSpeed = 0.8;
    this.colorOpacity = 2 * layer;
    this.position = createVector(0 , 0 , 0);
    this.ringRadius = 0; //radius of the tunnel entrance
    this.radiusOffset = 10; //amount of space that the perlin noise will have to affect the radius
    this.noiseZoff = 0.3; //a number makes it look like the tunnel is moving toward the viewer (not really what's happening, more like an illusion)
    this.zoff = this.noiseZoff * this.layer; //third dimension of perlin noise
    this.noiseProgressionSpeed = 0.08; //Speed with which the tunnel seems to be moving towards or away from the screen
    this.phase = 0; //if this is incremented, you get a rotation effect (position doesn't change)
    this.rotationSpeed = 0.02; //speed of the "rotation" incremented on the phase
    this.noiseMax = 5; //this value affects the amount and strenght of the noise peaks

    this.history = []; //Stores the tunnel[0] position history to input with a delay on the following tunnel rings

    angleMode(RADIANS);
    let i = map(this.layer, 0, this.NUM_RING, 0, TWO_PI);
      let x = sin(i) * this.radius;
      let y = cos(i) * this.radius;
      this.ringRadius = y;
      this.zPositionOffset = x;
  }

  //displays the tunnel
  display() {
    push();
    rotateY(angle);
    rotateX(angle + random(0, 0.0001));
    angle += 0.0001;
    stroke(255 - this.colorOpacity); //Dilute the stroke as the cricles move back on the z axis

    noFill();
    strokeWeight(1);




    //Draws the tunnel layers as shapes affected by 3D perlin noise
    beginShape();
    this.position.z = this.zPositionOffset;

      for (let i = 0; i < TWO_PI; i += (PI/50)) {
        let xoff = map(sin(i + this.phase), -1, 1, 0, this.noiseMax); //Map the sin function to the desired noiseRange
        let yoff = map(cos(i + this.phase), -1, 1, 0, this.noiseMax); //Map the cos function to the desired noiseRange
        let r = map(noise(xoff, yoff, this.zoff), 0, 1, this.ringRadius, this.ringRadius + this.radiusOffset); //Map the noise to the radius and desired radius radiusOffset
        let x = r * sin(i);
        let y = r * cos(i);
        vertex(x + this.position.x, y + this.position.y, this.position.z); //draws every vertex of the circle
      }
    endShape(CLOSE);

    pop();

    //increments the noise on the z axis
    this.zoff += this.noiseProgressionSpeed;
  }

  //updates the first layer of the tunnel according to the wheel.position
  update() {
    push();
    //angleMode(RADIANS);
    //let matriceRot = map(sin(angle), -1, 1, 0, TWO_PI);

    pop();
  }

  //seamingly rotates the tunnels to fit the rotating visuals
  rotate() {
    if (keyIsDown(65)) { //A key
      this.phase -= this.rotationSpeed;
    }

    if (keyIsDown(68)) { //D key
      this.phase += this.rotationSpeed;
    }
  }

  //deploys the tunnel to the set profondeur parameter
  deploy() {
    // deployed = true;
    // if (this.zPositionOffset < this.profondeur) {
    //   this.zPositionOffset += this.deploymentSpeed;
    //   this.position.z = -this.zPositionOffset * this.layer;
    // }
  }

  //pushes the tunnel[0].position history into an array
  saveHistory() {
    if (this.history.length > NUM_RING - 2) {
      this.history.splice(0, 1);
    }

    let vPos = createVector(this.position.x, this.position.y);

    this.history.push(vPos);
  }

  //gives a wavy visual effect to the whole tunnel when the first layer moves
  applyHistory(i) {
    this.position.x = tunnel[0].history[i].x;
    this.position.y = tunnel[0].history[i].y;
  }
}
