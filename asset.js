let assets = {};

function preload() {
  assets.font1 = loadFont("assets//David Sans Condensed.ttf");
  assets.icon = loadImage("assets/spritesheet.png");
  assets.bg = loadImage("assets/backgrounds.png");
  assets.startPage = loadImage('assets/sample.png');


  assets.bgm = loadSound("assets/bgm.ogg");
  assets.jumpSound = loadSound("assets/slime_jump.mp3");// 跳跃音效
  assets.deathSound = loadSound("assets/death.wav");// 死亡音效
  assets.levelClearSound = loadSound("assets/round_end.wav");// 通关音效


}

