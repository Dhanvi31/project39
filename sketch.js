var a,b,asteroid1,asteroid2,asteroid3;
var blast,blastImage,space,spaceImage;
var spaceShip,spaceShipImage, laserImage;
var shoot = 0;
var score = 0;
var laser,AGroup,laserGroup;
var explosionSound,laserSound,explasionImage;
var instruction = 0;
var play = 1;
var end = 2;
var gameState = instruction;
var endline,canvas;
function preload() {
  spaceImage = loadImage("images/space.png");
  spaceShipImage = loadImage("images/spaceship.png");
  laserImage = loadImage("images/laser.png");
  asteroid1 = loadImage("images/as1.png");
  asteroid2 = loadImage("images/as2.png");
  asteroid3 = loadImage("images/as3.png");
  blastImage = loadImage("images/explosion.png");
  explasionImage = loadImage("images/explosion.png");
  explosionSound = loadSound("mp3/explosion.mp3");
  laserSound = loadSound("mp3/laser sound.mp3");
}

function setup() {  
  canvas = createCanvas(1000,700);
  space = createSprite(250,350,30,20);
  space.addImage(spaceImage);
  space.velocityY = (5 + score/10);
                                  
  spaceShip = createSprite(250,600);
  spaceShip.addImage(spaceShipImage);
  spaceShip.scale = 0.6;
                          
  a = createSprite(250,600);
  //a.debug = true;
  a.setCollider("rectangle",70,-27,5,265,156);
  a.visible = false;
  b = createSprite(250,600); 
  b.setCollider("rectangle",-70,-27,5,265,24);
  //b.debug = true;
  b.visible = false;
                    
  AGroup = new Group;
  laserGroup = new Group;
                        
  endline = createSprite(250,700,500,5);
  endline.visible = false;
}                                   
function draw() {                                                                                                      
  background(0);                                                                                                            

  if(gameState === play) {
    // console.log(frameCount);
    
    if(space.y > 800) {
      space.y = 300;
    }
    
    shoot = shoot - 1;

    if(keyDown("up") && shoot < 460) {
      laser = createSprite(spaceShip.x,spaceShip.y - 130);
      laser.addImage(laserImage);
      laser.velocityY = -8; 
      laser.scale = 0.7;
      laserGroup.add(laser);
      laserSound.play();
      //console.log(laser.x);
      shoot = laser.y;
    }  

    if(keyDown("right") && spaceShip.x < 1400) {
      spaceShip.x = spaceShip.x + 10;
      a.x = a.x + 10;
      b.x = b.x + 10;
    }

    if(keyDown("left") && spaceShip.x > 50) {
      spaceShip.x = spaceShip.x - 10;
      a.x = a.x - 10;
      b.x = b.x - 10;
    }
    
    if(AGroup.isTouching(b) || AGroup.isTouching(a)) {
      AGroup.destroyEach();
      var blast = createSprite(spaceShip.x,spaceShip.y - 50);
      blast.addImage(blastImage);
      blast.lifetime = 25;
      explosionSound.play();
      spaceShip.destroy();
      gameState = end;
    }
    
    if(AGroup.isTouching(laserGroup)) {
      AGroup.destroyEach();
      laserGroup.destroyEach();
      explosionSound.play();
      score = score + 1;
    }

    asteroids();
    drawSprites();
    
    stroke("white");
    fill("white");
    textSize(30);
    text("score : " + score,210,60)
    
    if(AGroup.isTouching(endline)) {
      AGroup.destroyEach();
      gameState = end;
    }
    
  }
  else if(gameState === end) {
    space.velocityY = 0;
    stroke("yellow");
    fill("white");
    textSize(40);
    text("GAME OVER!",canvas.width/2-400,canvas.height/2);
   // text("The asteroids destroyed the planet",canvas.width/2-400,canvas.height/2+100);
    text("Your final score:"+score,canvas.width/2-400,canvas.height/2+200);

    
  }


  if(gameState === instruction) {
    stroke("white");
    fill("white");
    textFont("trebuchetMS")
    textSize(50);
    text("------SPACE WARRIORS------",canvas.width/2-300,canvas.height/2-300);
    text("FASTEN YOUR SEAT BELTS",canvas.width/2-300,canvas.height/2+100);
    stroke("yellow");
    fill("yellow");
    textSize(35);
    textFont("Apple Chancery");
    text(" Some asteroids are coming towords Earth.",canvas.width/2-300, canvas.height/2 - 210);
    text(" You are a space warrier.",canvas.width/2-300,canvas.height/2-170);
    text(" Help the people by distroying the astroids entering the earth surface !",canvas.width/2-300,canvas.height/2-130);
    text(" press up arrow to shoot.",canvas.width/2-300,canvas.height/2-90);
    text(" use right and left arrows to move.",canvas.width/2-300,canvas.height/2-50);
    text(" press 'space bar' to start game.",canvas.width/2,canvas.height/2-10);
    
    if(keyDown("space")) {
      gameState = play;
    } 
    if(keyDown("r")) {
      gameState = instruction;
    }
  }
}
  

function asteroids() {
  if(frameCount % 110 === 0) {
                                  
    var asteroid = createSprite(Math.round(random(50,1350)),-20);
    asteroid.velocityY = (6 + score/10);
    asteroid.lifetime = 200;
    asteroid.scale = random(0.4,0.5);
    //asteroid.debug = true;
                                           
    var rand = Math.round(random(1,3));
    switch(rand) {                   
      case 1: asteroid.addImage(asteroid1);
              asteroid.setCollider("circle",-80,10,160);
              break;                          
      case 2: asteroid.addImage(asteroid2);
              asteroid.setCollider("circle",50,0,150);
              break;
      case 3: asteroid.addImage(asteroid3);
              asteroid.setCollider("circle",0,0,170)
      default: break;
    }
    
    //console.log(asteroid.x);
    AGroup.add(asteroid);
  }
}