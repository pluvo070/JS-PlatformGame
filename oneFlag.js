

class OneFlag{
    // 构造函数
    constructor(x, y, imgIndex, levelIndex) {
        this.x = x;
        this.y = y;
        this.levelIndex = levelIndex;
        this.imgIndex = imgIndex;
    }


    show() {
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


    // 检查给定的点是否在附近(附近才可以交互)
    isNear(px, py) {
        let d = 10; // 允许四边的d范围内
        if (px >= (this.x - d) && px <= (this.x + tileSize + d )
            && py >= (this.y - d) && py <= (this.y + tileSize + d) ) {
            return true}
        else {return false}
    }
    
}