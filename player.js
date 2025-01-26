


class Player {

    // 构造函数
    constructor(x, y, speed, hp, imgIndex, levelIndex) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.maxhp = hp; // 最大血量
        this.hp = hp; // 当前血量, 初始值为最大血量
        this.levelIndex = levelIndex;
        this.imgIndex = imgIndex + 9; // 图标起始坐标
            /* 帧动画这里以第一关为例, 选择索引是89/90切换
               由于tiled里面设置的是80, 因此这里+9 */
        this.diamondNum = 0;

        this.velocityY = 0; // 垂直速度
        this.gravity = 0.5; // 重力
        this.jumpStrength = -10; // 跳跃初速度
        this.onGround = false; // 是否在地面上

        this.frameCounter = 0; // 控制走路帧切换
        this.facingRight = true; // 记录人物方向
    }

    // 移动 + 限制玩家的位置
    update() {
        let newX = this.x;
        let newY = this.y;
        let moving = false; // 标记是否在移动

        if (keys['ArrowLeft']) {
            newX -= this.speed;
            this.facingRight = false;
            moving = true;
        }
        if (keys['ArrowRight']) {
            newX += this.speed;
            this.facingRight = true;
            moving = true;
        }

        // 控制帧动画
        if (moving) { // 角色移动帧动画交替
            this.frameCounter++; // 计数器,每次update+1
            if (this.frameCounter % 10 === 0) { // 每10帧切换一次帧动画
                //是89则换为90, 是90则换为89
                this.imgIndex = (this.imgIndex === 89) ? 90 : 89;
            }
        } else { // 角色静止, 帧动画停止
            this.imgIndex = 89; // 角色停下时帧动画停在第一个帧89
        }


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

        //保存当前的坐标系设定
        push();
        // 将坐标系原点平移到玩家上边缘的中心, 使用这个点来绘制玩家图形
        // 这样水平翻转时仍然基于这个点左右对称, 不用在image函数中拆分计算图形左上角坐标
        translate(this.x-offsetX+tileSize/2, this.y-offsetY);
        // 水平翻转, 如果facingRight则不变, 否则反转
        let tmp = this.facingRight ? 1 : -1; // 水平缩放因子-1表示水平翻转
        scale(tmp, 1); 

        // 绘制玩家图像到画面上
        image(
            assets.icon,  // 源图像
            -tileSize/2, 0,   // 在画布上绘制的左上角坐标
            tileSize, tileSize,     // 在画布上绘制的宽度和高度
            coordinate.x, coordinate.y,  // 在png里的横坐标和纵坐标
            tileSize, tileSize      // 在png中要裁剪的宽度和高度
        );
        pop();//恢复之前的坐标系设定
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

        for(let i = 0; i < diamonds[selectedLevel].length; i++){
            if(diamonds[selectedLevel][i].visible && diamonds[selectedLevel][i].isNear(this.x,this.y)){
                diamonds[selectedLevel][i].visible = false;
                this.diamondNum ++;
                console.log("人物钻石数量:", this.diamondNum);
            }
        }
    }


}
  