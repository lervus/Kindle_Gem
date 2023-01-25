class GameManager {
	//properties
	gameObjects = [];
	canvas = null;
	previousTimeStamp;
	currentDeltaTime;
	hit = false;
	score = 0;
	maxScore = 9999;
	strokes;
	MineStrokes = document.getElementById("MineStrokes");
	ScoreCount = document.getElementById("ScoreCount");

	// Score Logic & Audio
	users = [0];
	currentUser = null;
	gameOver = false;
	aud = null;
	activeUser = {
		"name": userName,
		"score": 0
	}

	constructor(canvas) {
		this.canvas = canvas;
		window.gameManager = this;

		this.startAudio();
	}


	gameLoop() {
		// let currentTimeStamp = performance.now();
		// gameManager.currentDeltaTime = currentTimeStamp - gameManager.previousTimeStamp;
		// gameManager.previousTimeStamp = currentTimeStamp;

		canvas.drawLayer.clearRect(0, 0, canvas.canvasHTMLElement.width, canvas.canvasHTMLElement.height);
		for (let gameLoopState = 0; gameLoopState < 4; gameLoopState++) {

			gameManager.gameObjects.forEach((gameObject, index) => {
				if (gameObject.isActive) {
					if (gameLoopState == 0) {
						ScoreCount.innerHTML = gameManager.score;
						MineStrokes.innerHTML = gameManager.strokes;
						gameObject.storePosition();
					}
					if (gameLoopState == 1) {
						samuel.update();
					}
					if (gameLoopState == 2) {
						gameObject.currentCollisionObject = null;
						gameManager.checkObjectsForCollisions(gameObject, index);
					}
					if (gameLoopState == 3) {
						gameObject.draw();
					}
				} else 
				return;
			});
		}
		
		if (!gameManager.gameOver) {
			requestAnimationFrame(gameManager.gameLoop);
		}
	}

	checkObjectsForCollisions(object1) {

		for (let i = object1.gameObjectIndex + 1; i < gameManager.gameObjects.length; i++) {
			let object2 = gameManager.gameObjects[i];

			if (object2.isActive) {
				let collisionDetected = this.detectCollision(object1, object2);
				if (collisionDetected) {
					if (object2.name == "samuel") {
						object1.onCollision(object2, object1);/* hier oder eine zeile weiter unten */
					}
					object2.onCollision(object1, object2);

				}
				if (object2.name == "samuel" && gameManager.hit == true) {
					this.detectMiningCollision(object2, object1);
					gameManager.hit = false;
				}
			}
		}
	}

	checkRigidObjectsForCollisions(object1) {
		for (let i = object1.gameObjectIndex + 1; i < gameManager.gameObjects.length; i++) {
			let object2 = gameManager.gameObjects[i];
			if (object2.isActive && object2.isRigid) {
				gameManager.checkRigidObjectsForCollisions(object1, object2);
			}
			if (object1.isActive && object2.isRigid) {
				gameManager.checkRigidObjectsForCollisions(object2, object1);
			}
			return true;
		}
	}

	detectCollision(object1, object2) {
		if (object1.boundaries.getLeftBoundary() <= object2.boundaries.getRightBoundary() &&
			object1.boundaries.getRightBoundary() >= object2.boundaries.getLeftBoundary()) {
			if (object1.boundaries.getTopBoundary() <= object2.boundaries.getBottomBoundary() &&
				object1.boundaries.getBottomBoundary() >= object2.boundaries.getTopBoundary()) {
				return true;
			}
		}
	}

	detectMiningCollision(object2, object1) {
		if (object2.mining.getLeftMining() <= object1.boundaries.getRightBoundary() &&
			object2.mining.getRightMining() >= object1.boundaries.getLeftBoundary()) {
			if (object2.mining.getTopMining() <= object1.boundaries.getBottomBoundary() &&
				object2.mining.getBottomMining() >= object1.boundaries.getTopBoundary()) {
				console.log("Mining offset collision detected");
				gameManager.spawnGem(object1);
			}
		}
	}

	spawnGem(Rock) {
		Rock.isActive = false;
		if (Rock.gemType == "Rock") {
		} else if (Rock.gemType == "Ruby Ore") {
			new Gem ("gem", Rock.position.x + 20, Rock.position.y + 20, 32, 32, "./images/gems_32_r.png",0,0,32,32, "Ruby gem");
		} else if (Rock.gemType == "Saphire Ore") {
			new Gem ("gem", Rock.position.x + 20, Rock.position.y + 20, 32, 32, "./images/gems_32_b.png",0,0,32,32, "Saphire gem");
		} else if (Rock.gemType == "Emerald Ore") {
			new Gem ("gem", Rock.position.x + 20, Rock.position.y + 20, 32, 32, "./images/gems_32_g.png",0,0,32,32, "Emerald gem");
		}
		return true;
	}

	startAudio() {
		this.aud = new Audio('./images/cave.mp3');
		this.aud.volume = 1;
		this.aud.loop = true;
		this.aud.addEventListener("canplaythrough", () => {
			this.aud.play().catch(e => {
			 document.addEventListener('keydown', () => {
					this.aud.play()
			 }, { once: true })
		  })
		});
	}

	stopAudio() {
		this.aud.pause();
	}

	addGameObject(object) {
		this.gameObjects.push(object);
		object.gameObjectIndex = this.gameObjects.length - 1;
	}

	setCanvas(canvas) {
		this.canvas = canvas;
	}

	loadUsers() {
		try {
			let oldUsers = localStorage.getItem('samuelScore');
			oldUsers = JSON.parse(oldUsers);
			gameManager.users = oldUsers ?? [];
		} catch(e) {}
	}

	addUser(userName) {
		// Load previous users
		this.loadUsers();

		// Add new user to previous ones
		gameManager.activeUser = {
			"name": userName,
			"score": 0
		};
		
		this.currentUser = gameManager.activeUser;
		gameManager.users.push(gameManager.activeUser);
	}

	saveScore() {
		let dataToSave = this.users.sort((a, b) => b.score - a.score);
		dataToSave = JSON.stringify(dataToSave);
		localStorage.setItem('samuelScore', dataToSave);
	}

	showEndScreen() {
		const game = document.getElementById('gameContainer');
		const over = document.getElementById('gameOver');
		const score = document.getElementById('score');

		let users = localStorage.getItem('samuelScore');
		users = JSON.parse(users);
		let scoreString = 
		`
		<br />
		<table>`;
		users.slice(0, 6).forEach(user => {
			scoreString += `
			<tr>
					<td>Player</td>
					<td style="color: aquamarine">${user.name}</td>
				</tr>
				<tr>
					<td>Score</td>
					<td style="color: #00ff00">${user.score}</td>
				</<tr>
			`;
		});
		scoreString += `</table>`;
		// Set highscore
		score.innerHTML = scoreString;

		game.style.display = 'none';
		over.style.display = 'block';
	}
}