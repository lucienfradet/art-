//Handles the Game, GameLoop and GameOver

class Animation extends State {
  constructor() {
    super();

    this.startTime = frameCount/60;
    this.time = 0; //gameLoop time progression
    this.fatalCollision = false; //triggers the failure of the player (collision with an item)
    this.allStates = ['barrage', 'beam', 'wheelOfDoom', 'hole', 'random']; //possible spawner states including random
    this.choiceStates = ['barrage', 'beam', 'wheelOfDoom', 'hole']; //states that will be selected randomly
    this.currentState = undefined;
    this.index = 0; //controls the allStates index selection
    this.randomSpeed = 1; //Increments as the game loop progresses
    this.delay = 0;

    //Triggers gameEvents once and turn off.
    this.phase1 = true;
    this.phase2 = true;
    this.phase3 = true;
    this.phase4 = true;
    this.phase5 = true;
    this.phase6 = true;
    this.phase7 = true;
    this.phase8 = true;

    this.gameOverPhase = true;
    this.firstTry = true;
  }

  update() {
    background(0);
    this.time = frameCount/60 - this.startTime; //increments the time

    //debuggingSlidersDisplay(); //displays information about sliders on the gameScreen for realTime update


    //Radar and Tunnel deployment
    if (this.time > 0.1) { //Displays the whole tunnel and radar after a time
      for (let i = 0; i < tunnel.length; i++) {
        tunnel[i].deploy();
        }
    }

    //Tunnel functions
    for (let i = 0; i < tunnel.length; i++) {
      tunnel[i].display();
      tunnel[i].rotate();
      tunnel[i].update();
    }

    // tunnel[0].update();
    // tunnel[0].saveHistory();
    //
    // for (let i = tunnel[0].history.length - 1; i >= 1; i--) {
    //   tunnel[i].applyHistory(tunnel[0].history.length - i);
    // }
  }

  //handles the keyPresses
  keyPressed() {

  }
}
