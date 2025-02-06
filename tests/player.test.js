// 使用到的类需要导包
const { Player } = require('../classes/player.js');
const { OneEnemy } = require('../classes/oneEnemy.js');

test("Player loses 1 HP when colliding with enemy", () => {
    //let tileSize = 1;
    let player = new Player(100, 100, 0, 5, 0, 0);
    let enemies = [];
    enemies[0] = [];
    enemies[0].push(new OneEnemy(100, 100, 0, 1, 1, 0, 0));
    let initialHp = player.hp;
    player.beAttacked(); // 遍历敌人数组, 确认是否有敌人在附近
    expect(player.hp).toBe(initialHp - 1);
});