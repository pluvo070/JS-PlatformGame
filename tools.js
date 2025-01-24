// 工具类

// 根据索引(从1开始,30一行)计算瓦片在瓦片素材表png里的坐标{x,y}
let levelHeight = []; // 记录每个关卡的宽高(像素)
let levelWidth = [];
let tileSize = 21;
let tilemargin = 2;
function getTilePosition(i) {
    let row = Math.floor((i - 1) / 30);  // 行号
    let col = (i - 1) % 30;              // 列号
    let xCoordinate = col * (tileSize + tilemargin) + 2;  // 横坐标
    let yCoordinate = row * (tileSize + tilemargin) + 2;  // 纵坐标
    return { x: xCoordinate, y: yCoordinate };
}

// 根据data数组中某个索引获得应该画在哪个画布的位置
function getDrawPosition(i, levelIndex) {
    let row = Math.floor(i / levelWidth[levelIndex]);  // 计算当前瓦片在地图中的行
    let col = i % levelWidth[levelIndex];  // 计算当前瓦片在地图中的列
    let xCoordinate = col * tileSize;  // 计算绘制到画布上的 x 坐标
    let yCoordinate = row * tileSize;  // 计算绘制到画布上的 y 坐标
    return { x: xCoordinate, y: yCoordinate };
}


