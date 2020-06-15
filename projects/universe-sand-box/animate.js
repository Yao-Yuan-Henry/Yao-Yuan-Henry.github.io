const animate = () => {
    let canvas = e('#id-canvas')
    let ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    let width = canvas.width
    let height = canvas.height
    
    system.updateAcceleration()
    system.updateVelocity()
    system.updatePosition()
    system.updatePositionBuffer(window.trailLength)
    
    ctx.clearRect(0, 0, width, height)
    drawStars(canvas, system)

    // 画拖曳线
    if (window.dragging) {
        ctx.beginPath()
        ctx.moveTo(window.startX, window.startY)
        ctx.lineTo(window.endX, window.endY)
        ctx.strokeStyle = "gold"
        ctx.stroke()
    }
    
    // 防出框
    for (let star of system.stars) {
        let x = star.x * scale + width / 2
        let y = star.y * scale + height / 2
        if (x < star.r || x > width - star.r) {
            star.vx *= -1
            setTimeout(() => {
                star.vx *= 0.75
                star.vy *= 0.75
                star.vz *= 0.75
            }, 200)
        }
        if (y < star.r || y > height - star.r) {
            star.vy *= -1
            setTimeout(() => {
                star.vx *= 0.75
                star.vy *= 0.75
                star.vz *= 0.75
            }, 200)
        }
    }
    
    requestAnimationFrame(animate)
}