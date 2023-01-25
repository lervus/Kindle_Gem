class GameObject {
    /* Setting a variable for game Object names */
	name = "";
    /* Setting a variale to manipulate game Objects */
    isActive = true; 
    /* Setting a variable for collidig game Objects */
    isRigid = true; 
    /* declaring movement direction on achsis */
    moveBy = { 
	    "left": 0,
	    "top": 0
    };
    /* declaring movement achsis */
    position =  { 
        "x": 0,
        "y": 0
    };
    /* setting movement restoration achsis (e.g., on collision) */
    prevPosition =  { 
        "x": 0,
        "y": 0
    };
    /* define Object Boundaries for y & x achsis */
    boundaries = { 
        "getLeftBoundary": () => {
            return this.position.x + this.boundaryOffsets.left;
        }, 
        "getRightBoundary": () => {
            return this.position.x + this.dimensions.width + this.boundaryOffsets.right;
        }, 
        "getTopBoundary": () => {
            return this.position.y + this.boundaryOffsets.top;
        }, 
        "getBottomBoundary": () => {
            return this.position.y + this.dimensions.height + this.boundaryOffsets.bottom;
        }
    };
    /* Define mining hitbx */
    mining = { 
        "getLeftMining": () => {
            return this.position.x + this.miningOffsets.left;
        }, 
        "getRightMining": () => {
            return this.position.x + this.dimensions.width + this.miningOffsets.right;
        }, 
        "getTopMining": () => {
            return this.position.y + this.miningOffsets.top;
        }, 
        "getBottomMining": () => {
            return this.position.y + this.dimensions.height + this.miningOffsets.bottom;
        }
    };
    /* Define the boudndary achsis as "left","right" usw. to manipulate the hitboxs */
    boundaryOffsets = { 
        "left": 0,
        "right": 0,
        "top": 0,
        "bottom": 0 
    };
    /* Define the boudndary achsis as "left","right" usw. to manipulate the hitbox of the player Figure mining action */
    miningOffsets = { 
        "left": 0,
        "right": 0,
        "top": 0,
        "bottom": 0 
    };
    /* Setting Box-size */
    dimensions =  {
        "width": 50,
        "height": 50
    };
    /* Passing important parameters to a constructor */
    constructor(name, x, y, width, height) { 
        this.name = name;
        this.position.x = x;
        this.position.y = y;
        this.dimensions.width = width;
        this.dimensions.height = height;
        gameManager.addGameObject(this);
    }
    /* storing Object positions for collisions on before mentioned achsis */
    storePosition() { 
        this.prevPosition.x = this.position.x;
        this.prevPosition.y = this.position.y;
    }
    /* restoring Object positions for collisions on before mentioned achsis */
    restorePosition() { 
        this.position.x = this.prevPosition.x;
        this.position.y = this.prevPosition.y;
    }
    /* define before mentioned offset on each achsis for the player figure */
    setBoundaryOffsets(left, right, top, bottom) { 
        this.boundaryOffsets.left = left;
        this.boundaryOffsets.right = right;
        this.boundaryOffsets.top = top;
        this.boundaryOffsets.bottom = bottom;
    }
    /* define before mentioned mining offset on each achsis for the player figure */
    setMiningOffsets(left, right, top, bottom) { 
        this.miningOffsets.left = left;
        this.miningOffsets.right = right;
        this.miningOffsets.top = top;
        this.miningOffsets.bottom = bottom;
    }
    /* calling the update function */
    update() { 
    }
    /* calling daw function */
    draw() { 
    }
    /* calling the onCollision for the colliding object */
    onCollision(otherObject) {
    }


    checkWorldPostion() { /*Comparing the players position to hte canvas size to locate it on canvas*/
        if (this.boundaries.getBottomBoundary() <= gameManager.canvas.canvasBoundaries.top) {
            this.position.y = gameManager.canvas.canvasBoundaries.bottom;
        }
        else if (this.boundaries.getTopBoundary() >= gameManager.canvas.canvasBoundaries.bottom) {
            this.position.y = gameManager.canvas.canvasBoundaries.top - this.dimensions.height;
        }
        else if (this.boundaries.getRightBoundary() <= gameManager.canvas.canvasBoundaries.left) {
            this.position.x = gameManager.canvas.canvasBoundaries.right;
        }
        else if (this.boundaries.getLeftBoundary() >= gameManager.canvas.canvasBoundaries.right) {
            this.position.x = gameManager.canvas.canvasBoundaries.left - this.dimensions.width;
        }
    }
}