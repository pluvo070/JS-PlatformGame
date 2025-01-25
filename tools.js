// 工具类


let levelHeight = []; // 记录每个关卡的宽高(像素)
let levelWidth = [];
let tileSize = 21;
let tilemargin = 2;

let offsetX = 0;  // 水平偏移
let offsetY = 0;  // 垂直偏移
let cameraSpeed = 5; // 镜头的移动速度，控制视窗跟随的灵敏度

let scaleFactor = 1.5; // 等比放大因子


// 根据索引(从1开始,30一行)计算瓦片在瓦片素材表png里的坐标{x,y}
function getTilePosition(i) {
    let row = Math.floor((i - 1) / 30);  // 行号
    let col = (i - 1) % 30;              // 列号
    let xCoordinate = col * (tileSize + tilemargin) + 2;  // 横坐标
    let yCoordinate = row * (tileSize + tilemargin) + 2;  // 纵坐标
    return { x: xCoordinate, y: yCoordinate };
}

// 根据data数组中某个索引获得应该画在画布的哪个位置
function getDrawPosition(i, levelIndex) {
    let row = Math.floor(i / levelWidth[levelIndex]);  // 计算当前瓦片在地图中的行
    let col = i % levelWidth[levelIndex];  // 计算当前瓦片在地图中的列
    let xCoordinate = col * tileSize*scaleFactor;  // 计算绘制到画布上的 x 坐标
    let yCoordinate = row * tileSize*scaleFactor;  // 计算绘制到画布上的 y 坐标
    return { x: xCoordinate, y: yCoordinate };
}


