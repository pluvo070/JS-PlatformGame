

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
}