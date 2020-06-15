const drawStar = (canvas, star) => {
    let ctx = canvas.getContext('2d')
    let height = canvas.height
    let width = canvas.width
    let positions = star.pBuffer
    
    for (let i = 0; i < positions.length; i++) {
        let x = positions[i].x * scale + width / 2
        let y = positions[i].y * scale + height / 2
        let transparency
        let circleScaleFactor
        let scaleFactor = i / positions.length
        
        if (i === positions.length - 1) {
            transparency = 1
            circleScaleFactor = 1
        } else {
            transparency = scaleFactor / 2
            circleScaleFactor = scaleFactor
        }
        
        ctx.beginPath()
        ctx.shadowColor = 'white'
        ctx.shadowBlur = 15
        ctx.arc(
            x,
            y,
            circleScaleFactor * (star.r) * radius,
            0,
            2 * Math.PI
        )
        ctx.fillStyle = `rgb(` + `${star.color}` +` ${transparency})`
        ctx.fill()
        
    }
    
    let x = star.x * scale + width / 2
    let y = star.y * scale + height / 2
    if (star.name) {
        ctx.font = "14px Arial"
        ctx.fillStyle = "white"
        ctx.shadowColor = 'black'
        ctx.fillText(star.name, x + 12, y + 4)
    }
}

const drawStars = (canvas, system) => {
    let stars = system.stars
    for (let star of stars) {
        drawStar(canvas, star)
    }
}