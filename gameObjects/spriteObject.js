class SpriteObject extends GameObject {
    image;
    isLoaded = false;
    rockType;
    //gemType = rockType;/* or gemType; and this.gemType = this.rockType*/
    source = "";
    spriteSize = {
        width: 0,
        height: 0
    };
    
    spritePosition = {
        row: 0,
        col: 0,
        x: 0,
        y: 0
    }

    constructor(name, x, y, width, height, src, row, col, spriteWidth, spriteHeight, rockType) {
        super(name, x, y, width, height);
        this.spriteSize.width = spriteWidth;
        this.spriteSize.height = spriteHeight;
        this.spritePosition.col = col;
        this.spritePosition.row = row;
        this.spritePosition.x = spriteWidth * col;
        this.spritePosition.y = spriteHeight * row;
        this.image = new Image();
        this.image.src = src;
        this.image.addEventListener("load", () => {
            this.isLoaded = true;
            this.draw();
        });
        this.rockType = rockType;
        this.gemType = rockType; 
    }

    draw() {
        if (this.isLoaded) {
            gameManager.canvas.drawLayer.beginPath();
            gameManager.canvas.drawLayer.drawImage(
                this.image,
                this.spritePosition.x, this.spritePosition.y, this.spriteSize.width, this.spriteSize.height,
                this.position.x, this.position.y, this.dimensions.height, this.dimensions.width
            );
            gameManager.canvas.drawLayer.closePath();
        }
    }
    changeImage(row, col) {
        this.spritePosition.col = col;
        this.spritePosition.row = row;
        this.spritePosition.x = (this.spriteSize.width) * (col);
        this.spritePosition.y = (this.spriteSize.height) * (row);
    }
}