var PLAY = 1;
var END = 0;
var gameState = PLAY;
var sword,swordImage;
var fruit1Image,fruit2Image,fruit3Image,fruit4Image,fruitGroup,enemyGroup;
var monster,monsterImage;
var gameOver;
var score;
var gameOverSound,cuttingSound;
function preload(){
  swordImage = loadImage("sword.png");
  monsterImage=
  loadAnimation("alien1.png","alien2.png");
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  gameOver = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");
  cuttingSound = loadSound("knifeSwooshSound.mp3")
}
function setup(){
  createCanvas(600,600);
  //creating sword sprite
  sword = createSprite(40,200,20,20);
  sword. addImage(swordImage);
  sword. scale = 0.7;
  
  fruitGroup = new Group();
  enemyGroup = new Group();
  //giving the shape the properties to the sword collider
  sword.setCollider("circle",0,0,50);
  //current score at the beginning
  score = 0;
}
function draw(){
  background("white");
  //displaying score
  text("SCORE:"+score,450,50);
  
  if(gameState === PLAY){
    Fruits();
    Enemy();
    //giving the position of sword according to the mouse
    sword.x = World.mouseX;
    sword.y = World.mouseY;
    
    if(fruitGroup.isTouching(sword)){
      //giving a slashing sound if sword touches any fruit
      cuttingSound.play();
      fruitGroup.destroyEach();
      //adding score as the sword cuts fruits
      score = score+2;
    }
    if(enemyGroup.isTouching(sword)){
      gameState = END;
      //giving gameover sound to the game
      gameOverSound.play();
    }
  }
  else if(gameState === END){
    //destroy fruits and enemy after end gamestate
    fruitGroup.destroyEach();
    fruitGroup.velocityX=0;
    enemyGroup.destroyEach();
    enemyGroup.velocityX=0;
    //changing image from sword to gameOver display
    sword.addImage(gameOver);
    sword.x = 200;
    sword.y = 200;
  }
  
  drawSprites();
}
function Fruits(){
  if(frameCount % 80===0){
    position = Math.round(random(1,2));
    fruit = createSprite(500,200,20,20);
    fruit.scale=0.2;
    //chosing any random fruit
    r = Math.round(random(1,4));
    if(r===1){
      fruit.addImage(fruit1Image)
    }
    else if(r===2){
      fruit.addImage(fruit2Image)
    }
    else if(r===3){
      fruit.addImage(fruit3Image)
    }
    else{
      fruit.addImage(fruit4Image)
    }
    //position of fruit coming from right side or left side
    if(position === 1){
      fruit.x = 400;
      fruit.velocityX = -(7+(score/4));
    }
    else if(position === 2){
      fruit.x = 0;
      fruit.velocityX = (7+(score/4));
    }
    //fruits position
    fruit.y = Math.round(random(50,340));
    //fruit lifetime
    fruit.lifetime = 100;
    
    fruitGroup.add(fruit);
  }
}

function Enemy(){
  if(frameCount % 200==0){
    monster = createSprite(500,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y = Math.round(random(100,300));
    monster.velocityX = -(8+(score/10));
    
    monster.lifetime = 50;
    
    enemyGroup.add(monster);
  }
}