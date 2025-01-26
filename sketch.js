let gameState = "start"; // 当前游戏状态
let levels = [1, 2, 3, 4, 5];  // 关卡列表
let selectedLevel = 0;  // 选中的关卡索引, 从0开始

let keys = {}; // 空对象用于存储当前按键信息,控制人物持续移动
var messages = []; // 用于存储所有的提示消息(固定时间消失)

let firstGameStarted = true; // 游戏首次开始标志,用于显示游戏提示


function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(assets.font1);
  assets.bgm.setVolume(1);  // 设置音量
  assets.bgm.loop();  // 循环播放
}

function draw() {
  background(200);

  // 画面过渡效果
  if (transitioning) {
    imgAlpha += 5; // 让透明度逐渐增加
    textAlpha += 5;
    if (imgAlpha >= 255) {
      imgAlpha = 255;
      transitioning = false;
    }
    if (textAlpha >= 255) {
      textAlpha = 255; 
    }
  }

  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "levelSelect") {
    drawLevelSelectScreen();
  } else if (gameState === "playing") {
    drawGameScreen();
  } else if (gameState === "gameOver") {
    drawGameOverScreen();
  } 

  //测试

}

// 开始界面
function drawStartScreen() {
  background(100, 150, 200);
  tint(255, imgAlpha);// 改变图片的透明度
  image(assets.startPage,0,0,width*1.5,height);
  noTint();
  textAlign(CENTER, CENTER);
  textSize(32);
  strokeWeight(3);
  //text("Press ENTER to start", width/2, height/2);
  flashText("Press ENTER to start", width/2, height/2, 
              alphaSpeed, 255, 255, 255, 255,159,237);
}

// 关卡选择界面
function drawLevelSelectScreen() {
  background(137,172,206);
  tint(255, imgAlpha);// 改变图片的透明度
  //...这里插入关卡选择背景图片
  noTint();
  textAlign(CENTER, CENTER);
  textSize(28);
  fill(0,0,0,textAlpha);
  strokeWeight(3);
  stroke(255,255,255,textAlpha);
  text("Use LEFT/RIGHT to chose\nPress SPACE to begin", width/2, 100);

  for (let i = 0; i < levels.length; i++) {
    let size = 60;
    let x = width/2 - (levels.length*size)/2 + i*size; // 计算按钮位置
    let y = height/2;
    if (i === selectedLevel) {
      fill(255, 255, 0 ,textAlpha); // 选中时候的颜色
    } else {
      fill(200, 200, 200, textAlpha);
    }
    rect(x, y, size, size, 10); // 画按钮
    fill(0,0,0,textAlpha);
    textSize(26);
    strokeWeight(3);
    stroke(255,255,255,textAlpha);
    text(levels[i], x + size/2, y + size/2); // 画按钮上的文字
  }
}

// 游戏界面
function drawGameScreen() {
  tint(255, imgAlpha);// 改变图片的透明度
  image(assets.bg, 0, 0, windowWidth, windowHeight*5/4);
  noTint();
  // 死亡
  if (player[selectedLevel].hp === 0) {
    gameState = "gameOver";
  }

  // 绘制所有图层
  coll[selectedLevel].show();
  others[selectedLevel].show();
  for(let i =0; i<enemies[selectedLevel].length; i++){
    enemies[selectedLevel][i].show();
  }
  for(let i =0; i<traps1.length; i++){
    traps1[i].show();
  }
  for(let i =0; i<diamonds1.length; i++){
    diamonds1[i].show();
  }
  for(let i =0; i<boxes1.length; i++){
    boxes1[i].show();
  }
  flag[selectedLevel].show();
  player[selectedLevel].update();
  player[selectedLevel].show();
  

  // 首次开始游戏显示操作提示
  if(firstGameStarted){
    //textAlign(CENTER, CENTER); 
    textSize(20);
    let message1 = "Press LEFT/RIGHT ARROW to move\nPress SPACE to jump";
    messages.push(new Message(message1,width/2,4*height/5,3000,20,200,200,255,159,237));
    firstGameStarted = false;
  }
  // 显示所有提示消息
  for (let i = 0; i < messages.length; i++) {
    messages[i].show();
  }
  // 删除已过期的第一条消息
  if (messages.length > 0 && messages[0].isExpired()) {
    messages.shift();
  }
  rectMode(CORNER);

  // 页面常驻消息
  fill(255,159,237,textAlpha);
  textSize(15);
  strokeWeight(2);
  stroke(255,255,255,textAlpha);
  textAlign(LEFT,TOP);
  text(`Level: ${selectedLevel}`, 30, 30);
  text(`HP: ${player[selectedLevel].hp}`, 30, 60);
  text(`Diamonds: ${player[selectedLevel].diamondNum} / ${diamonds1.length}`, 30, 90);
}




// 死亡界面
function drawGameOverScreen() {
  background(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255,255,255,textAlpha);
  strokeWeight(2);
  stroke(0,0,0,textAlpha);
  text("GameOver! Press R to restart", width / 2, height / 2);
}

// 监听键盘输入来切换场景
function keyPressed() {
  if (gameState === "start" && keyCode === ENTER) {
    gameState = "levelSelect";
    transition();
  } else if (gameState === "levelSelect") {
    if (keyCode === LEFT_ARROW) {
      selectedLevel = max(0, selectedLevel - 1);
    } else if (keyCode === RIGHT_ARROW) {
      selectedLevel = min(levels.length - 1, selectedLevel + 1);
    } else if (keyCode === 32) {  // 空格键进入关卡
      gameState = "playing";
      transition();
    }
  } else if (gameState === "gameOver" && key === 'r') {
    gameState = "start";
    transition();
  }
  else if(gameState ==="playing"){
    keys[key] = true;//控制人物移动和交互
    console.log(key + " " + keyCode);//测试
  }
}

// 松开键盘后停止人物移动
function keyReleased() {
  keys[key] = false; 
}

