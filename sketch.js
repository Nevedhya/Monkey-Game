var PLAY=1;
var END=0;
var gamestate=PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;

var ground;

var SurvivalTime=0;
var Score=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



  function setup() {
   createCanvas(600,600);
    
    monkey=createSprite(70,300,20,20);
    monkey.addAnimation("running",monkey_running);
    monkey.scale=0.1;
    //monkey.velocityX=5;
    
    ground=createSprite(100,400,1200,10);
    ground.x=ground.width/2;
    
     FoodGroup=createGroup();
     obstacleGroup=createGroup();
    
    
}


function draw() {
background("lavender");
  
  if(gamestate===PLAY) {
  
    
  food();
  obstacles();
    
    if (keyDown("space") && monkey.y >= 250 ) {
  monkey.velocityY=-10; 
   
 }
    
    
    if (monkey.isTouching(FoodGroup))  {
    FoodGroup.destroyEach();
    Score=Score+2;
    
  }
  
  if (monkey.isTouching(obstacleGroup))  {
   obstacleGroup.destroyEach(); 
    gamestate=END;
  } 
    
  stroke("black");
  textSize(20);
  fill("black");
  SurvivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: " + SurvivalTime,100,100);
    
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " +Score,400,500);
    
      }
  
  if (gamestate===END)  { 
    monkey.visible=false;
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    text("Game Over",300,300);
    text("Press R to Restart",300,320);
    text("Score: "+ Score,300,340);
    if (keyDown("r")) {
   reset(); 
    
  }
  
  }
  
  
  
  
 
  if (ground.x < 0)  {
   ground.x =ground.width/2; 
    
  }
   ground.velocityX = -4
  
  monkey.velocityY=monkey.velocityY+0.8;
  
  //ground.velocityX=-(4+ 3* score/100);
  
  
  monkey.collide(ground);
  
    
  
  
  
  
  
    
  
  
  
  
  
  drawSprites();

}

  function reset() {
   gamestate=PLAY; 
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
    monkey.visible=true;
   
  }
  


  
  function food() {
  if(frameCount%150===0){
  banana=createSprite(500,Math.round(random(180,220)));
  banana.addImage(bananaImage)
  banana.scale=0.1;
  banana.velocityX=-5;
  banana.setLifetime=100;
  FoodGroup.add(banana);
    
  }
      }

  function obstacles() {
   if(frameCount%300===0){
    obstacle=createSprite(520,350,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.3;
    obstacle.velocityX=-5;
    obstacle.setLifetime=100;
     obstacleGroup.add(obstacle);
     
      }
    
  }






