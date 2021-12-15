//matter.js body that holds the meatBall

class Wheel {
  constructor() {
    //Parameters to create the Wheel object
    this.NUM_PARTS = 30;
    this.parts = []; //rectangle body parts
    this.compoundBody; //Body composed of all the parts
    this.composite; //a ensemble of bodies and constraints
    this.h = 40; //height of the rectangle parts
    this.radius = tunnel[0].radius + this.h; //Radius of the wheel based on the tunnel radius
    this.w = TWO_PI * this.radius / this.NUM_PARTS; //width of the rectangle parts
    this.wheelRotationSpeed = 0.02; //Amount of rotation that the player can give the wheel with 'A'/'D' keys
    this.jumpForce = 1.5; //Force applied to the wheel when the player hits SpaceBar

    //Creates a rectangle body for every part of the wheel
    for(let i = 0; i < this.NUM_PARTS; i++) {
        let angle = i / this.NUM_PARTS * TWO_PI;
        let x = cos(angle);
        let y = sin(angle); //cos/sin functions so the bodies are created following a circle
        let cx = x * this.radius;
        let cy = y * this.radius; //Adapt the circle to the desired radius
        let config = {
          x: cx,
          y: cy,
          w: this.w,
          h: this.h,
          options: {
             angle: angle,
             isStatic: false,
             inertia: Infinity //Prevents the parts from rotating on their axies! 7 hours later. Merci jésus marie joseph bonne enfant.
            }
        };
        //Function that creates the bodies
        let square = this.addRect(config);
        this.parts.push(square); //adds the parts to the parts array
      }

    //Create the compoundBody with the different parts
    this.createBody(this.parts);

    //Parameters for the center joint constraint
    this.constraint;
    this.constraintOptions = {
      pointA: { x: 0, y: 0 },
      bodyB: this.compoundBody,
      pointB: { x: 0, y: 0 },
      stiffness: 0.01, //acts more or less like a rubberBand
      length: 0
    }

    //Create the Constraint
    this.constraint = Constraint.create(this.constraintOptions);

    this.composite = Composite.create();
    this.composite = Composite.add(world.world, [this.compoundBody, this.constraint]); //Add the final compoundBody and constraint as a Composite in the world! Fiouuu!

  }

  //Creates rectangular matter.js bodies
  addRect({ x, y, w, h, options = {} }) {
	let body = Bodies.rectangle(x, y, w, h, options);
	return body;
  }

  //Create the compoundBody with the different parts
  createBody(parts) {
    this.compoundBody = Body.create({ parts: parts });
  }

  //Displays the wheel (mainly for testing and visualisation, not in the final version)
  display() {
    for (let i = 1; i <= this.NUM_PARTS; i++) { //Starting at 1 because the createBody function pushes the whole array and inserts a "self reference to the current body instance" in the [0] spot
      let pos = this.parts[i].position;
      let angle = this.parts[i].angle;

      push();
      translate(pos.x, pos.y);

      //add or remove compoundBody.angle (acts as an offset to display the parts still or rotating on their own axes (NOTE: matter.js doesn't actually think of them as rotating!)
      rotate(angle + this.compoundBody.angle);
      rectMode(CENTER);
      noFill();
      strokeWeight(1);
      stroke(255);
      rect(0, 0, this.w, this.h);
      pop();
    }

    //Visualisation of the constraint as a line
    push();
    stroke(255);
    line(this.constraint.pointA.x, this.constraint.pointA.y, this.compoundBody.position.x, this.compoundBody.position.y);
    pop();
  }

  //Allows the player to rotate the wheel with 'A' and 'D' keys
  rotate() {
    if (keyIsDown(65)) { //A key
      Body.setAngularVelocity(this.compoundBody, -this.wheelRotationSpeed);
    }

    if (keyIsDown(68)) { //D key
      Body.setAngularVelocity(this.compoundBody, this.wheelRotationSpeed);
    }  
  }

  //saves the latest point of contact between the wheel and meatBall to allow for a force perpendicular to the meatBall to be applied on the wheel
  storeCollisions() {
    //check if the arrays are empty or not
    let col = world.engine.pairs.collisionActive.length;
    if (col > 0) {
      let contact = world.engine.pairs.collisionActive[0].activeContacts.length;
      if (contact > 0) {
        //Get the point of collision
        let contactX = world.engine.pairs.collisionActive[0].activeContacts[0].vertex.x;
        let contactY = world.engine.pairs.collisionActive[0].activeContacts[0].vertex.y;
        //Creates a vector with the PoC (point of collision)
        let contactVector = createVector(contactX, contactY);
        //Normalize vector and multiply by the desired jumpForce
        contactVector.normalize();
        contactVector = p5.Vector.mult(contactVector, -this.jumpForce);

        this.collision = contactVector;
      }
    }
  }

  //Allows for the wheel to jump and the meatBall to be pushed around a lil' bit
  keyPressed() {
    if (keyCode === 32) { //SpaceBar

      if (this.collision !== undefined) {
          //Apply the force
          Body.applyForce( this.compoundBody, {x: this.compoundBody.position.x, y: this.compoundBody.position.y}, {x: this.collision.x, y: this.collision.y} );
        }
      else { //if all hell breaks loose, apply a backUp force straight from the bottom
        Body.applyForce( this.compoundBody, {x: this.compoundBody.position.x, y: this.compoundBody.position.y}, {x: 0, y: -this.jumpForce} );
      }
    }

    //Small force on the meatBall, allows for momentum to build up faster, controlling the ball in mid air and pushing forward while the wheel is spinning
    if (keyCode === 65) { //A key
      Body.applyForce( meatBall.body, {x: meatBall.body.position.x, y: meatBall.body.position.y - meatBall.radius}, {x: -this.wheelRotationSpeed, y: 0} );
    }
    if (keyCode === 68) { //D key
      Body.applyForce( meatBall.body, {x: meatBall.body.position.x, y: meatBall.body.position.y - meatBall.radius}, {x: this.wheelRotationSpeed, y: 0} );
    }
  }
}
