const querystring = require('querystring')
const handleRoute = require('./src/routes/router')
const qs = require('qs');
const { getImages } =require('./src/model/UrlImages')
// 处理 POST 数据
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        // console.log("req.method:",req.method);
        if (req.method !== 'POST') {
            // console.log("POST:");
            resolve({});
            return;
        }
        if (req.headers['content-type'] !== 'application/json' && req.headers['content-type'] !=='application/x-www-form-urlencoded') {
            // console.log(req.headers);   //小写！
            resolve({});
            return;
        }
        let postDate = '';
        req.on('data', chunk => {
            postDate += chunk.toString(); //拼接二进制数据转为字符串

        })
        req.on('end', () => {
            if (!postDate) {
                resolve({});
                return;
            }
            if(req.headers['content-type'] =='application/x-www-form-urlencoded'){
                console.log("from:",qs.parse(postDate));
                resolve(qs.parse(postDate));
                return;
            }
            resolve(JSON.parse(postDate));
        })

    });
    return promise
}
 //设置响应格式
const serverHandler = (req, res) => {
    //配置请求的域名，*代表任意
    res.setHeader("Access-Control-Allow-Origin", "*");   
    // 支持跨域请求类型
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
    //配置请求头信息，包含字符集等等 
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    // console.log("请求:",req.headers);
    
    const url = req.url
    req.path = url.split("?")[0];

    req.query = querystring.parse(url.split('?')[1]);
    
    //处理post数据
    getPostData(req).then((postDate) => {
        // console.log("获取post内容:",postDate);
        req.body = postDate;

        //路由功能 给路由传参  
        const routeDataPromise = handleRoute(req, res);
        if (routeDataPromise) {
            routeDataPromise.then((routeData)=>{ 
                if(Buffer.isBuffer(routeData)){
                    res.end(routeData); //返回数据
                }else{
                    res.end(JSON.stringify(routeData)); //返回数据
                }
            })
            return;
        }
        
        res.writeHead(404, { 'Content-Type': 'text/plain' });//404
        res.write('404 Not Found');
        res.end();
    })

}

module.exports = serverHandler;