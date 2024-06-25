const jwt = require('jsonwebtoken');
const jwtsecret = "KingServent"

const fetcUser=(req,res,next)=>{
    const token=(req.header('auth-token'))
    if(!token){
        res.status(401).send({error:"Inavlid Token"})
    }
    try{
      
        const data=jwt.verify(token,jwtsecret);
        req.user=data.user;
        next();
    }catch(error){
        res.status(401).send({error:"Inavlid Token"})
    }

}

module.exports=fetcUser;

