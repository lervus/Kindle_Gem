    const userName = prompt('What is your name?') || 'Samuel';

    document.getElementById('scoreText').style.display = 'block';
    document.getElementById('staminaText').style.display = 'block';
    // document.getElementById('btnResetScore').addEventListener('click', () => {
    //     localStorage.clear();
    // });

    let gameManager = new GameManager();
    gameManager.addUser(userName);
    
    let canvas = new Canvas("canvas");
    
    let wallMap = [
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],/*20*/
        [6, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 6],
        [6, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 6],
        [6, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 6],
        [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
        [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
        [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
        [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
        [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
        [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
        [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
        [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
        [6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
        [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
        /*14*/
    ];
    
    function randomizeContent() {
        for (let y = 0; y < wallMap.length; y++) {
    
            for (let x = 0; x < wallMap[y].length; x++) {
    
                if (wallMap[y][x] === 0) {
                    let temp = Math.random();
                    if (temp <= 0.33) {
                        wallMap[y][x] = 1;
                    } else if (temp <= 0.66 && temp > 0.33) {
                        wallMap[y][x] = 2;
                    } else if (temp <= 0.80 && temp > 0.66) {
                        wallMap[y][x] = 3;
                    } else if (temp <= 0.92 && temp > 0.80) {
                        wallMap[y][x] = 4;
                    } else {
                        wallMap[y][x] = 5;
                    }
                }
            }
        }
    }
    
    blockSize = 64;
    
    function setupWalls() {
        for (let y = 0; y < wallMap.length; y++) {
            for (let x = 0; x < wallMap[y].length; x++) {
                
                switch (wallMap[y][x]) {
                    case 2:
                        new Obstacle("obstacle", x * blockSize, y * blockSize, blockSize, blockSize, "./images/rock_1.png", 0,0,996,885, "Rock");
                        break;
    
                    case 3:
                        new Obstacle("ore", x * blockSize, y * blockSize, blockSize, blockSize, "./images/ore_r.png",0,0,996,885, "Ruby Ore");
                        break;
    
                    case 4:
                        new Obstacle("ore", x * blockSize, y * blockSize, blockSize, blockSize, "./images/ore_b.png",0,0,996,885, "Saphire Ore");
                        break;
    
                    case 5:
                        new Obstacle("ore", x * blockSize, y * blockSize, blockSize, blockSize, "./images/ore_g.png",0,0,996,885, "Emerald Ore");
                        break;
    
                    case 6:
                        new Wall("wall", x * blockSize, y * blockSize, blockSize, blockSize);
                        break;
                }
            }
        }
    }
    
    randomizeContent();
    
    setupWalls();
    
    const samuel = new PlayerFigure("samuel", 601, 64, "./images/samuel_sheet.png");
    
    samuel.setBoundaryOffsets(20, -20, 25, 0);

    samuel.addAnimationInformation("walk_left_down", 0, 13);
    samuel.addAnimationInformation("walk_left_up", 14, 27);
    samuel.addAnimationInformation("walk_right_down", 28, 41);
    samuel.addAnimationInformation("walk_right_up", 42, 55);
    
    samuel.addAnimationInformation("idle_left_up", 56, 62);
    samuel.addAnimationInformation("idle_right_up", 70, 76);
    samuel.addAnimationInformation("idle_left_down", 84, 90);
    samuel.addAnimationInformation("idle_right_down", 98, 104);
    
    requestAnimationFrame(gameManager.gameLoop.bind(gameManager));
