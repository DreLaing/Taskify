const jwt = require('jsonwebtoken')

module.exports = auth = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.JWT_SIGN)
        next()
    }
    catch(error){
        res.json('Unauthorized')
    }
}