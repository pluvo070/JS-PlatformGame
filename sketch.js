let gameState = "start"; // 当前游戏状态
let levels = [1, 2, 3, 4, 5];  // 关卡列表
let selectedLevel = 0;  // 选中的关卡索引

let keys = {}; // 空对象用于存储当前按键信息,控制人物持续移动
var messages = []; // 用于存储所有的提示消息(固定时间消失)


function setup() {
  createCanvas(600, 400);
  textFont(assets.font1);
}

function draw() {
  background(200);
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
  
  coll1.show();
  player1.update();
  player1.show();

}

// 开始界面
function drawStartScreen() {
  background(100, 150, 200);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  text("Press ENTER to start", width/2, height/2);
}

// 关卡选择界面
function drawLevelSelectScreen() {
  background(180, 120, 100);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  text("Use ← → to chose, Press SPACE to begin", width/2, 100);

  for (let i = 0; i < levels.length; i++) {
    let size = 60;
    let x = width/2 - (levels.length*size)/2 + i*size; // 计算按钮位置
    let y = height/2;
    
    if (i === selectedLevel) {
      fill(255, 255, 0); // 选中时候的颜色
    } else {
      fill(200);
    }
    
    rect(x, y, size, size, 10); // 画按钮
    fill(0);
    textSize(26);
    text(levels[i], x + size/2, y + size/2); // 画按钮上的文字
  }
}

// 游戏界面
function drawGameScreen() {
  background(0, 0, 0);
  fill(255);
  textSize(32);
  text(`Level: ${selectedLevel}`, width/2, height/2);

  // 模拟死亡情况
  if (frameCount % 600 === 0) { // 几秒后进入死亡界面
    gameState = "gameOver";
  }
}

// 死亡界面
function drawGameOverScreen() {
  background(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  text("GameOver! Press R to restart", width / 2, height / 2);
}

// 监听键盘输入来切换场景
function keyPressed() {
  if (gameState === "start" && keyCode === ENTER) {
    gameState = "levelSelect";
  } else if (gameState === "levelSelect") {
    if (keyCode === LEFT_ARROW) {
      selectedLevel = max(0, selectedLevel - 1);
    } else if (keyCode === RIGHT_ARROW) {
      selectedLevel = min(levels.length - 1, selectedLevel + 1);
    } else if (keyCode === 32) {  // 空格键进入关卡
      gameState = "playing";
    }
  } else if (gameState === "gameOver" && key === 'r') {
    gameState = "start";
  }
  else if(gameState ==="playing"){
    keys[key] = true;//控制人物移动和交互
  }
}


// 松开键盘后停止人物移动
function keyReleased() {
  keys[key] = false; 
}