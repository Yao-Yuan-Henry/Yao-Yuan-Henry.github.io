const bindPlay = function() {
    let playButton = e('.button-play')
    let nowPlaying = e('.now-playing')
    bindEvent(playButton, 'click', function() {
        log('play')
        nowPlaying.classList.add('visible')
        let a = e('#id-audio-music')
        if (a.currentTime < 12) {
            // 跳过前奏
            a.currentTime = 12
        }
        // 添加播放功能
        a.play()
        // 同时有开始游戏及解除暂停的功能
        if (game.beforeStarted) {
            game.makeBalls(100, 0.5)
            game.beforeStarted = false
        }
        if (game.paused) {
            game.paused = false
            let balls = game.rail.balls
            let ball = balls[balls.length - 1]
            ball.v = game.rail.speed
        }
    })
}
const bindPause = function() {
    let playButton = e('.button-pause')
    let nowPlaying = e('.now-playing')
    bindEvent(playButton, 'click', function() {
        log('pause')
        nowPlaying.classList.remove('visible')
        let a = e('#id-audio-music')
        // 添加暂停功能
        a.pause()
        // 同时有「伪」暂停游戏的功能
        if (!game.paused) {
            game.paused = true
            for (let ball of game.rail.balls) {
                ball.v = 0
            }
        }
    })
}

const bindEnded = () => {
    let a = e('#id-audio-music')
    bindEvent(a, 'ended', (event) => {
        a.currentTime = 0
        a.play()
    })
}

const bindMusicPlayer = function() {
    bindPlay()
    bindPause()
    bindEnded()
}