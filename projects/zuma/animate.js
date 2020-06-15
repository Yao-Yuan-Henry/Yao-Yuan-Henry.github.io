const animate = () => {
    let canvas = e('#id-canvas')
    let ctx = canvas.getContext('2d')
    let width = canvas.width
    let height = canvas.height
    let images = game.images
    
    // 清屏
    ctx.clearRect(0, 0, width, height)
    // 清理内存数组
    game.clearDeadBalls()
    game.clearExploded()
    // draw
    game.rail.collideOnRail()
    game.mouth.draw(ctx, images)
    for (let ball of game.balls) {
        ball.update(canvas, game.rail, game.shooter)
        ball.die(canvas, game.rail)
        if (ball.state === 2) {
            ball.ifCollide(game.rail)
        }
        ball.draw(ctx, images, game.rail)
    }
    game.shooter.draw(ctx, images)
    for (let exp of game.explosions) {
        exp.draw(ctx, images)
    }
    
    if (!game.beforeStarted && game.rail.balls.length === 0) {
        // Game Over
        game.beforeStarted = true
        let music = e('#id-audio-music')
        music.pause()
        e('.now-playing').classList.remove('visible')
        music.currentTime = 0
        if (game.lose === false) {
            game.sfx.win.play()
        } else {
            game.lose = false
        }
        game.mouth.opened = false
    }
    
    requestAnimationFrame(animate)
}