//middleware creation --> auth user call or open call
//step 1

const jwt = require('jsonwebtoken');
const SECRET_KEY = "9d1758659c3a6136814b4a78d9ee5eaedfa4308c507d9e3cb330be0331f1ec50";

const authVerify = (req,res,next)=>{
    const token  = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if(token){
        jwt.verify(token,SECRET_KEY,(err,user)=>{
            if(err){
                return res.status(403).json({status:"Invalid Token",message:"Forbidden"});
            }
            // req.user = user;
            next();
        })
    }else{
        return res.status(401).json({status:"Token not exist",message:"Unauthorized"});
    } 
}

module.exports = authVerify;