class ImageObject extends GameObject {
    /* setting the image parameter for image objects */
    image; 
    /* setting animation sequencing */
    animations = {}; 
    /* Setting spritesheet columns */
    columns = 0; 
    /* Setting spritesheet rows */
    rows = 0; 
    /* setting spritesheet starting source point on x achsis */
    currentSourceX = 0; 
    /* setting spritesheet starting source point on y achsis */
    currentSourceY = 0; 
    /* declaring the nth frame as start frame */
    currentStartFrame = 0; 
    /* declaring the nth frame as end frame */
    currentEndFrame = 0; 
    /* declaring the nth frame as the current frame */
    currentAnimationFrame = 0; 
    /* adding load time buffer to make sure each object is drawn */
    isLoaded = false;
    animationDurationPerFrame = 10;
    currentAnimationFrameDuration = 0;


    constructor(name, x, y, width, height, src) {
        super(name, x, y, width, height);
        this.image = new Image();
        this.image.src = src;
        this.image.addEventListener("load", () => {
            this.isLoaded = true;
            this.columns = this.image.naturalWidth / this.dimensions.width;
            this.rows = this.image.naturalHeight / this.dimensions.height;
        });    
    }
   
    draw() {
        if (this.isLoaded) {
            this.changeFrameOfCurrentAnimation();
            gameManager.canvas.drawLayer.clearRect(this.x, this.y, this.width, this.height);
            gameManager.canvas.drawLayer.drawImage(this.image, this.currentSourceX , this.currentSourceY , this.dimensions.width , this.dimensions.height , this.position.x, this.position.y, this.dimensions.height, this.dimensions.width);
        }
    }

    setCurrentAnimation(startFrame, endFrame) {
        this.currentStartFrame = startFrame;
        this.currentEndFrame = endFrame;
        this.currentAnimationFrame = startFrame;
    }

    changeFrameOfCurrentAnimation() {
        this.currentAnimationFrameDuration++;
        if (this.currentAnimationFrameDuration < this.animationDurationPerFrame) {
            return;
        }
        this.currentAnimationFrameDuration = 0;
        if (this.currentAnimationFrame > this.currentEndFrame) {
            this.currentAnimationFrame = this.currentStartFrame;
        }
        let currentRow = Math.floor(this.currentAnimationFrame / this.columns);
        let currentColumn = this.currentAnimationFrame % this.columns;
        this.currentSourceY = currentRow * this.dimensions.height;
        this.currentSourceX = currentColumn * this.dimensions.width;
        this.currentAnimationFrame++;
    }

    addAnimationInformation(name, startFrame, endFrame) {
        let animationInformation = {
            "startFrame": startFrame,
            "endFrame": endFrame
        }

        this.animations[name] = animationInformation;
    }

    setCurrentAnimationByName(name) {
        this.currentStartFrame = this.animations[name].startFrame;
        this.currentEndFrame = this.animations[name].endFrame;
        this.currentAnimationFrame = this.animations[name].startFrame;
    } 

    setCanvas(canvas) {
        this.canvas = canvas;
    }
}