const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var bck;
var angle;
var ground;
var launcher;
var rockets = [];
var tanks = [];
var isGameOver = false;
var score = 0;

function preload(){
  bck = loadImage("assets/bck.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 230;

  ground = new Ground(width/2, height, width, height/3);
  launcher = new Launcher(185, height/1.37, 150, 200, angle);
}


function draw() 
{
  background(bck);
  Engine.update(engine);

  ground.display();
  launcher.display();
  showTanks();

  for(var i = 0; i < rockets.length; i++){
    if(rockets[i] !== undefined){
      rockets[i].display();
      collisionWithTank(i);
      collisionWithGround(i);
    }
  }

  fill("#6d4c51");
  textSize(40);
  text("Tanks Destroyed: "+ score, width-400, 50);
}

function keyPressed(){
  if(keyCode === 32){
    var posX = launcher.x;
    var posY = launcher.y;
    var angle = launcher.angle;

    var rocket = new Rocket(posX, posY, 70, 150, angle);

    Matter.Body.setAngle(rocket.body, angle);
    rockets.push(rocket);
  }
}

function keyReleased(){
  if(keyCode === 32){
    if(rockets.length){
      var angle = launcher.angle;
      rockets[rockets.length - 1].shoot(angle);
    }
  }
}

function showTanks(){
  if(tanks.length > 0){
    if(tanks[tanks.length - 1] === undefined || tanks[tanks.length - 1].body.position.x < width - 300){
      var tank = new Tank(width, height/1.3, 200, 150);
      tanks.push(tank);
    }

    for(var i = 0; i < tanks.length; i++){
      if(tanks[i]){
        Matter.Body.setVelocity(tanks[i].body, {
          x: -3,
          y: 0
        });
        tanks[i].display();

      }
      else{
        tanks[i];
      }
    }
  }
  else{
    var tank = new Tank(width, height/1.3, 200, 150);
    tanks.push(tank);
  }
}

function collisionWithTank(index){
  for(var i = 0; i < tanks.length; i++){
    if(rockets[index] !== undefined && tanks[i] !== undefined){
      var collision = Matter.SAT.collides(rockets[index].body, tanks[i].body);

      if(collision.collided){
        tanks[i].remove(i);
        Matter.Body.setVelocity(tanks[i].body, {
          x: 0,
          y: 0
        });
        score += 1;

        Matter.World.remove(world, rockets[index].body);
        delete rockets[index];
      }
    }
  }
}

function collisionWithGround(index){
  for(var i = 0; i < rockets.length; i++){
    if(rockets[index] !== undefined){
      var gCollision = Matter.SAT.collides(rockets[index].body, ground.body);
      if(gCollision.collided){
        rockets[index].remove(i);
      }
    }
  }
}

