const { rejects } = require('assert')
const querystring = require('querystring')
const handleRoute = require('./src/routes/router')


// 处理 POST 数据
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({});
            return;
        }
        if (req.headers['content-type'] !== 'application/json') {
            // console.log(req.headers);
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
            resolve(JSON.parse(postDate));
        })

    });
    return promise
}

const serverHandler = (req, res) => {
    //设置响应格式
    res.setHeader('Content-Type', 'application/json');
    // console.log("请求:",req.headers);
    const url = req.url
    req.path = url.split("?")[0];

    req.query = querystring.parse(url.split('?')[1]);

    //处理post数据
    getPostData(req).then((postDate) => {
        // console.log("获取post内容",postDate);
        req.body = postDate;

        //路由功能
        const routeData = handleRoute(req, res);
        if (routeData) {
            res.end(JSON.stringify(routeData));
            return;
        }
        //404
        
        res.writeHead(404, { 'COntent-Type': 'text/plain' });
        res.write('404 Not Found');
        res.end();
    })

}

module.exports = serverHandler;