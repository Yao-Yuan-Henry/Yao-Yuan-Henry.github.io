const bindEventDrag = () => {
    window.addEventListener('dragstart', (event) => {
        let self = event.target
        log('event, event.target', event, self)
        if (self.classList.contains("draggable")) {
            event.dataTransfer.setData('text', self.id)
            self.style.opacity = "0.5"
            
            let sound = e('#id-sfx-up')
            sound.play()
        }
    })
    
    window.addEventListener('dragend', (event) => {
        let self = event.target
        log('event, event.target', event, self)
        if (self.classList.contains("draggable")) {
            self.style.opacity = "1"

            let sound = e('#id-sfx-down')
            sound.play()
        }
    })
}

const moveCard = (leftZone, source, dropZone) => {
    leftZone.classList.add("droppable")
    dropZone.appendChild(source)
    dropZone.classList.remove("droppable")
    if (leftZone.classList.contains("back")) {
        leftZone.classList.remove("back")
        leftZone.classList.add("draggable")
        leftZone.draggable = "true"
    }
}

const bindEventDrop = () => {
    window.addEventListener('dragover', (event) => {
        event.preventDefault()
    })
    window.addEventListener('drop', (event) => {
        // leftZone 为 source 离开的区域
        // source 为拖动的牌/牌组
        // dropZone 为可进入的区域
        let dropZone = event.target
        let sourceId = event.dataTransfer.getData('text')
        let source = e('#'+ sourceId)
        let leftZone = source.parentElement
        
        if (dropZone.classList.contains('droppable')) {
            event.preventDefault()
            
            // 拖入下方各列的情况
            if (dropZone.classList.contains('column') && sourceId.slice(-2) === '13') {
                // 将 K 牌拖入空列
                moveCard(leftZone, source, dropZone)
                source.classList.add('on-col')
            } else if (dropZone.classList.contains('on-col')) {
                // 将牌堆拖入非空列，取牌色与数字
                let dropSuit = dropZone.id.slice(-3)[0]
                let dropNum = Number(dropZone.id.slice(-2))
                let sourceSuit = sourceId.slice(-3)[0]
                let sourceNum = Number(sourceId.slice(-2))
                // 判断牌色（suit）是否匹配
                let case1 = (sourceSuit === 'd' || sourceSuit === 'h') && (dropSuit === 'c' || dropSuit === 's')
                let case2 = (sourceSuit === 'c' || sourceSuit === 's') && (dropSuit === 'd' || dropSuit === 'h')
                let suit = case1 || case2
                
                if (suit && dropNum === sourceNum + 1) {
                    // 牌色匹配，且数字相连
                    moveCard(leftZone, source, dropZone)
                    source.classList.add('on-col')
                }
            }
            
            // 拖入上方各槽的情况（用 singleCard 保证拖入的只能是单牌）
            let singleCard = source.firstElementChild === null
            if (dropZone.classList.contains('slot') && sourceId.slice(-2) === '01' && singleCard) {
                // 将 A 牌拖入空槽
                moveCard(leftZone, source, dropZone)
                source.classList.add('on-slot')
            } else if (dropZone.classList.contains('on-slot') && singleCard) {
                // 将牌堆拖入非空槽，取牌色与数字
                let dropSuit = dropZone.id.slice(-3)[0]
                let dropNum = Number(dropZone.id.slice(-2))
                let sourceSuit = sourceId.slice(-3)[0]
                let sourceNum = Number(sourceId.slice(-2))
                
                if (dropSuit === sourceSuit && dropNum === sourceNum - 1) {
                    // 牌色相同，且数字相连
                    moveCard(leftZone, source, dropZone)
                    source.classList.add('on-slot')
                }
            }
        
        }
    })
}

const bindDragAndDrop = () => {
    bindEventDrag()
    bindEventDrop()
}