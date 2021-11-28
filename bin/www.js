// 创建服务器
const http =require('http');

const serverHandler=require('../app');

const PORT=5000;

const server=http.createServer(serverHandler)

server.listen(PORT,()=>{
    console.log("server开启,端口号：",PORT);
})

function getIPAdress() {
    var interfaces = require('os').networkInterfaces();　　
    for (var devName in interfaces) {　　　　
        var iface = interfaces[devName];　　　　　　
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }　　
    }
}
console.log("本机ip地址",getIPAdress());
let diZhi="http://"+getIPAdress()+":"+PORT;
console.log("访问:",diZhi);
