/**
Sphere of noise
Lucien Cusson-Fradet

*/

"use strict";

let canvasWidth = 1160;
let canvasHeight = 893;
let canvas;

//fonts
let yoster;

//State of the simulation
let state;

/* The following should be in the Game.js but I'm short in time :( */
//matter.js objects
let world;
let wheel;

//Perlin noise Tunnel
const NUM_RING = 75;
let tunnel = [];

//radar and item spawner
let radar = [];
let spawner;

//sliders for debugging
let sliders = [];


function preload() {
  yoster = loadFont('assets/fonts/yoster.ttf');
}

/**
Creates the canvas and game assets in advance. (possibly also the debugging sliders)
*/
function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight, WEBGL);
  background(0);
  textFont(yoster); //getting an error if this ain't here lol

  //state = new Game();
  state = new Animation();

  //Creates the Physics engine and activates it
  //world = new Physics();
  //world.runWorld();

  //Creates the tunnel
  for (let i = 0; i < NUM_RING; i++) {
    let layer = i;
    let tunnelRing = new Tunnel(layer);
    tunnel.push(tunnelRing);
  }

  //Creates sliders for debugging
  // sliders[0] = new Slider({
  //   value: undefined,
  //   min: 0,
  //   max: 1,
  //   defaut: 0.8,
  //   step: 0.01,
  //   name: 'ballFriction',
  //   id: 0,
  //   callback: function (event) {
  //     meatBall.body.friction = sliders[0].update(0);
  //   }
  // });
}


/**
Updates the state
*/
function draw() {
  state.update();
  state.delay++;
}

function debuggingSlidersDisplay() {
  for (let i = 0; i < sliders.length; i++) {
    sliders[i].update(i);
  }
}

function keyPressed() {
  state.keyPressed();
}
