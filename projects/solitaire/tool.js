// 自定义 log 函数
const log = console.log.bind(console)
// 自定义的选择器函数
const e = (selector) => document.querySelector(selector)
const es = (selector) => document.querySelectorAll(selector)
// 预设DOM操作
const appendHtml = function(element, html) {
    element.insertAdjacentHTML("beforeend", html)
}
const bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}
const bindEventDelegate = function(element, eventName, callback, responseClass) {
    element.addEventListener(eventName, function(event) {
        let target = event.target
        if (target.classList.contains(responseClass)) {
            callback()
        }
    })
}
const appendAll = function(selector, html) {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        log('*** invalid selector, no element is selected')
    } else {
        for (let i = 0; i < elements.length; i++) {
            appendHtml(elements[i], html)
        }
    }
}
const bindAll = function(selector, eventName, callback, responseClass) {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        log('*** invalid selector, no element is selected')
    } else {
        if (responseClass === undefined) {
            for (let i = 0; i < elements.length; i++) {
                bindEvent(elements[i], eventName, callback)
            }
        } else {
            for (let i = 0; i < elements.length; i++) {
                bindEventDelegate(elements[i], eventName, callback, responseClass)
            }
        }
    }
}

const createZeroArray = function(length) {
    // 返回长度为 length 的数组，其所有元素皆为 0
    let array = []
    for (let i = 0; i < length; i++) {
        array.push(0)
    }
    return array
}

const clonedSquare = function(square) {
    let clone = []
    for (let i = 0; i < square.length; i++) {
        clone.push(square[i].slice(0))
    }
    return clone
}