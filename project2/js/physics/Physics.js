/* ---> matter.js <--- PHYSICS ENGINE */

//module aliases for matter.js
let Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Runner = Matter.Runner,
    Constraint = Matter.Constraint;

class Physics {
  constructor() {
    this.engine = Engine.create({ gravity: {y: 1} }); //creates a world with default settings
    this.world = this.engine.world; //world in the engine for further use
    this.runner = Runner.create(); //not in use
  }

  //Run that damn physics engine baby!
  runWorld() {
    Runner.run(this.engine);
  }
}
