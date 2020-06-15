const deliverToOpened = (card) => {
    let target = e('.opened')
    while (target.firstElementChild !== null) {
        target = target.firstElementChild
    }
    card.classList.remove('on-pile', 'back', 'clickable')
    card.classList.add('draggable', 'droppable')
    card.draggable = 'true'
    target.appendChild(card)
}

const drawFromOpened = () => {
    let opened = e('.opened')
    while (opened.firstElementChild !== null) {
        let card = opened
        while (card.firstElementChild !== null) {
            card = card.firstElementChild
        }
        let pile = e('.pile')
        while (pile.firstElementChild !== null) {
            pile = pile.firstElementChild
        }
        card.classList.remove('draggable', 'droppable')
        card.draggble = 'false'
        card.classList.add('on-pile', 'back', 'clickable')
        pile.appendChild(card)
    }
}

const bindClick = () => {
    let upper = e('.upper')
    upper.addEventListener('click', (event) => {
        let self = event.target
        if (self.classList.contains('clickable')) {
            if (self.classList.contains('pile')) {
                let sound = e('#id-sfx-fan')
                sound.play()
                drawFromOpened()
            } else {
                let sound = e('#id-sfx-shove')
                sound.play()
                deliverToOpened(self)
            }
        }
    })
}