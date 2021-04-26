var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var score=0;
var ground;
var survivalTime=0,points;
var PLAY=0;
var END=1
var gamestate=PLAY;
var bg,bgimage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 bgimage = loadImage("Sky_WhiteHatJr.jfif")
}



function setup() {
  createCanvas(600,600)
  bg = createSprite(400,350,900,10);
bg.addImage(bgimage);
  bg.scale=4;
monkey = createSprite(80,565,20,20)  
monkey.addAnimation("running",monkey_running)
  monkey.scale=0.1;
 
  
  ground=createSprite(400,570,900,10);
  
   FoodGroup = createGroup();
  obstacleGroup= createGroup();
  
 }


function draw() {
  background("white");
  
  if(gamestate===PLAY){
    
    ground.visible= false;

  if(bg.x>0){
  bg.x=bg.width/2;
  //console.log(ground.x)
  }
  

  
  if(keyDown("space") && monkey.y >=150){
    //console.log (monkey.y)
    monkey.velocityY=-12 
   }
    
    points=Math.round(random(10,40))
    switch(points){
        case 10: monkey.scale=0.12;
        break;
        case 20: monkey.scale=0.14;
        break;
        case 30: monkey.scale=0.16;
        break;
        case 40: monkey.scale=0.18;
        break;
    }
  
    // add gravity
   monkey.velocityY = monkey.velocityY + 0.8
  
   // make the monkey touch the ground
   monkey.collide(ground);
  
  spawnbananas();
  spawnObstacles();
  
  
  
  if(FoodGroup.isTouching(monkey)){
    score=score+2;
    FoodGroup.destroyEach();
    }
    
  if( obstacleGroup.isTouching(monkey)){
     monkey.scale=0.2;

     gamestate=END
    }
    
  }
  
  drawSprites();
  
  
  if(gamestate===END){
    
  
    
     FoodGroup.SetVelocityXEach=(0)
     obstacleGroup.SetVelocityXEach=(0)
     monkey.velocityX=0;
     ground.velocityX=0;
     monkey.destroy();
     obstacleGroup.destroyEach();
    FoodGroup.destroyEach()
    textSize(50);
    fill("black")
    text("Game Over",200,300);
  }

  
  stroke("black");
  textSize(20);
  fill("red");
  survivalTime=Math.ceil(frameCount/getFrameRate())
  text("Survival Time="+survivalTime,100,50)
  
  stroke("black");
  textSize(20);
  fill("lightblue");
  text("Score="+score,500,50);
}

function spawnbananas(){
  if(frameCount%60 ===0){
    banana = createSprite(610,450,20,20)
    banana.y = Math.round(random(250,350));
    banana.addImage(bananaImage)
    banana.scale=0.1
    banana.velocityX=-5;
    banana.lifetime=210
    FoodGroup.add(banana)
   }
  }

function spawnObstacles(){
  if(frameCount%60===0){
   obstacle=createSprite(610,557,20,20)
  obstacle.addImage(obstacleImage)
  obstacle.scale=0.1
    obstacle.velocityX=-7
    obstacle.lifetime=210
    obstacleGroup.add(obstacle)
    }

}



