const System = () => {
    let o = {}
    
    o.updatePositionBuffer = (trailLength) => {
        let stars = o.stars
        for (let s of stars) {
            let position = {
                x: s.x,
                y: s.y,
                z: s.z,
            }
            s.pBuffer.push(position)
            if (s.pBuffer.length > trailLength) {
                s.pBuffer.shift()
            }
        }
    }
    
    o.updatePosition = () => {
        let dt = o.dt
        let stars = o.stars
        for (let s of stars) {
            s.x += dt * s.vx
            s.y += dt * s.vy
            s.z += dt * s.vz
        }
    }
    
    o.updateVelocity = () => {
        let dt = o.dt
        let stars = o.stars
        for (let s of stars) {
            s.vx += dt * s.ax
            s.vy += dt * s.ay
            s.vz += dt * s.az
        }
    }
    
    o.updateAcceleration = () => {
        let stars = o.stars
        let g = o.g
        let softeningConstant = o.softeningConstant
        for (let i = 0; i < stars.length; i++) {
            let starI = stars[i]
            let ax = 0
            let ay = 0
            let az = 0
            
            for (let j = 0; j < stars.length; j++) {
                if (i !== j) {
                    let starJ = stars[j]

                    let dx = starJ.x - starI.x
                    let dy = starJ.y - starI.y
                    let dz = starJ.z - starI.z

                    let distSq = dx * dx + dy * dy + dz * dz
                    // 万有引力公式： f = g * massJ.m / dSq * (dSq + s)^1/2 
                    // softeningConstant 为避免距离为0时，引力无穷大所作的修正
                    let f = (g * starJ.m) / (distSq * Math.sqrt(distSq + softeningConstant))

                    ax += dx * f
                    ay += dy * f
                    az += dz * f
                }
            }
            starI.ax = ax
            starI.ay = ay
            starI.az = az
        }
    }
    
    return o
}