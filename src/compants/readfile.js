const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require('path');
let json;

// 初始化 启动服务先拿一次数据
init();
// 解决跨域问题
app.all('/*', function (req, res, next) {
    //设为指定的域
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// get获取数据
app.get('/api/getGameJson',bodyParser.json(),function (req, res){
    res.json(json);
    // 第一版访问量低， 未做优化， 所以每次有人访问都会重新遍历一次文件信息
    init(); 
})
//  监控18888 端口
app.listen('18888',function(){
})

function init(){
    json = {
        "urlData":[]
    };
    // 解析需要遍历的文件夹，我这以 /var/www/html/game/ 目录为例
    const filePath = path.resolve('/');
    // 调用文件遍历方法 
    fileDisplay(filePath);
}

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath){
    // 根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            // 遍历读取到的文件列表
            files.forEach(function(filename){
                // 获取当前文件的绝对路径
                var filedir = path.join(filePath,filename);
                // 根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror,stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile(); // 是文件
                        var isDir = stats.isDirectory();// 是文件夹
                        if(isFile){
                           // 看是否含有 index.html 
                            if(filedir.includes('/index.html')){
                            	// 含有的话 就把信息push 到数组内。
                                fs.readFile(filedir,(error, data) => {
                                    if(error){
                                        console.log('获取信息失败');
                                    }else{
                                        json.urlData.push(
                                            {
                                            	// url 路径
                                                "url": filedir.split('/html/')[1],
                                                // index.html  <title> 标签内的文本
                                                "title": data.toString().split('<title>')[1].split('</title>')[0],
                                                // 文件的修改时间
                                                "update": new Date(fs.statSync(filedir).mtimeMs).toLocaleString(),
                                                // 文件下资源目录的指定图片  （也可通过url 来读取 ）
                                                "gameImg": filedir.split('/html/')[1].split('/index.html')[0] + '/resource/assets/index.png'
                                            }
                                        );
                                    }
                                });
                            }
                        }
                        if(isDir){
                            fileDisplay(filedir); // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}