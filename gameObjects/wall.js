class Wall extends GameObject {

    constructor(name, x, y, width, height) {
        super(name, x, y, width, height);
        this.isRigid = true;
    }

    draw() {
        gameManager.canvas.drawLayer.beginPath();
        gameManager.canvas.drawLayer.fillStyle = "#660000";
        gameManager.canvas.drawLayer.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        // gameManager.canvas.drawLayer.fill();
        gameManager.canvas.drawLayer.closePath();
    }

    onCollision(otherObject) {
        if (otherObject.name == "samuel") {
            //samuel.moveVelocity = 0;
            otherObject.restorePosition();
            // otherObject.restorePosition();
            // console.log("schmul hits wall")
        } 
    }
}