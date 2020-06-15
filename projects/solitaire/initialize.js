
const orderedDeck = () => {
    let deck = []
    let suits = ['c', 'd', 'h', 's']
    for (let suit of suits) {
        for (let i = 1; i < 14; i++) {
            if (i < 10) {
                deck.push(`${suit}0${String(i)}`)
            } else {
                deck.push(`${suit}${String(i)}`)
            }
        }
    }
    return deck
}

const shuffleArray = (array) => {
    // 用 Fisher-Yates 算法打乱数组
    let arr = array
    let random
    for (let i = arr.length - 1; i > 0; i--) {
        let random = Math.floor(Math.random() * i)
        let c = arr[random]
        arr[random] = arr[i]
        arr[i] = c
    }
    return arr
}

const makePile = (deck) => {
    let d = deck.slice(0)
    let pile = e('.pile')
    pile.innerHTML = ''
    for (let i = 0; i < d.length; i++) {
        pile.innerHTML = `<card id="id-card-${d[i]}" class="back on-pile clickable" draggable="false"></card>`
        pile = e(`#id-card-${d[i]}`)
    }
}

const deliverToCol = (col, card, covered) => {
    // 选定发牌目标
    let target = e(`#id-col-${col}`)
    while (target.firstElementChild !== null) {
        target = target.firstElementChild
    }
    if (covered) {
        card.classList.remove('on-pile', 'clickable')
        card.classList.add('on-col')
        target.appendChild(card)
    } else {
        card.classList.remove('on-pile', 'back', 'clickable')
        card.classList.add('on-col', 'draggable', 'droppable')
        card.draggable = 'true'
        target.appendChild(card)
    }
}
const initializeCols = (deck) => {
    let d = deck.slice(0)
    for (let i = 0; i < 7; i++) {
        for (let j = i; j < 7; j++) {
            let id = d.pop()
            let card = e(`#id-card-${id}`)
            if (j === i) {
                // 翻开到 col-j
                deliverToCol(j, card, false)
            } else {
                // 盖放到 col-j
                deliverToCol(j, card, true)
            }
        }
    }
    return d
}

const loadPics = (images, deck) => {
    let loads = 0
    let names = Object.keys(images)
    for (let name of names) {
        let img = new Image()
        img.src = images[name]
        img.dataset.id = name
        img.onload = () => {
            loads += 1
            // 所有图片都载入成功之后
            if (loads === names.length) {
                // 移除 .loading 元素
                let loading = e('.loading')
                loading.style.opacity = '0'
                setTimeout(() => {
                    loading.remove()
                }, 1000)
                setTimeout(() =>{
                    initializeCols(deck)
                }, 1000)
            }
        }
    }
}

const initialize = () => {
    let deck = orderedDeck()
    deck = shuffleArray(deck)
    makePile(deck)
    // 图片资源目录
    let images = {
        background: "Table/table_background.jpg",
        back: "Cards/00.png",
    }
    let patterns = ['c', 'd', 'h', 's']
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 14; j++) {
            let str
            if (j < 10) {
                str = patterns[i] + '0' + String(j)
            } else {
                str = patterns[i] + String(j)
            }
            images[str] = 'Cards/' + str + '.png'
        }
    }
    loadPics(images, deck)
}
