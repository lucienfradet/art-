class MeatBall {
  constructor(x, y, radius) {
    this.radius = radius;
    this.friction; //from 0 to 1 -- default 0.1
    this.detail = 7; //looks of the sphere.
    this.body = Bodies.circle(x, y, this.radius, {friction: this.friction});
    Composite.add(world.world, this.body); //adds the body to matter.js world
  }

  display() {
    //Properties of the matter.js body
    let pos = this.body.position;
    let angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill(255);
    noStroke();
    //stroke(255);
    //strokeWeight(1);
    ellipseMode(CENTER);
    ellipse(0, 0, this.radius * 2, this.radius * 2, this.detail);

    //Drawing a line to visualise the rotation and for testing
    stroke(255, 0, 0);
    strokeWeight(1);
    //line(0, 0, 0 + this.radius, 0);
    pop();
  }

  //NOT USED vizualises when the ball was anchored to the wheel
  displayAnchored() {
    let pos = this.body.position;
    let angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill(0);
    noStroke();
    //stroke(255);
    //strokeWeight(1);
    ellipseMode(CENTER);
    ellipse(0, 0, this.radius, this.radius, this.detail);
    pop();
  }
}
