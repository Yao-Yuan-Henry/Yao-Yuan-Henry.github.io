const loadPics = (images) => {
    let loads = 0
    let names = Object.keys(images)
    for (let name of names) {
        let img = new Image()
        img.src = images[name]
        img.dataset.id = name
        img.onload = () => {
            loads += 1
            game.images[img.dataset.id] = img
            // 所有图片都载入成功之后，调用 animate
            if (loads === names.length) {
                animate()
                // 移除 .loading 元素
                let loading = e('.loading')
                loading.style.opacity = '0'
                setTimeout(() => {
                    loading.remove()
                }, 1000)
            }
        }
    }
}

const initialize = () => {
    // 初始化画布
    let canvas = e('#id-canvas')
    canvas.width = 800
    canvas.height = 600
    let [width, height] = [canvas.width, canvas.height]
    let [cX, cY] = [width / 2, height / 2]
    // 声明 game
    window.game = new Game()
    game.shooter = new Shooter(cX + 10, cY + 60)
    game.rail = new Rail()
    game.mouth = new Mouth()
    // 音效目录
    game.sfx = {
        clearFlag: true,
        clear: e("#id-sfx-clear"),
        clear2: e("#id-sfx-clear2"),
        collide: e("#id-sfx-collide"),
        collideOnRail: e("#id-sfx-collide-on-rail"),
        fail: e('#id-sfx-fail'),
        makeBalls: e('#id-sfx-make-balls'),
        shoot: e('#id-sfx-shoot'),
        win: e('#id-sfx-win'),
    }
    // 图片资源目录
    let images = {
        shooter0: 'Pics/shooter0.png',
        shooter1: 'Pics/shooter1.png',
        mouth0: 'Pics/mouth0.png',
        mouth1: 'Pics/mouth1.png',
        e0: 'Pics/e0.png',
        e1: 'Pics/e1.png',
        e2: 'Pics/e2.png',
        e3: 'Pics/e3.png',
        e4: 'Pics/e4.png',
        e5: 'Pics/e5.png',
        e6: 'Pics/e6.png',
        e7: 'Pics/e7.png',
        e8: 'Pics/e8.png',
        e9: 'Pics/e9.png',
    }
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 10; j++) {
            let str = 'b' + String(i) + String(j)
            images[str] = 'Pics/' + str + '.png'
        }
    }
    // 载入所有图片后开始刷新画布
    loadPics(images)
}