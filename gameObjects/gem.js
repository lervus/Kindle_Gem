class Gem extends SpriteObject {
    /* Count gem score */
    ScoreCount = document.querySelector("ScoreCount");
    /* Making it a collectible */
    isRigid = false; 
    
    grabaud = new Audio('./images/grab_rocks.mp3');

    constructor(name, x, y, width, height, src, row, col, spriteWidth, spriteHeight, rockType, gemType) {
        super(name, x, y, width, height, src, row, col, spriteWidth, spriteHeight, rockType, gemType);
    }


    onCollision(otherObject, foundGem) {
        if (otherObject.name == "samuel") {
            foundGem.isActive = false;
            this.grabaud.play();
            if (foundGem.gemType == "Ruby gem" && gameManager.score < gameManager.maxScore) {
                gameManager.score += 11;
            } else if (foundGem.gemType == "Saphire gem" && gameManager.score < gameManager.maxScore) {
                gameManager.score += 22;
            } else if (foundGem.gemType == "Emerald gem" && gameManager.score < gameManager.maxScore)
                gameManager.score += 34;
        } if (gameManager.score > gameManager.maxScore) {
            gameManager.score = 9999;
        }
        ScoreCount.innerHTML = gameManager.score;
    }
}