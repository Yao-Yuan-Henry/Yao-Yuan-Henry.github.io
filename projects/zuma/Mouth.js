class Mouth {
    constructor() {
        this.opened = false
        this.width = 132
        this.height = 132
    }
    
    draw(ctx, images) {
        let image = this.opened ? images.mouth1 : images.mouth0
        rotateAndPaint(ctx, image, 0, 140, 295, this.width / 2, this.height / 2)
    }
}