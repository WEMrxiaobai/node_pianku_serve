const jwt = require('jsonwebtoken')
const {secretKey,DesTime} =require('../config/config')
const { log } =require('../model/Log')
 
function generateToken(uid, scope) {
    const token=jwt.sign(
        {uid,scope},
        secretKey,
        {expiresIn:DesTime}
    )
    log("uid:"+uid,"scope:",scope,"token:",token)
    return token    
}

console.log("token:",generateToken("4564654",5));
module.exports = {
    generateToken
}