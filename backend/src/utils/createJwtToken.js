const jwt = require('jsonwebtoken');

exports.createToken = (id) => {

    return jwt.sign({id:id},process.env.TOKEN_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
}