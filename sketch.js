var PLAY = 1
var END = 0
var gameState = PLAY
var princessImg
var backgroundImg
var gBananaImg
var bBananaImg
var score=0
var bscore=0
var winImg
var loseImg

function preload(){
    princessImg = loadImage('princess.png');
    backgroundImg = loadImage('castle.jpg');
    gBananaImg = loadImage('banana.png');
    bBananaImg = loadImage('bad-banana.png');
    winImg = loadImage('thumbUp.png');
    loseImg = loadImage('thumbDown.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    princess = createSprite(width / 11, height - 90, 20, 20);
    princess.addImage(princessImg);
    princess.scale = 0.5;
    //princess.debug = true

    win = createSprite(width / 2, height - 400, 20, 20); 
    win.addImage(winImg);
    win.scale = 1;
    win.visible = false

    lose = createSprite(width / 2, height - 400, 20, 20); 
    lose.addImage(loseImg);
    lose.scale = 1;
    lose.visible = false

    gBananaG = new Group()
    bBananaG = new Group()
}

function draw() {
    background(backgroundImg);

    if(keyIsDown(LEFT_ARROW)){
        princess.position.x -= 50
    }

    if(keyIsDown(RIGHT_ARROW)){
        princess.position.x += 50
    }

    if(princess.isTouching(gBananaG)){
        score += 1;
        gBananaG.destroyEach();
    } 

    if(princess.isTouching(bBananaG)){
        bscore += 1;
        bBananaG.destroyEach();
    }
    
    if(score==10){
        win.visible = true;
        gBananaG.setVelocityEach(0);
        bBananaG.setVelocityEach(0);
        gBananaG.destroyEach();
        bBananaG.destroyEach();

    }

    if(bscore==3){
        lose.visible = true;
        gBananaG.setVelocityEach(0);
        bBananaG.setVelocityEach(0);
        gBananaG.destroyEach();
        bBananaG.destroyEach();
    }

    goodBanana();
    badBanana();

    princess.setCollider("rectangle", 0, 0, 170, 100);
    gBananaG.setColliderEach("rectangle", 0, 0, 50, 50);
    bBananaG.setColliderEach("rectangle", 0, 0, 250, 250);

    drawSprites();

    textSize(45);
    fill("yellow");
    text("good bananas: " + score, 30, 50);

    textSize(45);
    fill("red");
    text("bad bananas: " + bscore, 1100, 50);
}

function goodBanana(){

    if(World.frameCount % 70 == 0){
        gBanana = createSprite(Math.round(random(50, width-50), 40, 10, 10));
        gBanana.scale = 0.5;
        gBanana.addImage(gBananaImg);
        gBanana.velocity.y = 10;
        gBanana.lifetime = 400;
        gBananaG.add(gBanana);
        //gBanana.debug = true
    }
}

function badBanana(){
    if(World.frameCount % 70 == 0){
        bBanana = createSprite(Math.round(random(50, width-50), 40, 10, 10));
        bBanana.scale = 0.2;
        bBanana.addImage(bBananaImg);
        bBanana.velocity.y = 10;
        bBanana.lifetime = 400;
        bBananaG.add(bBanana);
        //bBanana.debug = true
    }
}
