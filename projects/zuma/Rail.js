class Rail {
    constructor() {
        this.balls = []
        this.speed = 1
        this.length = 4420
    }
    
    sToXy(s) {
        let x, y, angle
        // 已知轨道上小球与原点的距离为 s，求 (x,y) 与 切线角 angle
        if (s < 0) {
            // 未出现
            x = 800 - s
            y = 80
            angle = 180
        } else if (s <= 730) {
            x = 800 - s
            y = 80
            angle = 180
        } else if (s <= 800) {
            x = 70
            y = 80 + (s - 730)
            angle = 90
        } else if (s <= 1445) {
            y = 150
            x = 70 + (s - 800)
            angle = 0
        } else if (s <= 1855) {
            x = 715
            y = 150 + (s - 1445)
            angle = 90
        } else if (s <= 2500) {
            x = 715 - (s - 1855)
            y = 560
            angle = 180
        } else if (s <= 2850) {
            x = 70
            y = 560 - (s - 2500)
            angle = 270
        } else if (s <= 3425) {
            x = 70 + (s - 2850)
            y = 210
            angle = 0
        } else if (s <= 3715) {
            x = 645
            y = 210 + (s - 3425)
            angle = 90
        } else if (s <= 4220) {
            x = 645 - (s - 3715)
            y = 500
            angle = 180
        } else if (s < 4419) {
            x = 140
            y = 500 - (s - 4220)
            angle = 270
        } else {
            // 已到终点
            x = 140
            y = 500 - (s - 4220)
            angle = 270
        }
        return [x, y, angle]
    }
    
    collideOnRail() {
        let balls = this.balls
        for (let i = 0; i < balls.length - 1; i++) {
            let a = balls[i]
            let b = balls[i + 1]
            let d = a.s - b.s
            
            if (d < a.r + b.r) {
                // 前球被后球碰，令前球位移，并获得后球球速
                a.s += ((b.s + b.r) - (a.s - a.r)) * 0.5
                
                if (Math.abs(a.v - b.v) > 0.5) {
                    game.sfx.collideOnRail.play()
                }
                
                a.v = b.v
                if (a.toClear) {
                    a.toClear = false
                    this.clear3(i)
                }
            }
        }
    }
    
    link3(i, linking = []) {
        let balls = this.balls
        linking.push(i)
        if (i > 0 && balls[i].type === balls[i - 1].type && !linking.includes(i - 1) && Math.abs(balls[i].s - balls[i - 1].s) < 80) {
            linking = linking.concat(this.link3(i - 1, linking))
        }
        if (i < balls.length - 1 && balls[i].type === balls[i + 1].type && !linking.includes(i + 1) && Math.abs(balls[i].s - balls[i + 1].s) < 80) {
            linking = linking.concat(this.link3(i + 1, linking))
        }
        // 返回前对数组去重
        return uniqueArray(linking)
    }

    clear3(i) {
        let balls = this.balls
        let linking = this.link3(i)
        if (linking.length > 2) {
            let minI = Math.min(...linking)
            for (let i of linking) {
                balls[i].explode()
            }
            if (game.sfx.clearFlag) {
                game.sfx.clearFlag = false
                game.sfx.clear.play()
            } else {
                game.sfx.clearFlag = true
                game.sfx.clear2.play()
            }
            setTimeout(() => {
                if (minI < balls.length && minI > 0) {
                    if (balls[minI - 1].type === balls[minI].type) {
                        for (let i = 0; i < minI; i++) {
                            balls[i].v = -10
                        }
                        balls[minI - 1].toClear = true
                    } else {
                        for (let i = 0; i < minI; i++) {
                            balls[i].v = 0
                        }
                    }
                }
            }, 600)
        }
    }
    
    slower() {
        // 当小球入轨时，轨道上所有小球慢下来一会儿
        for (let ball of this.balls) {
            let v0 = ball.v
            ball.v *= 0.3
            setTimeout(() => {
                ball.v = v0
            }, 500)
        }
    }
}