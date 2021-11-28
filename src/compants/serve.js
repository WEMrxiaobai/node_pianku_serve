const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
    // req request请求    res response响应
    const method = req.method  //请求方法
    console.log("请求方法:",method);
    const url = req.url  //get地址
    console.log("get地址:",url);
    const path=url.split('?')[0]  //路径
    console.log("路径:",path);

    if (method === "POST") {
        //流 stream  数据包完整接收后才进行下一步
        let postDate = '';
        req.on('data', chunk => {
            postDate += chunk.toString(); //拼接二进制数据转为字符串
        })
        req.on('end', () => {  //结束接受
            console.log("数据接受完毕");
            console.log("postDate:",postDate);
            res.end("over");
        })

    } else if (method === "GET") {

        req.query = querystring.parse(url.split('?')[1])
        res.end(
            JSON.stringify(req.query)
        );
    }


})
let port = 5001
server.listen(port, () => {
    console.log("服务器启动port:", port);
})