

const isLoggedIn=(req,res,next)=>{
    
    console.log(req.user)
    if(req.user){
        console.log(req.user)
        next();
    }
    else{
        res.sendStatus(401)
    }
}
const isAlreadyLoggedIn=(req,res,next)=>{
    console.log(req.user)
    if(req.user){
        console.log(req.user)
        res.status(403).send({"message":"Already Logged in"})
    }
    else{
        next();
    }
}
const isFormatGood=(req,res,next)=>{
    if(req.body.user!==null){
        let user=req.body.user
        if(user.email!="" && user.name.length>=3 && user.password.length>=3){
            next()
        }
        else{
            res.sendStatus(400)
        }
    }
    else{
        res.sendStatus(400)
    }
}
module.exports={
    isLoggedIn,
    isAlreadyLoggedIn,
    isFormatGood
}