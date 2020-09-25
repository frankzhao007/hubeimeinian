//深拷贝
export const deepcopy = function (source) {
    if (!source) {
        return source;
    }
    let sourceCopy = source instanceof Array ? [] : {};
    for (let item in source) {
        sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item];
    }
    return sourceCopy;

}
//日期格式化
export const dateFormat = function (source, ignore_minute) {
    var myDate;
    var separate = '-';
    var minute = '';
    if (source === void (0)) {
        source = new Date();
    }
    if (source) {
        if (source.split) {
            source = source.replace(/\-/g, '/');
        } else if (isNaN(parseInt(source))) {
            source = source.toString().replace(/\-/g, '/');
        } else {
            source = new Date(source);
        }

        if (new Date(source) && (new Date(source)).getDate) {
            myDate = new Date(source);
            if (!ignore_minute) {
                minute = (myDate.getHours() < 10 ? " 0" : " ") + myDate.getHours() + ":" + (myDate.getMinutes() < 10 ? "0" : "") + myDate.getMinutes();
            }
            return myDate.getFullYear() + separate + (myDate.getMonth() + 1 < 10 ? " 0" : " ") + (myDate.getMonth() + 1) + separate + (myDate.getDate() < 10 ? '0' : '') + myDate.getDate() + minute;
        } else {
            return source.slice(0, 16);
        }
    } else {
        return source
    }
};