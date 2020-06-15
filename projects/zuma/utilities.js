// 将图片 image 以 (axisX, axisY) 为轴心，旋转角度 angle 后，画在 (positionX, positionY) 上
const rotateAndPaint = (ctx, image, angleInDeg , positionX, positionY, axisX, axisY) => {
    let angleInRad = angleInDeg * Math.PI / 180
    ctx.translate(positionX, positionY)
    ctx.rotate( angleInRad )
    ctx.drawImage(image,-axisX,-axisY)
    ctx.rotate( -angleInRad)
    ctx.translate( -positionX, -positionY)
}

// 求 x 轴与 (x0, y0) 到 (x1, y1) 连线的夹角
const angleX = (x0, y0, x1, y1) => {

    let x = x1 - x0
    let y = y1 - y0
    return (Math.atan2(y, x) / Math.PI * 180)
}

// 使 (x, y) 与 (x0, y0) 保持距离 r 返回 [x1, y1]
const keepDistance = (x, y, x0, y0, r) => {
    let dx = x - x0
    let dy = y - y0
    let dr = Math.sqrt(dx * dx + dy * dy)
    let x1 = x0 + dx * r / dr
    let y1 = y0 + dy * r / dr
    return [x1, y1]
}