var player;
var playerImg;
var playerState = "normal";
var playerDirection = "Left";
var slash;
var slashImg;
var levelCount = 1;
var lifeCount = 3;
var lifeCounter;
var lifeImg;
var enemy
var enemyImg;
var ground;
var checkpoint;
var platformGroup;
var flagImg;
var checkpointcounter;
var cloud;
var cloudImg;
var tempCloud;
var spring;
var springImg;
var gameState = "play";
var lifeup;
var lifeupImg;
var conveyorR;
var conveyorImgR;
var invisibleconveyorR;
var conveyorL;
var conveyorImgL;
var invisibleconveyorL;
var shadowling;
var shadowImg1;
var shadowImg2;
var ladder;
var ladderImg;
var flame;
var flameImg;

function preload(){
  playerImg = loadAnimation("Images/Placeholder_Player0.png");
  lifeImg = loadAnimation("Images/Placeholder_Lifecount0.png");
  enemyImg = loadAnimation("Images/Placeholder_Enemy0.png");
  flagImg = loadAnimation("Images/Placeholder_Flag0.png");
  springImg = loadAnimation("Images/Placeholder_Spring0.png");
  cloudImg = loadAnimation("Images/Placeholder_Cloud0.png");
  lifeupImg = loadAnimation("Images/Placeholder_Heart0.png");
  conveyorImgR = loadAnimation("Images/Placeholder_ConveyorR0.png");
  conveyorImgL = loadAnimation("Images/Placeholder_ConveyorL0.png");
  shadowImg1 = loadAnimation("Images/Placeholder_Shadow0.png");
  shadowImg2 = loadAnimation("Images/Placeholder_ShadowDown0.png");
  ladderImg = loadAnimation("Images/Placeholder_Ladder0.png");
  flameImg = loadAnimation("Images/Placeholder_Fireball0.png");
  slashImg = loadAnimation("Images/Placeholder_Slash0.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  ground = createSprite(windowWidth/2,600,10000,10);
  player = createSprite(1000,500,10,10);
  player.addAnimation("default",playerImg);
  player.scale=0.5;

  lifeCounter = createSprite(100,100,10,10);
  lifeCounter.addAnimation("regular",lifeImg);

  enemy = createSprite(1300,500,10,10);
  enemy.addAnimation("normal",enemyImg);
  enemy.scale = 0.5;

  checkpoint = createSprite(100,500,10,10);
  checkpoint.addAnimation("Flag",flagImg);
  checkpoint.scale = 0.5;

  checkpointcounter = createSprite(1000,500,10,10);
  checkpointcounter.visible = false;

  tempCloud = createSprite(400,450,50,10);
  tempCloud.visible = false;

  cloud = createSprite(400,450,50,10);
  cloud.addAnimation("Cloud",cloudImg);
  cloud.scale = 0.5;

  spring = createSprite(400,420,10,10);
  spring.addAnimation("Spring",springImg);
  spring.scale = 0.2;

  lifeup = createSprite (800,420,10,10);
  lifeup.addAnimation("Heart",lifeupImg);
  lifeup.depth = player.depth - 1;
  lifeup.scale = 0.5;

  conveyorR = createSprite(1000,300,10,10);
  conveyorR.addAnimation("Right",conveyorImgR);
  conveyorR.scale=0.5;

  invisibleconveyorR = createSprite(1000,280,105,10);
  invisibleconveyorR.visible = false;

  conveyorL = createSprite(1250,300,10,10);
  conveyorL.addAnimation("Left",conveyorImgL);
  conveyorL.scale=0.5;

  invisibleconveyorL = createSprite(1250,280,105,10);
  invisibleconveyorL.visible = false;

  shadowling = createSprite (200,0,10,10);
  shadowling.addAnimation("Alive",shadowImg1);
  shadowling.addAnimation("Dead",shadowImg2);
  shadowling.scale = 0.5;

  ladder = createSprite(1125,250,10,10);
  ladder.addAnimation("Goal",ladderImg);
  ladder.scale =  0.5;

  flame = createSprite(1500,windowHeight/2,10,10);
  flame.addAnimation("fireball",flameImg);
  flame.scale = 0.2;
  flame.velocityY = 7;
}

function draw() {
  background("Yellow");

  camera.position.x = player.position.x;

  console.log(player.y);

  textSize(50);
  text(lifeCount,200,120);

  textSize(50);
  text("Level :"+ levelCount,1000,120);

  if(gameState==="play"){
  player.collide(ground);
  player.collide(tempCloud);
  player.collide(conveyorL);
  player.collide(conveyorR);
  enemy.collide(ground);


  if(keyWentDown("W")&&playerState==="normal"){
    player.velocityY = -10;
  }
  else if(keyWentDown("W")&&playerState==="jumpboost"){
    player.velocityY = -15;
  }
  if(keyWentDown("A")){
    player.velocityX = -10;
    playerDirection = "Left";
  }
  if(keyWentUp("A")){
    player.velocityX = 0;
  }
  if(keyWentDown("D")){
    player.velocityX =10;
    playerDirection = "Right";
  }
  if(keyWentUp("D")){
    player.velocityX = 0;
  }
  if(keyWentDown("SPACE")&&playerDirection === "Right"){
    slash = createSprite(player.x+50,player.y,10,10);
    slash.addAnimation("Swordslash",slashImg);
    slash.scale=0.5;
    slash.lifetime=5;

    if(enemy.isTouching(slash)){
      enemy.lifetime=1;
    }
    if(shadowling.isTouching(slash)){
      shadowling.lifetime=1;
    }
  }
  else if(keyWentDown("SPACE")&&playerDirection === "Left"){
    slash = createSprite(player.x - 50,player.y,10,10);
    slash.addAnimation("Swordslash",slashImg);
    slash.scale=0.5;
    slash.lifetime=5;

    if(enemy.isTouching(slash)){
      enemy.lifetime=1;
    }
    if(shadowling.isTouching(slash)){
      shadowling.lifetime=1;
    }
  }
  player.velocityY = player.velocityY+0.5;

  enemy.velocityY = player.velocityY;

  if(player.x > enemy.x - 100){
    enemy.velocityX = 5;
  }
  else if(player.x < enemy.x + 100){
    enemy.velocityX = -5;
  }
  else{
    enemy.velocityX = 0;
  }




  if(player.isTouching(checkpoint)){
    checkpointcounter.x = checkpoint.x;
    checkpointcounter.y = checkpoint.y;
  }

  if(player.isTouching(enemy)){
    player.x = checkpointcounter.x;
    player.y = checkpointcounter.y;
    lifeCount = lifeCount - 1;
  }

  if(player.isTouching(cloud)){
    cloud.lifetime=20;
    tempCloud.lifetime=20;
  }

  if(player.isTouching(spring)){
    playerState = "jumpboost";
    spring.lifetime = 1;
  }

  if(player.isTouching(lifeup)){
    lifeup.lifetime = 1;
    lifeCount = lifeCount + 1;
  }

  if(player.isTouching(invisibleconveyorR)){
    player.velocityX = 15;
  }

  if(player.isTouching(invisibleconveyorL)){
    player.velocityX = -15;
  }

  if(shadowling.x < player.x && playerDirection === "Right"){
    shadowling.velocityX = 4;
    shadowling.changeAnimation("Alive",shadowImg1);
  }
  else if(shadowling.x < player.x && playerDirection === "Left"){
    shadowling.velocityX = 0;
    shadowling.changeAnimation("Dead",shadowImg2);
  }
  if(shadowling.y < player.y){
    shadowling.velocityY = 4;
  }
  else if(shadowling.y > player.y){
    shadowling.velocityY = -4;
  }
  if(shadowling.x > player.x && playerDirection === "Left"){
    shadowling.velocityX = -4;
    shadowling.changeAnimation("Alive",shadowImg1);
  }
  else if(shadowling.x > player.x && playerDirection === "Right"){
    shadowling.velocityX = 0;
    shadowling.changeAnimation("Dead",shadowImg2);
  }

  if(player.isTouching(shadowling)){
    player.x = checkpointcounter.x;
    player.y = checkpointcounter.y;
    lifeCount = lifeCount - 1;
  }

  if(player.isTouching(ladder)){
    ladder.lifetime = 1;
    levelCount = levelCount + 1;
  }

  if(flame.y > 650){
    flame.velocityY = -7;
  }
  else if(flame.y < windowHeight/2){
    flame.velocityY = 7;
  }

  if(player.isTouching(flame)){
    player.x = checkpointcounter.x;
    player.y - checkpointcounter.y;
    lifeCount = lifeCount - 1;
  }

  if(lifeCount === 0){
    gameState = "end";
  }

  if(keyDown("K")){
    enemy.lifetime = 1;
    shadowling.lifetime = 1;
  }


}

  if(gameState === "end"){
    textSize(100);
    fill("RED");
    text("GAME OVER",windowWidth/2 - 300,windowHeight/2);

    enemy.velocityX = 0;
    enemy.velocityY = 0;
    player.velocityX = 0;
    player.velocityY = 0;
    shadowling.velocityX = 0;
    shadowling.velocityY = 0;
  }

  drawSprites();
}

