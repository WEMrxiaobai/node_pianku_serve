const fs =require('fs');

function read(){
    return new Promise((resolve,reject)=>{
        fs.readFile("Log.js",(err,data)=>{
            if(err){
                reject(err);
            };
            resolve(data);
        });
    })
    
}
console.log("duqu");
// let a =read();
// console.log(a);


 async function main(){
    let wenjian= await read();
    console.log(wenjian.toString());
 }
 main();