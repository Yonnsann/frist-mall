// 如果执行refresh刷新，那么函数会被执行n次(n=需要请求到的图片的数量)
// 可以把refresh函数传入到debounce（防抖）函数中，生成新的函数
export function debounce(func, delay=100) {
    let timer = null;
    return function (...args) {
        // 如果有值就取消前面的时间
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}

// 1.获取年份
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    // 2.获取具体时间
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}

function padLeftZero(str) {
    // substr截取传入的数据的长度 如：00+04=0004 0004截取2位则是04
    return ('00' + str).substr(str.length);
}

