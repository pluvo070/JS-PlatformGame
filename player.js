class Player {

    // 构造函数
    constructor(x, y, speed, hp, imgIndex) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.maxhp = hp; // 最大血量
        this.hp = hp; // 当前血量, 初始值为最大血量
        this.imgIndex = imgIndex; // 图标起始坐标
    }

    // 移动 + 限制玩家的位置
    update() {
        if (keys['ArrowLeft']) this.x -= this.speed;
        if (keys['ArrowRight']) this.x += this.speed;
        if (keys['ArrowUp']) this.y -= this.speed;
        if (keys['ArrowDown']) this.y += this.speed;

        if (keys['a']) this.x -= this.speed;
        if (keys['d']) this.x += this.speed;
        if (keys['w']) this.y -= this.speed;
        if (keys['s']) this.y += this.speed;
        if (keys['A']) this.x -= this.speed;
        if (keys['D']) this.x += this.speed;
        if (keys['W']) this.y -= this.speed;
        if (keys['S']) this.y += this.speed;

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

}
  