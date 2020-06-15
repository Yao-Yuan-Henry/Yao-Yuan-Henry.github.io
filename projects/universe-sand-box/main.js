const createStar = (x, y, vx, vy) => {
    let list = e('#id-stars-list')
    let m = parseFloat(list.value)
    let rList = {
        "0.000003003": 4,
        "0.0009543": 6,
        "1": 12,
        "0.1": 8,
    }
    
    let newStar = {
        m: m,
        x: x,
        y: y,
        z: 0,
        vx: vx,
        vy: vy,
        vz: 0,
        pBuffer: [],
        r: rList[list.value],
        color: randomColor(),
    }
    let newStars = deepClone(system.stars)
    newStars.push(newStar)
    system.stars = newStars
}

const bindDrag = () => {
    let canvas = e('#id-canvas')
    let width = canvas.width
    let height = canvas.height
    let x, y, vx, vy
    window.dragging = false
    
    bindEvent(canvas,'mousedown', (event) => {
        window.dragging = true
        window.startX = event.clientX
        window.startY = event.clientY
        window.endX = event.clientX
        window.endY = event.clientY
        x = (event.clientX - width / 2) / scale
        y = (event.clientY - height / 2) / scale
    })
    
    bindEvent(canvas, 'mousemove', (event) => {
        if (window.dragging) {
            window.endX = event.clientX
            window.endY = event.clientY
        }
    })
    
    bindEvent(canvas,'mouseup', (event) => {
        window.dragging = false
        vx = (event.clientX - window.startX) / 35
        vy = (event.clientY - window.startY) / 35
        createStar(x, y, vx, vy)
    })
}

const bindReset = () => {
    let btn = e('#id-btn-reset')
    bindEvent(btn, 'click', (event) => {
        system.stars = deepClone(innerSolarSystem)
    })
}

const bindScaleBar = () => {
    let bar = e('#id-scale-bar')
    bindEvent(bar, 'input', (event) => {
        window.scale = event.target.value * 5
        window.radius = event.target.value / 20
    })
}

const bindEvents = () => {
    bindDrag()
    bindReset()
    bindScaleBar()
}

const __main = () => {
    initialize()
    animate()
    bindMusicPlayer()
    bindEvents()
}

__main()