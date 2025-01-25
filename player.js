class Player {

    // 构造函数
    constructor(x, y, speed, hp, imgIndex) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.maxhp = hp; // 最大血量
        this.hp = hp; // 当前血量, 初始值为最大血量
        this.imgIndex = imgIndex; // 图标起始坐标
        this.isJumping = false;  // 用于判断是否在跳跃中
        this.jumpHeight = 0;     // 跳跃的高度
        this.gravity = 1;        // 重力
        this.jumpSpeed = -15;    // 初始跳跃速度
    }

    // 移动 + 限制玩家的位置
    update() {
        if (keys['ArrowLeft']) this.x -= this.speed;
        if (keys['ArrowRight']) this.x += this.speed;

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
        // 将玩家坐标限制在画面以内
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);

    }
  
    // 加载玩家图片到界面
    show() {
        //text("You", this.x + 5, this.y - 10);
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
        this.x, this.y,   // 在画布上绘制的左上角坐标
        tileSize, tileSize,     // 在画布上绘制的宽度和高度
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

}
  