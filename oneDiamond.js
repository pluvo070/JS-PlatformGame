// 一个钻石的类

class OneDiamond{
    // 构造函数
    constructor(x, y, imgIndex, levelIndex) {
        this.x = x;
        this.y = y;
        this.levelIndex = levelIndex;
        this.imgIndex = imgIndex;
        this.visible = true;// 玩家角色碰到后改为false

        this.frameCounter = 0; // 计数器
        this.frameIndex = 0; // 当前动画帧索引, 从0开始循环播放
        this.animationFrames = [imgIndex, imgIndex-91]; // 两个帧
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
                assets.icon,  
                this.x-offsetX, this.y-offsetY,   
                tileSize, tileSize,    
                coordinate.x, coordinate.y,  
                tileSize, tileSize      
            );
        }
    }

    // 检查给定的点是否在附近(附近才可以交互)
    isNear(px, py) {
        let d = 10; // 允许四边的d范围内
        if (px >= (this.x - d) && px <= (this.x + tileSize + d )
            && py >= (this.y - d) && py <= (this.y + tileSize + d) ) {
            return true}
        else {return false}
    }


}