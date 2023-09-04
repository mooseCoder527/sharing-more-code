var fox, foxRunning,foxJumping,foxBase
var enemy, enemyimg
var arrow,arrowImg
var bgimg,bg
var ground,groundImg1,groundImg2,groundImg3,groundImg4,groundGroup
var scrollX
function preload(){
  bgimg = loadImage('assets/bg.jpg')
  foxBase = loadAnimation('assets/fox-base.png')
  foxJumping = loadAnimation('assets/fox-jumping-1.png','assets/fox-jumping-2.png','assets/fox-jumping-3.png',
                              'assets/fox-jumping-4.png','assets/fox-jumping-5.png')
  foxRunning = loadAnimation('assets/fox-running-1.png','assets/fox-running-2.png','assets/fox-running-3.png')
  enemyimg = loadImage('assets/evil man.png')
  arrowImg = loadImage('assets/arrow.png') 
  groundImg1 = loadImage('assets/ground-1.png') 
  groundImg2 = loadImage('assets/ground-2.png') 
  groundImg3 = loadImage('assets/ground-3.png') 
  groundImg4 = loadImage('assets/ground-1.png') 
}

function setup(){
  createCanvas(1270,580)
  


  bg = createSprite(width/2,height/2)
  bg.addImage(bgimg)
  bg.scale = 2.6

  fox = createSprite(400,320)
  fox.addAnimation('base', foxBase)
  fox.addAnimation('running',foxRunning)
  fox.addAnimation('jumping',foxJumping)
  fox.scale = 2.5
  
  scrollX = fox.x
  
  fox.setCollider('rectangle',0,0,10,10)

  enemy = createSprite(620,400)
  enemy.addImage(enemyimg)
  enemy.scale = 0.3

  groundGroup = new Group()
  ground = createSprite(470, 370)
  ground.addImage(groundImg1)
  ground.scale = 6.5
  groundGroup.add(ground)
  ground.setCollider('rectangle',-6,9,10,4)
  ground.velocityX = 1

  

}

function draw(){
  createGround()
  background('green')
  foxMovement()
  if(bg.x < 400){
    bg.x = width/2 
  }
  var edges = createEdgeSprites()
  
  if(fox.collide(edges[3])){
    gameOver()
  }
  drawSprites()
}



function createGround(){
  if(frameCount%60 == 0){
    ground = createSprite(camera.position.x-200, 280)
    ground.y = Math.round(random(350,500))
    ground.scale = 6.5
    ground.x = scrollX
    groundGroup.add(ground)
   // ground.velocityX = 2
  
    ground.setCollider('rectangle',-6,9,10,4)
    var randomImg = Math.round(random(1,4))
    switch(randomImg){
      case 1: ground.addImage(groundImg1);
      break
      case 2: ground.addImage(groundImg2);
      break
      case 3: ground.addImage(groundImg3);
      break
      case 4: ground.addImage(groundImg4);
      break
      default:break
    }
  }
}

  function gameOver(){
  
    swal({
      title:`Game Over`,
      text:`now the magical forest is going to be destroyed unless you reload the page!`,
      confirmButtonText:'ok'
    })
  }

  


  function foxMovement(){
    if(keyDown('up')&& fox.collide(groundGroup)){
      fox.velocityY = -6
      fox.changeAnimation('jumping')
    }
    if(keyWentUp('up')){
      fox.changeAnimation('base')
    }
    fox.velocityY= fox.velocityY +0.4
    fox.collide(groundGroup)
    fox.x = camera.position.x-200
    if(keyWentDown('right')){
      fox.x = fox.x + 50
      scrollX = fox.x - 50
      fox.changeAnimation('running')
      
      bg.velocityX = -3
    }
    if(keyWentUp('right')){
      fox.changeAnimation('base')
    }
  }
