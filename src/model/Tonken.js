const jwt = require('jsonwebtoken')
const {secretKey,DesTime} =require('../config/config')

 function generateToken(uid, scope) {
    console.log("uid:",uid,"scope:",scope);
    const token=jwt.sign(
        {uid,scope},
        secretKey,
        {expiresIn:DesTime}
    )
        
    return token
}

// console.log("token:",generateToken("4564654",5));
module.exports = {
    generateToken
}