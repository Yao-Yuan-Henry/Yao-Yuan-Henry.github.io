const bindMouseMove = () => {
    let canvas = e('#id-canvas')
    let cW = canvas.width
    let cH = canvas.height
    bindEvent(canvas, 'mousemove', (event) => {
        window.mouseX = event.layerX
        window.mouseY = event.layerY
        let x0 = game.shooter.x
        let y0 = game.shooter.y
        let x1 = mouseX
        let y1 = mouseY
        game.shooter.angle = angleX(x0, y0, x1, y1) + 90
    })
}
const bindMouseClick = () => {
    let canvas = e('#id-canvas')
    let x0 = game.shooter.x
    let y0 = game.shooter.y
    // 发射时的初始速度
    const ballSpeed = 6
    bindEvent(canvas, 'click', (event) => {
        // 一次只能射一球
        if (game.shooter.shooting) {
            return
        }
        game.shooter.shooting = true
        game.sfx.shoot.play()
        
        let x = (mouseX - x0)
        let y = (mouseY - y0)
        let r = Math.sqrt(x * x + y * y)
        let newBall = new Ball(x0, y0, 0, 0)
        
        if (game.rail.balls.length > 0) {
            let balls = game.rail.balls
            let r = Math.floor(Math.random() * balls.length)
            newBall.type = balls[r].type
        }
        
        game.balls.push(newBall)
        game.shooter.toShoot.push(newBall)
        if (game.shooter.toShoot.length > 1) {
            game.shooter.toShoot[0].state = 1
        }
        if (game.shooter.toShoot.length > 2) {
            game.shooter.toShoot[0].state = 2
            game.shooter.toShoot[1].state = 1
            game.shooter.toShoot[0].x = x0 + x / r * 70
            game.shooter.toShoot[0].y = y0 + y / r * 70
            game.shooter.toShoot[0].vx = ballSpeed * x / r
            game.shooter.toShoot[0].vy = ballSpeed * y / r
            game.shooter.toShoot.shift()
        }
        
        setTimeout(()=> {
            game.shooter.shooting = false
        }, 450)
    })
}
const bindMouseRightClick = () => {
    let canvas = e('#id-canvas')
    bindEvent(canvas, 'contextmenu', (event) => {
        event.preventDefault()
        let newBall = new Ball(mouseX, mouseY, 0, 0)
        newBall.state = 2
        game.balls.push(newBall)
    })
}
const bindKeyup = () => {
    bindEvent(window, 'keyup', (event) => {
        if (event.key === ' ' && game.beforeStarted) {
            event.preventDefault()
            game.makeBalls(100)
            game.beforeStarted = false
        }

        if (event.key === 'p') {
            event.preventDefault()
            for (let ball of game.rail.balls) {
                if (ball.v === 0) {
                    ball.v = game.rail.speed
                } else {
                    ball.v = 0
                }
            }
        }
    })
}

const bindEvents = () => {
    bindMouseMove()
    bindMouseClick()
    // bindMouseRightClick()
    // debug: 在轨道上生成初速为 speed 的小球
    // bindKeyup()
}