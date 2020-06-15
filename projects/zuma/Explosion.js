class Explosion {
    constructor(x, y) {
        this. x = x
        this. y = y
        this.frame = 0
    }
    
    draw(ctx, images) {
        if (this.frame > 29) {
            return
        }
        let imageName = 'e' + String(Math.floor(this.frame / 3))
        this.frame += 1
        let image = images[imageName]
        rotateAndPaint(ctx, images[imageName], 0, this.x, this.y, image.width / 2, image.height / 2)
    }
}