/* creating variables */
let facingLeft = true; /*setting animation direction*/
let facingDown = true; /*setting animation direction*/
let nonMiner = true; /* Hitbox for mining Stone */
let klinkaud = new Audio('./images/klink.mp3'); /* Sound for mining stone */
klinkaud.volume = 1; /* Sound volume */
klinkaud.loop = false; /* Limiting sound to keydown event */
/* Enabeling audio on Chrome browser on keydown */
klinkaud.addEventListener("canplaythrough", () => {
     document.addEventListener('keydown', () => {
     })
});
gameManager.hit = false; /*HitReg for mining collision*/
gameManager.strokes = 35; /*Samuels energy level, energy consumtion can be maniplated by player skills*/
window.addEventListener("keydown", keyDown); /*Event on key pressed*/
window.addEventListener("keyup", keyUp); /*Event on key release*/
/*All keydown events in switch case*/
function keyDown(eventInformation) {
	/* Setting all input to lower case ( W -> w ) so caps lock isnt stopping player movement*/
	switch (eventInformation.key, eventInformation.key.toLowerCase()) {
		/*Move Up & set animation*/
		case "w":
			/* to stop animation override, if this achsis is already in use */
			if (samuel.moveBy.top != 0) {
				return;
			}
			/* samuel moves up */
			samuel.moveBy.top = -samuel.moveVelocity;
			/* if hes moved left or right before that */
			if (facingLeft)
				/* set the left up animation */
				samuel.setCurrentAnimationByName("walk_left_up");
			else
				/* set the right up animation */
				samuel.setCurrentAnimationByName("walk_right_up");
			/* keeping current direction */
			facingDown = false;
			break;
		/* Move Left & set animation */
		case "a":
			/* to stop animation override, if this achsis is already in use */
			if (samuel.moveBy.left != 0) {
				return;
			}
			/* samuel moves left */
			samuel.moveBy.left = -samuel.moveVelocity;
			/* if hes moved up or down before that */
			if (facingDown)
				/* set the left down animation */
				samuel.setCurrentAnimationByName("walk_left_down");
			else
				/*set the left up animation  */
				samuel.setCurrentAnimationByName("walk_left_up");
			/* keeping current direction */
			facingLeft = true;
			break;
		/*Move Right & set animation*/
		case "d": 
			/* to stop animation override, if this achsis is already in use */
			if (samuel.moveBy.left != 0) {
				return;
			}
			/* samuel moves right */
			samuel.moveBy.left = +samuel.moveVelocity;
			/* if hes moved up or down before that */
			if (facingDown)
				/* set the right down animation */
				samuel.setCurrentAnimationByName("walk_right_down");
			else
				/* set the right up animation */
				samuel.setCurrentAnimationByName("walk_right_up");
			/* keeping current direction */
			facingLeft = false;
			break;
		/*Move Down & set animation*/
		case "s": 
			/* to stop animation override, if this achsis is already in use */
			if (samuel.moveBy.top != 0) {
				return;
			}
			/* samuel moves down */
			samuel.moveBy.top = samuel.moveVelocity;
			/* if hes moved left or right before that */
			if (facingLeft)
				/* set the left down animation */
				samuel.setCurrentAnimationByName("walk_left_down");
			else
				/* set the right down animation */
				samuel.setCurrentAnimationByName("walk_right_down");
			/* keeping current direction */
			facingDown = true;
			break;
		/*Mine current colliding rock*/
		case " ": 
			/* if you are not already mining & you are able to hit a rock */
			if (nonMiner  && samuel.checkMiningCollision()) {
				/* play the mining sound */
				klinkaud.play()
				/* register the targeted rock */
				gameManager.hit = true;
				/* mine the targeted rock */
				nonMiner = false;
			}
			break;
	}
}

function keyUp(eventInformation) {
	switch (eventInformation.key) {
		/*Stop movement to -y achsis only & Start idle animation up right/left*/
		case "w": 
			samuel.moveBy.top = 0;
			if (facingLeft)
				samuel.setCurrentAnimationByName("idle_left_up");
			else
				samuel.setCurrentAnimationByName("idle_right_up");
			break;
		/*Stop movement to -x achsis only & Start idle animation up/down left*/
		case "a": 
			samuel.moveBy.left = 0;
			if (facingDown)
				samuel.setCurrentAnimationByName("idle_left_down");
			else
				samuel.setCurrentAnimationByName("idle_left_up");
			break;
		/*Stop movement to -x achsis only & Start idle animation up/down left*/
		case "d": 
			samuel.moveBy.left = 0;
			if (facingDown)
				samuel.setCurrentAnimationByName("idle_right_down");
			else
				samuel.setCurrentAnimationByName("idle_right_up");
			break;
		/*Stop movement to y achsis only & Start idle animation down right/left*/
		case "s": 
			samuel.moveBy.top = 0;
			if (facingLeft)
				samuel.setCurrentAnimationByName("idle_left_down");
			else
				samuel.setCurrentAnimationByName("idle_right_down");
			break;
		/* Stop mining */
		case " ":
			if (samuel.checkMiningCollision()) {
				gameManager.hit = false;
			}
			nonMiner = true;
			break;
	}
}