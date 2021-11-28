// 返回用户ip 信息 环境
function ClientIP(req) {
    let requestIp = require('request-ip');
    let IP = requestIp.getClientIp(req);
    console.log("客户端ip:", IP);
    
}

module.exports = {ClientIP}