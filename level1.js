let Level1Data = {};  // 用于存储解析后的JSON数据,它是一个对象


let player = []; // 玩家类的对象,用于存储json中获得的数据
player[0] = 0;

let coll1;
let others1;

// 获取敌人对象
let enemies1 = []; 

// 解析 JSON 地图
function ParseJSON(jsonData) {
    Level1Data = jsonData;  // 将解析后的 JSON 赋值给 gameData
    console.log("JSON 解析后:", Level1Data);
    levelHeight[1] = 30;
    levelWidth[1] = 100; 
    /* 这些是对json文件数据的操作, 必须放在这个函数里, 因为若放在外面就是异步操作
       不能保证json文件已经解析完成, 会报错undifined  */
    getPlayers();
    getColl();
    getOthers();
    getEnemies();
}

// 使用 $.getJSON 加载 JSON 并赋值给 gameData
$.getJSON('assets/test03.json', ParseJSON);

// 获取玩家数据并存储到玩家类的对象
function getPlayers(){
    let playerLayer = Level1Data.layers.find(layer => layer.name === "player");
    //console.log(playerLayer); //
    // 从玩家对象层获取玩家对象
    let playerObject = playerLayer.objects.find(player => player.name === "player1");
    console.log("玩家对象:",playerObject); //
    // 获取玩家对象的自定义属性:  speed 和 HP
    let speed = playerObject.properties.find(properties => properties.name === "speed").value;
    let hp = playerObject.properties.find(properties => properties.name === "hp").value;
    //console.log(player1Speed); //2
    //console.log(player1HP); //5
    // 获取玩家对象的瓦片索引
    tileindex = playerObject.gid; //80
    // console.log(player1img); 
    let x = playerObject.x;
    let y = playerObject.y - tileSize;//直接获得是左下角?
    player[1] = new Player(x, y, speed, hp, tileindex, 1);
}

// 获取碰撞层数据
function getColl(){
    let collisionLayer = Level1Data.layers.find(layer => layer.name === "coll");
    console.log("碰撞层:", collisionLayer);
    coll1 = new Coll(collisionLayer.data, 1);
}

// 获取碰撞层others数据(不设计碰撞当做背景)
function getOthers(){
    let othersLayer = Level1Data.layers.find(layer => layer.name === "others");
    console.log("others层:", othersLayer);
    others1 = new Others(othersLayer.data, 1);
}

// 获取敌人层数据
function getEnemies(){
    let enemiesLayer = Level1Data.layers.find(layer => layer.name === "enemies");
    console.log("敌人层:", enemiesLayer);
    // 获取每个敌人,创建为单个敌人类的对象,存储到数组enemies1里
    for(let i = 0; i < enemiesLayer.objects.length; i++){
        //console.log("敌人层对象数量:", enemiesLayer.objects.length);
        //console.log("enemiesLayer.objects[i]:", enemiesLayer.objects[i]);
        //console.log("enemiesLayer.objects[i].x:", enemiesLayer.objects[i].x);
        let x = enemiesLayer.objects[i].x;
        let y = enemiesLayer.objects[i].y - tileSize;
        let imgIndex = enemiesLayer.objects[i].gid;
        let speed = enemiesLayer.objects[i].properties.speed;
        let hp = enemiesLayer.objects[i].properties.hp;
        enemies1[i] = new OneEnemy(x,y,speed,hp,imgIndex,1);
    }
}




