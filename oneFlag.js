

class OneFlag{
    // 构造函数
    constructor(x, y, imgIndex, levelIndex) {
        this.x = x;
        this.y = y;
        this.levelIndex = levelIndex;
        this.imgIndex = imgIndex;

        this.frameCounter = 0; // 计数器
        this.frameIndex = 0; // 当前动画帧索引, 从0开始循环播放
        this.animationFrames = [imgIndex, imgIndex+30]; // 两个帧
    }


    show() {
        //text(`${this.x},${this.y}`,this.x-offsetX,this.y-offsetY);
        this.frameCounter++;
        if (this.frameCounter % frameInterval === 0) { 
            this.frameIndex = (this.frameIndex + 1) % this.animationFrames.length;
            this.imgIndex = this.animationFrames[this.frameIndex];
        }
        
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


    // 检查给定的点是否在附近(附近才可以交互)
    isNear(px, py) {
        let d = 5; // 允许四边的d范围内
        // 将人物左上角化为中心点
        px += tileSize/2;
        py += tileSize/2;
        if (px >= (this.x - tileSize/2 - d) && px <= (this.x + 2*tileSize/3 + d )
            && py >= (this.y - tileSize/2 - d) && py <= (this.y + 2*tileSize/3 + d) ) {
            return true}
        else {return false}
    }
    
}