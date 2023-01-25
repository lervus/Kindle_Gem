class PlayerFigure extends ImageObject {
    moveBy = {
        "left": 0,
        "top": 0
    };

    
    moveVelocity = 0.01;
    
    constructor(name, x, y, src) {
        super(name, x, y, 64, 64, src);
        this.isRigid = true;
    }
    
    update() {
        this.position.x += this.moveBy.left;
        this.position.y += this.moveBy.top;
        
        if (this.moveBy.left < 0) {
            // console.log("schaut links");
            this.setMiningOffsets(-10, -32, 32, -32);
        } else if (this.moveBy.top > 0) {
            // console.log("schaut runter");
            this.setMiningOffsets(32, -32, 32, 10);
        } else if (this.moveBy.left > 0) {
            // console.log("schaut rechts");
            this.setMiningOffsets(32, 10, 32, -32);
        } else if (this.moveBy.top < 0) {
            // console.log("schaut rauf");
            this.setMiningOffsets(32, -32, -10, -32);
        } else {
            return;
        }
        this.checkWorldPostion();
    }
    
    onCollision(otherObject) {
        if (otherObject.name == "obstacle" || otherObject.name == "ore") {
        }
    }
    
    checkMiningCollision() {
        let returnValue = false;
        gameManager.gameObjects.forEach(object1 => {
            if (object1.isActive && (object1.name == "ore" || object1.name == "obstacle")) {
                if (this.mining.getLeftMining() <= object1.boundaries.getRightBoundary() &&
                this.mining.getRightMining() >= object1.boundaries.getLeftBoundary()) {
                    if (this.mining.getTopMining() <= object1.boundaries.getBottomBoundary() &&
                    this.mining.getBottomMining() >= object1.boundaries.getTopBoundary()) {
                        
                        if (gameManager.strokes < 1) {
                            // Save score
                            gameManager.currentUser.score = gameManager.score;
                            gameManager.saveScore();
                            
                            // Stop audio
                            gameManager.stopAudio();
                            
                            // End game
                            gameManager.gameOver = true;
                            
                            // Show endscreen
                            gameManager.showEndScreen();
                            
                            return false;
                        }
                        gameManager.strokes = Math.max(--gameManager.strokes, 0);
                        returnValue = gameManager.spawnGem(object1);
                    }
                }
            }
        });
        return returnValue;
    }
    // //DEBUGG HITBOX - courtesy of David Kupert
    // draw() {
    //     gameManager.canvas.drawLayer.beginPath();
    //     gameManager.canvas.drawLayer.strokeStyle = "red";
    //     gameManager.canvas.drawLayer.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
    //     gameManager.canvas.drawLayer.stroke();
    //     gameManager.canvas.drawLayer.closePath();
    
    //     //Offset
    //     gameManager.canvas.drawLayer.beginPath();
    //     gameManager.canvas.drawLayer.strokeStyle = "blue";
    //     gameManager.canvas.drawLayer.rect(  this.boundaryOffsets.left+ this.position.x, this.position.y + this.boundaryOffsets.top, this.dimensions.width+this.boundaryOffsets.right-this.boundaryOffsets.left, this.dimensions.height+this.boundaryOffsets.bottom-this.boundaryOffsets.top);
    //     gameManager.canvas.drawLayer.stroke();
    //     gameManager.canvas.drawLayer.closePath();
    
    //     //Mining-Offset
    //     gameManager.canvas.drawLayer.beginPath();
    //     gameManager.canvas.drawLayer.strokeStyle = "green";
    //     gameManager.canvas.drawLayer.rect(  this.miningOffsets.left+ this.position.x, this.position.y + this.miningOffsets.top, this.dimensions.width+this.miningOffsets.right-this.miningOffsets.left, this.dimensions.height+this.miningOffsets.bottom-this.miningOffsets.top);
    //     gameManager.canvas.drawLayer.stroke();
    //     gameManager.canvas.drawLayer.closePath();
    // }
}