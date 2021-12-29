
const request =require('request');
var yes=0;
console.time('time'); 
for(let i=0;i<=10000;i++){
    request('http://10.101.5.21:5200/api/mv',function(err, res,body){
    if(body){
        yes++;
        console.log(yes);
    }
    if(i==10000){
        console.timeEnd('time');
    }
})

}
// time: 1:01.933 (m:ss.mmm)