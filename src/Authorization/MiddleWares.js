

const isLoggedIn=(req,res,next)=>{          //when user wants to do something that they need to be logged in for

    if(req.user){
        console.log(req.user)
        next();
    }
    else{
        res.sendStatus(401)
    }
}
const isAlreadyLoggedIn=(req,res,next)=>{   //when user wants to log in/register but an account is already logged in
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
const addBook=(req,res,next)=>{
    if(req.body.book!==null){
        let book=req.body.book
        if(book.ISBN ===null || book.name===null || book.author===null){
            res.sendStatus(400)
        }
    
        else{
            next()
        }
    }
    else{
        res.sendStatus(400)
    }
}

module.exports={
    isLoggedIn,
    isAlreadyLoggedIn,
    isFormatGood,
    addBook
}