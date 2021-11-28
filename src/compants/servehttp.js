const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {

    const method = req.method  //请求方法
    const url = req.url  //get地址
    const path = url.split('?')[0]  //路径
    const query = querystring.parse(url.split("?")[1])

    const responseData = {
        method,
        url,
        path,
        query
    }
    res.setHeader('Content-Type', 'application/json');

    if(method==='GET'){
        res.end(JSON.stringify(responseData))
    }
    if(method==='POST'){
       let postData=''
       req.on('data',chunk=>{
        postData +=chunk.toString()
       }) 
       req.on('end',()=>{
           responseData.postData=JSON.parse(postData);
           console.log(responseData);
           res.end(JSON.stringify(responseData))
       })
    }
})
    let port = 5001
    server.listen(port, () => {
        console.log("服务器启动port:", port);
    })