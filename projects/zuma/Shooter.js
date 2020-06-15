class Shooter {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.angle = 0
        this.shooting = false
        this.width = 105
        this.height = 104
        this.toShoot = []
    }
    draw(ctx, images) {
        let [axisX, axisY] = [this.width / 2, this.height / 2]
        let image = this.shooting ? images.shooter1 : images.shooter0

        ctx.shadowColor = 'rgb(0, 0, 0, 0.5)'
        ctx.shadowOffsetY = 3
        ctx.shadowBlur = 5
        rotateAndPaint(ctx, image, this.angle, this.x, this.y, axisX, axisY)
        ctx.shadowOffsetY = 0
        ctx.shadowBlur = 0
    }
}