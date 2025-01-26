// 单个敌人

class OneEnemy{

    // 构造函数
    constructor(x, y, speed, hp, imgIndex, levelIndex) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.maxhp = hp; // 最大血量
        this.hp = hp; // 当前血量, 初始值为最大血量
        this.levelIndex = levelIndex;
        this.imgIndex = imgIndex; // 图标起始坐标
        this.visible = true;// 被玩家打败后改为false

        this.frameCounter = 0; // 计数器
        this.frameIndex = 0; // 当前动画帧索引, 从0开始循环播放
        this.animationFrames = [imgIndex, imgIndex+1]; // 两个帧
    }

    beAttacked(){
        this.hp --;
        if(hp === 0){
            this.visible = false;
        }
    }

    show() {
        if(this.visible){
            this.frameCounter++;
            if (this.frameCounter % frameInterval === 0) { 
                this.frameIndex = (this.frameIndex + 1) % this.animationFrames.length;
                this.imgIndex = this.animationFrames[this.frameIndex];
            }

            //text(`${this.x},${this.y}`,this.x-offsetX,this.y-offsetY);
            let coordinate = getTilePosition(this.imgIndex);
            let offsetX = (player[this.levelIndex].x - windowWidth / 2);
            let offsetY = (player[this.levelIndex].y - windowHeight / 2);
            image(
                assets.icon,  // 源图像
                this.x-offsetX, this.y-offsetY,   // 在画布上绘制的左上角坐标
                tileSize, tileSize,     // 在画布上绘制的宽度和高度
                coordinate.x, coordinate.y,  // 在png里的横坐标和纵坐标
                tileSize, tileSize      // 在png中要裁剪的宽度和高度
            );
        }
    }

    // 检查给定的点是否在附近(附近才可以交互)
    isNear(px, py) {
        let d = 5; // 四边的d范围内
        if (px >= (this.x - d) && px <= (this.x + tileSize + d )
            && py >= (this.y - d) && py <= (this.y + tileSize + d) ) {
            return true}
        else {return false}
    }

}