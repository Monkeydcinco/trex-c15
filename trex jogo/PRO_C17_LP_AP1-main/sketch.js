var trex,trexCorrendo,trexCollide
var solo,soloImg
var soloInvisivel
var nuvem,nuvemImg
var cacto,cactoImg1,cactoImg2,cactoImg3,cactoImg4,cactoImg5,cactoImg6
var score=0
var play= 1
var end=0
var gameState=play
var nuvemGp,cactoGp
var gamerOver,gamerOverImg
var reset,resetImg
//preload carrega as midías do jogo 
function preload(){
trexCorrendo=loadAnimation("trex1.png","trex3.png","trex4.png")
  soloImg=loadImage("ground2.png")
  nuvemImg=loadImage("cloud.png")
  cactoImg1=loadImage("obstacle1.png")
  cactoImg2=loadImage("obstacle2.png")
  cactoImg3=loadImage("obstacle3.png")
  cactoImg4=loadImage("obstacle4.png")
  cactoImg5=loadImage("obstacle5.png")
  cactoImg6=loadImage("obstacle6.png")
  trexCollide=loadAnimation("trex_collided.png")
  gameOverImg=loadImage("gameOver.png")
  resetImg=loadImage("restart.png")
}
//setup faz a aconfiguração
function setup(){
  createCanvas(600,200);
  // criando as bordas
  trex=createSprite(50,160,20,50)
  trex.addAnimation("correndo",trexCorrendo)
  trex.addAnimation("collide",trexCollide)
  trex.scale=0.5
  trex.debug=true
  trex.setCollider("rectangle",0,0,50,50,60)
  //trex.setCollider("circle",0,0,30)
  solo=createSprite(300,180,600,2)
  solo.addImage("solo",soloImg)

  soloInvisivel=createSprite(300,190,600,2)
  soloInvisivel.visible=false   
 gameOver=createSprite(300,80,100,10)
 gameOver.addImage(gameOverImg)
 gameOver.scale=0.5

 reset=createSprite(300,120,100,10)
 reset.addImage(resetImg)
 reset.scale=0.5

 //gameOver.visible=false
// reset.visible=false
  nuvemGp=new Group()
  cactoGp=new Group()
}
//draw faz o movimento, a ação do jogo
function draw(){
  background("#f0f9f7");
  
  if (trex.isTouching(cactoGp )) {
    gameState=end
  }

  if (gameState==play){
    score=Math.round(frameCount/5)
    if (keyDown("space")&&trex.y>170){
      trex.velocityY=-12
    }
    solo.velocityX=-12
    if (solo.x <0) {
      solo.x=solo.width/2
    }
    cactos()
    nuvens()

  }
 
  if (gameState==end){
    trex.changeAnimation("collide",trexCollide)
    solo.velocityX=0
    nuvemGp.setVelocityXEach(0)
    cactoGp.setVelocityXEach(0)
    nuvemGp.setLifetimeEach(-1)
    cactoGp.setLifetimeEach(-1)
    //gameOver.visible=true
    //reset.visible=true
  }
 

 
 
 trex.collide(soloInvisivel)
 gravidade()

fill("black")
textSize(18)
textAlign(CENTER,TOP)

text("score: "+score,526,20)
   //coordenadas do mouse na tela
  text("X: "+mouseX+"/ Y: "+mouseY,mouseX,mouseY);
  drawSprites();

}
function gravidade () {
  trex.velocityY=trex.velocityY+0.5
}
function nuvens() {
  if(frameCount%60==0){
    nuvem=createSprite(600,random(14,100),40,10)
    nuvem.velocityX=-3
    nuvem.addImage(nuvemImg)
    nuvem.scale=random(0.5,1.4 )
    nuvem.depth=trex.depth-1
    nuvem.lifetime=210
    nuvemGp.add(nuvem)
  }
 

} 
function cactos() {
  if(frameCount%100==0){
  cacto=createSprite(600,170,10,50)
  cacto.velocityX=-3
    cacto.lifetime=210
  cacto.scale=0.5
  cactoGp.add(cacto)
  var sorteio=Math.round(random(1,6))
  switch (sorteio) {
    case 1:cacto.addImage(cactoImg1)
      break;
  
      case 2:cacto.addImage(cactoImg2)
      break; 

      case 3:cacto.addImage(cactoImg3)
      break;
    
      case 4:cacto.addImage(cactoImg4)
      break;
    
      case 5:cacto.addImage(cactoImg5)
      break;

      case 6:cacto.addImage(cactoImg6)
      break;
  }
  }
}