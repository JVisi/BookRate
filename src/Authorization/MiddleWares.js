const isLoggedIn=(req,res,next)=>{
    
    console.log("Gamma is alive")
    console.log(req.user)
    if(req.user){
        console.log(req.user)
        next();
    }
    else{
        res.sendStatus(401)
    }
}
module.exports={
    isLoggedIn
}