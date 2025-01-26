


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

        this.velocityY = 0; // 垂直速度
        this.gravity = 0.5; // 重力
        this.jumpStrength = -10; // 跳跃初速度
        this.onGround = false; // 是否在地面上

        this.diamondNum = 0;
    }

    // 移动 + 限制玩家的位置
    update() {
        let newX = this.x;
        let newY = this.y;
        if (keys['ArrowLeft']) newX -= this.speed;
        if (keys['ArrowRight']) newX += this.speed;
        
        // 跳跃（仅当在地面上时才能跳）
        if (keys[" "] && this.onGround) {
            this.velocityY = this.jumpStrength; // 赋予向上的初速度
            this.onGround = false; // 进入空中
            assets.jumpSound.play();
        }

        // 施加重力
        this.velocityY += this.gravity; // 施加向下的重力加速度
        newY += this.velocityY;

        // 计算偏移量：让玩家始终保持在屏幕中心
        offsetX = this.x - windowWidth / 2;
        offsetY = this.y - windowHeight / 2;

        // 检查玩家四条边界是否碰撞
        let left   = this.isColliding(newX, newY );  // 左上角（稍往下，避免浮空检测）
        let right  = this.isColliding(newX + tileSize, newY );  // 右上角
        let top    = this.isColliding(newX , newY);  // 上方（稍往右）
        let bottom = this.isColliding(newX , newY + tileSize);  // 下方

        // 只允许安全方向移动
        // 处理水平碰撞
        if (!left && !right) { 
            this.x = newX;
        }
        // 处理垂直碰撞
        if (!top && !bottom) {
            this.y = newY;
            this.onGround = false; // 空中状态
        } else {
            if (this.velocityY > 0) { // 只有下落时才会停在地面上
                this.onGround = true;
            }
            this.velocityY = 0; // 停止竖直速度
        }

        this.getDiamond();
   }

  
    // 加载玩家图片到界面
    show() {
        //text(`${this.x},${this.y}`,this.x-offsetX,this.y-offsetY);
        let coordinate = getTilePosition(this.imgIndex);
        // 绘制玩家图像到画面上
        image(
            assets.icon,  // 源图像
            this.x-offsetX, this.y-offsetY,   // 在画布上绘制的左上角坐标
            tileSize, tileSize,     // 在画布上绘制的宽度和高度
            coordinate.x, coordinate.y,  // 在png里的横坐标和纵坐标
            tileSize, tileSize      // 在png中要裁剪的宽度和高度
        );
    }

    // 计算给定坐标是否在碰撞层
    isColliding(x, y) {
        let col = Math.floor(x / tileSize);
        let row = Math.floor(y / tileSize);
        let tileIndex = row * levelWidth[this.levelIndex] + col;

        // 碰撞检测：如果这个格子是墙体（非 0），返回 true
        return coll[this.levelIndex].data[tileIndex] !== 0;
    }


    // 计算是否碰到钻石
    getDiamond(){
        // 此处以level1的钻石为例,后续还需要更改
        for(let i = 0; i < diamonds1.length; i++){
            if(diamonds1[i].visible && diamonds1[i].isNear(this.x,this.y)){
                diamonds1[i].visible = false;
                this.diamondNum ++;
                console.log("人物钻石数量:", this.diamondNum);
            }
        }
    }


}
  