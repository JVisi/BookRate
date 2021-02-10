const passport = require('passport');
const { isLoggedIn, isAlreadyLoggedIn, isFormatGood } = require('../Authorization/MiddleWares');
const router=require('express').Router()
const queries=require('../DB/Queries')


router.get("/",(req,res)=>{
    res.send("Hello world")
})

router.get('/auth/google',isAlreadyLoggedIn,
  passport.authenticate('google', { scope: ['profile','email'] }));


router.post("/auth/register", [isAlreadyLoggedIn, isFormatGood],(req,res)=>{
  console.log(req)
  queries.register(req.body.user.email,req.body.user.name,req.body.user.password).then((result)=>{
    res.json({"user":{"email":result.email,"name":result.name}})
  },(error)=>{
    console.log(error)
    res.json({"msg":error})
  })
})
router.post("/auth/login",isAlreadyLoggedIn,(req,res)=>{
  queries.login(req.body.user.email,req.body.user.password).then((result)=>{
    res.json({"user":{"email":result.email,"name":result.name}})
  },(error)=>{
    console.log(error)
    res.json({"msg":error})
  })
})

router.get('/auth/google/callback', 
  passport.authenticate('google',{ failureRedirect: '/' }),
  function(req, res) {
    console.log("Beta is alive")
    res.json({"email":req.user.email, "name":req.user.name})
  });
router.get("/logout",(req,res)=>{
    req.session=null
    req.logout()
    res.json({"msg":"Logged out"})
})
module.exports=router