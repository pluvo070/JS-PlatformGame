// 设置所有要用到的全局变量
global.tileSize = 10;
global.tilemargin = 0;
global.windowHeight = 100; 
global.windowWidth = 100;

global.levelHeight = []; 
global.levelWidth = [];

global.offsetX = 0;  // 水平偏移
global.offsetY = 0;  // 垂直偏移


global.frameInterval = 18; 

global.keys = {};
global.messages = [];

global.coll = []; 
global.others = [];
global.water = [];

global.player = []; 

global.flag = []; 
global.enemies = [];
global.traps = []; 
global.diamonds = [];
global.boxes = [];

global.selectedLevel = 0;

// 模拟 p5.js 的 loadSound 方法
global.loadSound = jest.fn((path) => ({
    play: jest.fn(), // 模拟 play 方法
    stop: jest.fn(), // 可选: 模拟 stop 方法
    loop: jest.fn(), // 可选: 模拟 loop 方法
}));

// 初始化 assets
global.assets = {
    font1: {}, 
    icon: {},
    bg: {},
    startPage: {},
    
    bgm: global.loadSound("assets/bgm.ogg"),
    jumpSound: global.loadSound("assets/slime_jump.mp3"),
    deathSound: global.loadSound("assets/death.wav"),
    levelClearSound: global.loadSound("assets/round_end.wav"),
    getDiamondSound: global.loadSound("assets/powerUp9.mp3"),
    beAttacked: global.loadSound("assets/damage.wav"),
    clicked: global.loadSound("assets/completetask_0.mp3"),
};
