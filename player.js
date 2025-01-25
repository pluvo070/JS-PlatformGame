


class Player {

    // 构造函数
    constructor(x, y, speed, hp, imgIndex, levelIndex) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.maxhp = hp; // 最大血量
        this.hp = hp; // 当前血量, 初始值为最大血量
        this.levelIndex = levelIndex;
        this.imgIndex = imgIndex; // 图标起始坐标
        this.isJumping = false;  // 用于判断是否在跳跃中
        this.jumpHeight = 0;     // 跳跃的高度
        this.gravity = 1;        // 重力
        this.jumpSpeed = -15;    // 初始跳跃速度
    }

    // 移动 + 限制玩家的位置
    update() {/*
        if (keys['ArrowLeft']) this.x -= this.speed;
        if (keys['ArrowRight']) this.x += this.speed;
*/
        let newX = this.x;
        let newY = this.y;
        if (keys['ArrowLeft']) newX -= this.speed;
        if (keys['ArrowRight']) newX += this.speed;
        /*if (keys['ArrowUP']) newY -= this.speed;
        if (keys['ArrowDown']) newY += this.speed;*/

        /*
        // 按空格键触发跳跃
        if (keys[' '] && !this.isJumping) {
            this.isJumping = true;
            this.jumpHeight = this.jumpSpeed;
        }
        // 如果正在跳跃，更新跳跃高度
        if (this.isJumping) {
            this.y += this.jumpHeight;
            this.jumpHeight += this.gravity; // 模拟重力效果
            // 当玩家接触到地面时，停止跳跃
            if (this.y >= height - tileSize) {
                this.y = height - tileSize;  // 玩家不能超过地面
                this.isJumping = false;  // 停止跳跃
            }
        }
*/        
        // 计算偏移量：让玩家始终保持在屏幕中心
        offsetX = this.x - windowWidth / 2;
        offsetY = this.y - windowHeight / 2;

        // 检查玩家四条边界是否碰撞
        let left   = this.isColliding(newX, newY + 5);  // 左上角（稍往下，避免浮空检测）
        let right  = this.isColliding(newX + tileSize * scaleFactor, newY + 5);  // 右上角
        let top    = this.isColliding(newX + 5, newY);  // 上方（稍往右）
        let bottom = this.isColliding(newX + 5, newY + tileSize * scaleFactor);  // 下方

        // 只允许安全方向移动
        if (!left && !right) {
            this.x = newX;
        }
        if (!top && !bottom) {
            this.y = newY;
        }
   }

    
  
    // 加载玩家图片到界面
    show() {
        //text(`${this.x},${this.y}`,this.x-offsetX,this.y-offsetY);
        let coordinate = getTilePosition(this.imgIndex);
        // 绘制玩家图像到画面上
        /*image(
            assets.icon,  // 源图像
            this.x, this.y,   // 在画布上绘制的左上角坐标
            tileSize, tileSize,     // 在画布上绘制的宽度和高度
            (this.imgIndex - 1) % 30 * (tileSize + tilemargin) + 2,  // 在png里的横坐标和纵坐标
            Math.floor((this.imgIndex - 1) / 30) * (tileSize + tilemargin) + 2, 
            tileSize, tileSize      // 在png中要裁剪的宽度和高度
          );*/
        
        image(
        assets.icon,  // 源图像
        this.x-offsetX, this.y-offsetY,   // 在画布上绘制的左上角坐标
        tileSize*scaleFactor, tileSize*scaleFactor,     // 在画布上绘制的宽度和高度
        coordinate.x, coordinate.y,  // 在png里的横坐标和纵坐标
        tileSize, tileSize      // 在png中要裁剪的宽度和高度
        );
    }

/*
    // 检测碰撞层并停止跳跃
    checkCollision(collLayer) {
        // 获取玩家的碰撞区域（假设为一个矩形区域）
        let playerLeft = this.x;
        let playerRight = this.x + tileSize;
        let playerTop = this.y;
        let playerBottom = this.y + tileSize;

        // 检查玩家当前跳跃区域是否与碰撞层的某个图块重叠
        for (let i = 0; i < collLayer.data.length; i++) {
            let tileId = collLayer.data[i];
            if (tileId !== 0) {  // 如果这个位置有障碍物
                let coord = getDrawPosition(i, levelIndex); // 获取瓦片在画布上的坐标
                let tileLeft = coord.x;
                let tileRight = coord.x + tileSize;
                let tileTop = coord.y;
                let tileBottom = coord.y + tileSize;

                // 检查玩家是否与这个图块重叠
                if (
                    playerRight > tileLeft && playerLeft < tileRight &&
                    playerBottom > tileTop && playerTop < tileBottom
                ) {
                    this.isJumping = false;  // 如果有碰撞，停止跳跃
                    this.y = tileTop - tileSize;  // 停在碰撞图块的上方
                    break;
                }
            }
        }
    }

*/


    // 计算给定坐标是否在碰撞层
    isColliding(x, y) {
        let col = Math.floor(x / (tileSize * scaleFactor));
        let row = Math.floor(y / (tileSize * scaleFactor));
        let tileIndex = row * levelWidth[this.levelIndex] + col;

        // 碰撞检测：如果这个格子是墙体（非 0），返回 true
        return coll1.data[tileIndex] !== 0;
    }

}
  