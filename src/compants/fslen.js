const fs =require('fs')
const os = require('os')
const path =require('path')
// 创建文件夹
// fs.mkdir('wenjian',(err)=>{
//     console.log('mkdir wenjian');
// })
// 修改文件夹
// fs.rename('./wenjian','./wen',()=>{
//     console.log('wen');
// })

// 删除文件夹  
// fs.rmdir('./wen',(err)=>{
//     console.log('del',err);
// })

// 创建文件  路径（已有的路径）  文件data  err  
// 会覆盖文件
// let txt='wenjian123 内容  \n  第二行123123'
// fs.writeFile('./wenjian/wenben.txt',txt,(err)=>{
//     console.log('done',txt,err);
// })

// // 追加文件
// fs.appendFile('./wenjian/wenben.txt','\nasdasd',(err)=>{
//     console.log('追加文件');
// })

//删除文件  
// fs.unlink('./wenjian/qwe.txt',(err)=>{
//     console.log( 'del');
// })

// 读取文件
// fs.readFile('./wenjian/wenben.txt','utf8',(err,content)=>{
//     console.log(content);
// })
// fs.readFile('./wenjian/wenben.txt',(err,content)=>{
//     console.log(content.toString());
// })
// console.log(os.cpus()); 
// console.log(os.arch());
// console.log(os.homedir()); C:\Users\xiaobai
// console.log(os.hostname());

// console.log(os.loadavg());
// console.log(os.networkInterfaces());
// console.log(os.platform());
// console.log(os.release());
// console.log(os.tmpdir());
// console.log(os.totalmem());
// console.log(os.uptime());
// console.log(os.userInfo());
// console.log(__dirname );


// console.log(__dirname+'\\'+'c41ffed27e29cb7d0af050ceddff7ec0.jpg');
// var http = require('http');

// // var fs = require('fs');

// var server = http.createServer();

// var wwwDir = `./txt.txt`;			// 所有读取文件所在的根目录

// server.on('request', (req, res) => {
	
//     fs.readFile('./c41ffed27e29cb7d0af050ceddff7ec0.jpg',(err,data)=>{
//         // console.log(data.toString());
//         res.end(data)
//     })
// })

// server.listen('3000', '127.0.0.1', () => {
//     console.log('http://localhost:3000/')
// // })

// console.log(__dirname); //当前文件父路径
// console.log(__filename);//当前文件完整路径

// console.log(path.isAbsolute('G:/phpstudy_pro/WWW/maccms/'));//true
