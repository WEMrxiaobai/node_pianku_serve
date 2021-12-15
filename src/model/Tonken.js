const jwt = require('jsonwebtoken')
const {secretKey,DesTime} =require('../config/config')
const { log } =require('../model/Log')
//生成token   uid用户  scope 等级
function generateToken(uid, scope) {
    const token=jwt.sign(
        {uid,scope},
        secretKey,
        {expiresIn:DesTime}
    )
    // log("uid:"+uid,"scope:",scope,"token:",token)
    return token    
}
//验证token
function verifyToken(token){
    try{
        return jwt.verify(token,secretKey)
    }catch(e){
        return false
    }
}
// console.log("token:",generateToken("4564654",5));
// { uid: '4564654', scope: 5, iat: 1639551670, exp: 1639638070 } 
// iat 加密时间   exp 到期时间
// console.log(verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI0NTY0NjU0Iiwic2NvcGUiOjUsImlhdCI6MTYzOTU1MTcxOCwiZXhwIjoxNjM5NjM4MTE4fQ.VENRZD5Z4ej1fJRYnF6Zjt-8zRu04txmtGbFX1feC88"));
module.exports = {
    generateToken,verifyToken
}