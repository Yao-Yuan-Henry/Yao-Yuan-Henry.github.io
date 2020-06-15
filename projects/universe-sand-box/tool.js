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
// 深拷贝数据并返回
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