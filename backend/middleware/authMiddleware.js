const jwt = require('jsonwebtoken')
//used to verify
const protect = (req, res, next)=>{
    //if auth passed move to end point
    const authHeader = req.headers['authorization']
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({message: 'No token provided'})
        //401 = unauthrized
    }
    const token = authHeader.split(' ')[1]
    //splitting "bearer <token> to get just token"
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }catch(error){
        return res.status(401).json({message: 'Invalid or expired token'})
    }
}

module.exports = {protect}