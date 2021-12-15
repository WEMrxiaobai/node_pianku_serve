
const fs = require('fs');
var count = 0;
//日志输出
function log(...msg) {
    count++;
    let logText = '';
    let time = timeSc();
    logText = count + "." + time + ":  " + msg + "\r\n";

    fs.appendFile('test.log', logText, "utf8", function (err) {
        if (err) {
            throw new Error("追加数据失败");
        } else {
            console.log(logText,"LOG", time);
        }
    });
}

//时间转换
function timeSc(time = +new Date()) {
    var date = new Date(time + 8 * 3600 * 1000); // 增加8小时
    return date.toJSON().substr(0, 19).replace('T', ' ');
}
module.exports ={
    log,timeSc
}