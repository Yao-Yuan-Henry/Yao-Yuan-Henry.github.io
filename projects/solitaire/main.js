
const bindEvents = () => {
    bindDragAndDrop()
    bindClick()
}

const checkWin = () => {
    let c13 = e('#id-card-c13')
    let d13 = e('#id-card-d13')
    let h13 = e('#id-card-h13')
    let s13 = e('#id-card-s13')
    let cwin = c13.classList.contains('on-slot')
    let dwin = d13.classList.contains('on-slot')
    let hwin = h13.classList.contains('on-slot')
    let swin = s13.classList.contains('on-slot')
    if (cwin && dwin && hwin && swin) {
        c13.classList.remove('on-slot', 'draggable')
        d13.classList.remove('on-slot', 'draggable')
        h13.classList.remove('on-slot', 'draggable')
        s13.classList.remove('on-slot', 'draggable')
        let sound = e('#id-audio-music')
        let nowPlaying = e('.now-playing')
        nowPlaying.classList.remove('visible')
        sound.pause()
        sound = e('#id-sfx-win')
        sound.play()
        alert('Congratulations! You win!')
    }
}

const __main = () => {
    bindEvents()
    bindMusicPlayer()
    initialize()
    setInterval(checkWin, 500)
}

__main()