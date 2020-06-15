// 自定义 log 函数
const log = console.log.bind(console)
// 自定义的选择器函数
const e = (selector) => document.querySelector(selector)
const es = (selector) => document.querySelectorAll(selector)
// 预设DOM操作
const appendHtml = (element, html) => {
    element.insertAdjacentHTML("beforeend", html)
}
const bindEvent = (element, eventName, callback) => {
    element.addEventListener(eventName, callback)
}
// 判断数据类型
const isArray = o => Array.isArray(o)
const isObject = o => Object.prototype.toString.call(o) === '[object Object]'
const isFunction = o => Object.prototype.toString.call(o) === '[object Function]'
// 判断数据是否相等
const equals = (a, b) => {
    if (isArray(a) && isArray(b)) {
        if (a.length !== b.length) {
            return false
        } else {
            for (let i = 0; i < a.length; i++) {
                if (!equals(a[i], b[i])) {
                    return false
                }
            }
            return true
        }
    } else if (isObject(a) && isObject(b)) {
        let keysA = Object.keys(a)
        let keysB = Object.keys(b)
        if (keysA.length !== keysB.length) {
            return false
        } else {
            for (let i = 0; i < keysA.length; i++) {
                if (!equals(a[keysA[i]], b[keysA[i]])) {
                    return false
                }
            }
            return true
        }
    } else {
        // 3. 否则, 直接判断 a 与 b 是否相等
        return (a === b)
    }
}
// 深拷贝（对象/数组）并返回
const deepClone = (data) => {
    if (isArray(data)) {
        let arr = data
        let result = []
        for (let element of arr) {
            result.push(deepClone(element))
        }
        return result
    } else if (isObject(data)) {
        let o = data
        let keys = Object.keys(o)
        let result = {}
        for (let key of keys) {
            result[key] = deepClone(o[key])
        }
        return result
    } else {
        return data
    }
}
// 画线(x1, y1)到（x2, y2）
const drawLine = (ctx, x1, y1, x2, y2, color='red') => {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.strokeStyle = color
    ctx.stroke()
}

const drawRay = (ctx, x1, y1, x2, y2, color='red') => {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    let x = x2 - x1
    let y = y2 - y1
    ctx.lineTo(x1 + 10 * x, y1 + 10 * y)
    ctx.strokeStyle = color
    ctx.stroke()
}

const uniqueArray = arr => Array.from(new Set(arr))