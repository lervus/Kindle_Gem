class Obstacle extends SpriteObject {

    
    constructor(name, x, y, width, height, src, row, col, spriteWidth, spriteHeight, rockType) {
        super(name, x, y, width, height, src, row, col, spriteWidth, spriteHeight, rockType);
        this.isRigid = true;
        /*console.log(this.position)---works*/
    }
    
    boundaryOffsets = { 
        "left": 5,
        "right": -5,
        "top": 10,
        "bottom": -10 
    };

    onCollision(otherObject, thisRock) {
        if (otherObject.name == "samuel") {
            otherObject.restorePosition();
        }
    }
}