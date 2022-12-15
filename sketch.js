var END = 0
var PLAY = 1;
var WIN = 1;
var LOSE = 0;

var gameState = PLAY;

var green_ball,green_ballImg
var ground,groundImg
var invisibleGround
var obstacles, obstacle1,obstacle2
var bgSound
var gemstones,gem1,gem2,gem3
var collectingSound
var ground2Img
var time = 0
var rewards = 0

var flag,flagImg

function preload(){
  groundImg = loadImage("ASSETS/ground.png");
  ground2Img = loadImage("ASSETS/forest.jpg")
  green_ballImg = loadImage("ASSETS/blue ball.png")
  obstacle1 = loadImage("ASSETS/Boss_2-1.png.webp")
  obstacle2 = loadImage("ASSETS/the enemy.webp")
  bgSound = loadSound("ASSETS/World 1.mp3")
  gem1 = loadImage("ASSETS/Tanzanite_AG1-250x250C.png")
  gem2 = loadImage("ASSETS/africa-ruby-602070_s.png")
  gem3 = loadImage("ASSETS/polished-diamond.png")
  collectingSound = loadSound("ASSETS/collectcoin-6075.mp3")
  flagImg = loadImage("ASSETS/flag.png")
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  ground = createSprite(windowWidth/2,windowHeight/2+300)
  ground.addImage("ground",groundImg);
  ground.scale = 1.5

  green_ball = createSprite(windowWidth/8,windowHeight-175)
  green_ball.addImage("ball",green_ballImg)
  green_ball.scale = 0.15
  

  invisibleGround = createSprite(windowWidth/2,windowHeight/2+190,windowWidth,20)
  invisibleGround.visible = false;

  obstacles =  new Group()
  gemstones = new Group()
  green_ball.setCollider("circle",0,0,275);

  flag = createSprite(windowWidth/2,windowHeight-200)
  flag.addImage("flag",flagImg);
  flag.scale = 0.3
  flag.visible = false;
  flag.setCollider("rectangle",0,0,60,50)
 
  flag.debug = true
 //bgSound.play()
 //bgSound.setVolume(0.2)

}

function draw(){
  
  background("lightblue")
  if(gameState === PLAY){
   
    time = time + Math.round(getFrameRate()/60);
  green_ball.rotation += 10
  ground.velocityX = -10
  if(ground.x < 540 ){
    ground.x = windowWidth/2
  }
  if(keyDown("UP_ARROW") && green_ball.y >= 450){
    green_ball.velocityY = -20
  }
  green_ball.velocityY += 1
  green_ball.collide(invisibleGround)

  if(obstacles.isTouching(green_ball)){
    gameState = END;
  }
  if(gemstones.isTouching(green_ball)){
    collectingSound.play()
    rewards += 1
    collectingSound.setVolume(0.5)
    gemstones.destroyEach();
  }
  console.log(green_ball.y)
  // checkpoint
  if(time >= 50){
    flag.visible = true;
    obstacles.destroyEach()
    obstacles.setVelocityXEach(0);

    green_ball.velocityX = 5

    gemstones.destroyEach()
    gemstones.setVelocityXEach(0);
    //stop ground
    ground.velocityX = 0
  }
  if(green_ball.isTouching(flag)){
    gameState = WIN
    green_ball.velocityX = 0
    green_ball.velocityY = 0
   
  }
  spawnObstacles()
  spawnCollectibles()
}
else if(gameState === WIN){
  ground.addImage("ground2",ground2Img)
  ground.x = windowWidth/2
  ground.y = windowHeight/2
}
else if (gameState === END) {
  console.log("GAME OVER!!")
  obstacles.setLifetimeEach(-1);
  obstacles.setVelocityXEach(0);

  gemstones.setLifetimeEach(-1);
  gemstones.setVelocityXEach(0);
  ground.velocityX = 0
  green_ball.velocityX = 0
  green_ball.velocityY = 0
}
  drawSprites();
  textSize(20)
  fill ("black")
  text("Time:  "+ time,50,50)
  text("Rewards: "+ rewards,50,80)

}

function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(windowWidth,461,10,40);
    obstacle.scale = 0.85
    obstacle.setCollider("rectangle",0,0,120,120)
    obstacle.velocityX = -10;
    obstacles.add(obstacle)
     var rand = Math.round(random(1,2));
     switch(rand){
       case 1: obstacle.addImage(obstacle1);
               break;
       case 2: obstacle.addImage(obstacle2);
               break;

      default: break;
     }
    }
  }

function spawnCollectibles(){
  if(frameCount % 140 === 0){
    var collectibles = createSprite(windowWidth,windowHeight/2,10,40);
    collectibles.scale = 0.2
    var rand = Math.round(random(1,3))
    collectibles.velocityX = -10
    gemstones.add(collectibles)
    switch(rand){
      case 1: collectibles.addImage(gem1)
                          break;
      case 2: collectibles.addImage(gem2)
                          break;
      case 3: collectibles.addImage(gem3)
                          break;
      default : break
    }
  }
}
