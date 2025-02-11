// 使用到的类需要导包
const { Player } = require('../classes/player.js');
const { OneEnemy } = require('../classes/oneEnemy.js');

// 测试函数
test("Player loses 1 HP when colliding with enemy", () => {
    //let tileSize = 1; //注意不可以在这里进行全局变量的设定, 必须在jest.setup.js文件中
    expect(tileSize).toBe(10);
    expect(selectedLevel).toBe(0);
    // 新建玩家
    let player = new Player(10, 10, 0, 5, 0, 0);
    expect(player.x).toBe(10);
    expect(player.levelIndex).toBe(0);
    expect(player.invincible).toBe(false);
    // 新建敌人
    enemies[0] = []; // 初始化当前关卡的敌人列表
    let enemy1 = new OneEnemy(10, 10, 0, 1, 0, 0, 0);
    expect(enemy1.levelIndex).toBe(0);
    enemies[0].push(enemy1); 
    expect(enemies.length).toBe(1); // 总共有1个关卡
    expect(enemies[0].length).toBe(1); // 当前关卡敌人数量1
    expect(enemies[0][0].x).toBe(10); // 当前关卡第一个敌人的坐标10
    expect(enemies[0][0].visible).toBe(true);
    // 测试玩家与敌人交互
    player.beAttacked(); // 遍历敌人数组, 确认是否有敌人在附近
    //player.update();
    expect(enemies[0][0].isNear(10,10)).toBe(true);
    expect(enemies[0][0].isNear(player.x,player.y)).toBe(true);
    expect(player.invincible).toBe(true);
    expect(player.hp).toBe(4);
});