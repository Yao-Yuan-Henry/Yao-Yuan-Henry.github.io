class Game {
    constructor() {
        this.images = {}
        this.balls = []
        this.explosions = []
        this.beforeStarted = true // 游戏未开始
        this.lose = false
    }
    // 用来释放死去小球的空间
    clearDeadBalls() {
        for (let i = 0; i < this.balls.length; i++) {
            if (this.balls[i].state === -1) {
                if (i === 0) {
                    this.balls.shift()
                } else if (i === this.balls.length - 1) {
                    this.balls.pop()
                } else {
                    this.balls.splice(i,1)
                }
            }
        }
        for (let i = 0; i < this.rail.balls.length; i++) {
            if (this.rail.balls[i].state === -1) {
                if (i === 0) {
                    this.rail.balls.shift()
                } else if (i === this.balls.length - 1) {
                    this.rail.balls.pop()
                } else {
                    this.rail.balls.splice(i,1)
                }
            }
        }
    }
    
    clearExploded() {
        for (let i = 0; i < this.explosions.length; i++) {
            if (this.explosions[i].frame > 29) {
                if (i === 0) {
                    this.explosions.shift()
                } else if (i === this.balls.length - 1) {
                    this.explosions.pop()
                } else {
                    this.explosions.splice(i,1)
                }
            }
        }
    }
    
    makeBalls(num, linkOdds = 0.5) {
        game.sfx.makeBalls.play()
        for (let i = 0; i < num; i++) {
            let newBall = new Ball(1000, 1000)
            newBall.state = 3
            newBall.s = -30 * i
            newBall.angle = 180
            newBall.v = game.rail.speed
            if (Math.random() < linkOdds) {
                let balls = this.rail.balls
                let length = balls.length
                if (length > 0) {
                    newBall.type = balls[length - 1].type
                }
            }
            this.balls.push(newBall)
            this.rail.balls.push(newBall)
        }
    }
}