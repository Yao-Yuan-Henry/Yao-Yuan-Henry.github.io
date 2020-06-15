class Ball {
    constructor(x, y, vx = 0, vy = 0) {
        this.type = this.randomType()
        this.frame = 0 // 0 ~ 9
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
        this.v = 0 // 轨道上的球速
        this.s = -1 // 距离轨道原点的距离
        this.angle = angleX(0, 0, vx, vy)
        this.r = 38 / 2
        // state:
        // -2   爆炸中
        // -1   死亡
        // 0    在原点，跟随发射器转动
        // 1    准备发射，跟随发射器转动
        // 2    在空中移动
        // 3    在轨道上
        this.state = 0
    }
    
    randomType() {
        // 目前有6种球，b0 ~ b5
        return Math.floor(Math.random() * 6)
    }
    
    update(canvas, rail, shooter) {
        let x0 = shooter.x
        let y0 = shooter.y
        let x = (window.mouseX - x0)
        let y = (window.mouseY - y0)
        let r = Math.sqrt(x * x + y * y)
        
        if (this.state === 0) {
            this.angle = angleX(x0, y0, mouseX, mouseY)
        }
        if (this.state === 1) {
            this.angle = angleX(x0, y0, mouseX, mouseY)
            this.x = x0 + x / r * 30
            this.y = y0 + y / r * 30
        }
        if (this.state === 2) {
            this.x += this.vx
            this.y += this.vy
            this.angle = angleX(0, 0, this.vx, this.vy)
        }
        if (this.state === 3) {
            this.s += this.v
            let [x, y, angle] = rail.sToXy(this.s)
            this.x = x
            this.y = y
            this.angle = angle
        }
    }
    
    collide(rail, i) {
        let a = this
        let b = rail.balls[i]
        // 判断碰撞角度
        let ang = ((angleX(b.x, b.y, a.x, a.y) - b.angle + 360)) % 360

        // debug: 画辅助线
        // let canvas = e('#id-canvas')
        // let ctx = canvas.getContext('2d')
        // drawRay(ctx, b.x, b.y, a.x, a.y)
        
        // 推开轨道上的小球
        if (ang > 90 || ang > 270) {
            b.s += 2
        } else {
            b.s -= 2
        }
        
        if (!a.colliding) {
            // 先让小球慢下来
            a.vx *= 0.5
            a.vy *= 0.5
            rail.slower()
            // 设置碰撞 flag
            a.colliding = true
            // 播放音效
            game.sfx.collide.play()
            setTimeout(() => {
                let ang = ((angleX(b.x, b.y, a.x, a.y) - b.angle + 360)) % 360
                a.state = 3
                a.vx = 0
                a.vy = 0
                if (i === rail.balls.length - 1) {
                    if (game.paused) {
                        a.v = 0
                    } else {
                        a.v = rail.speed
                    }
                } else {
                    a.v = b.v
                }
                if (ang <= 90 || ang > 270) {
                    a.s = b.s + b.r - a.r
                    rail.balls.splice(i, 0, a)
                    rail.clear3(i)
                } else {
                    a.s = b.s - b.r - a.r
                    rail.balls.splice(i + 1, 0, a)
                    rail.clear3(i + 1)
                }
            }, 300)
        }
    }
    
    ifCollide(rail) {
        let balls = rail.balls
        let a = this
        for (let i = 0; i < balls.length; i++) {
            let b = balls[i]
            let d = Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y))
            if (d <= (a.r + b.r)) {
                this.collide(rail, i)
            }
        }
    }
    
    // 计算当前帧
    countFrame() {
        if (this.v > 0.5 || this.vx !== 0 || this.vy !== 0) {
            this.frame = (this.frame + 1) % 10
        }
        return 'b' + String(this.type) + String(this.frame)
    }
    
    draw(ctx, images, rail) {
        if (this.state === -1) {
            // 死亡小球不显示
            return
        }
        if (this.state === 3 && (this.s < -this.r || this.s >= rail.length)) {
            // 轨道起点之前，终点之后的小球不显示
            return
        }
        
        let imageName = this.countFrame()
        ctx.shadowColor = 'rgb(0, 0, 0, 0.5)'
        ctx.shadowOffsetY = 3
        ctx.shadowBlur = 5
        rotateAndPaint(ctx, images[imageName], this.angle, this.x, this.y, this.r, this.r)
        ctx.shadowOffsetY = 0
        ctx.shadowBlur = 0
    }
    
    die(canvas, rail) {
        if (this.state === 2 && (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height)) {
            this.state = -1
        }
        if (this.state === 3 && this.s > rail.length) {
            this.state = -1
            // 轨道上小球碰到终点，则所有球冲入终点
            game.mouth.opened = true
            let balls = rail.balls
            balls[balls.length - 1].v = 20
            // 游戏结束
            game.lose = true
            game.sfx.fail.play()
            e('#id-audio-music').pause()
            e('.now-playing').classList.remove('visible')
        }
    }
    
    explode() {
        game.explosions.push(new Explosion(this.x, this.y))
        setInterval(() => {
            this.state = -1
        }, 400)
    }
}