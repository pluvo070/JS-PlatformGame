// 工具类

let windowHeight = 400; // 记录窗口大小
let windowWidth = 500;


let levelHeight = []; // 记录每个关卡的宽高(几个瓦片)
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

// 文字透明度闪烁效果函数
let alphaValue = 0;  // 文字的透明度
let alphaSpeed = 5;  // 透明度变化的速度
let increasing = true; // 控制透明度是否增加
let holdTime = 30;  // 停留在最大透明度时的帧数
let holdCounter = 0;  // 计时器

function flashText(textContent, x, y, speed, r, g, b,
                     r1=255, g1=255, b1=255) {
    // rgb是文字颜色, r1g1b1是边框颜色, 默认白色
    if (increasing) {
        alphaValue += speed; // 透明度增加
        if (alphaValue >= 255) {
            alphaValue = 255; // 达到最大透明度
            increasing = false; // 改为减少透明度
            holdCounter = holdTime; // 开始计时停留
        }
    } else {
        if (holdCounter > 0) {
            holdCounter--; // 保持最大透明度一段时间
        } else {
            alphaValue -= speed; // 透明度减少
            if (alphaValue <= 0) {
                alphaValue = 0; // 达到最小透明度
                increasing = true; // 改为增加透明度
            }
        }
    }
    fill(r, g, b, alphaValue); // 设置带透明度的颜色
    stroke(r1, g1, b1, alphaValue);
    text(textContent, x, y); // 绘制文字
}