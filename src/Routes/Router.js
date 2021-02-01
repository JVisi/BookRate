const passport = require('passport');
const { isLoggedIn } = require('../Authorization/MiddleWares');
const router=require('express').Router()


router.get("/",(req,res)=>{
    res.send("Hello world")
})

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

router.get("/good",isLoggedIn,(req,res)=>{
    console.log(req.user)
    res.send(req.user.name.familyName)
})

router.get('/auth/google/callback', 
  passport.authenticate('google',{ failureRedirect: '/' }),
  function(req, res) {
    console.log("Beta is alive")
    res.redirect('/good');
  });
router.get("/logout",(req,res)=>{
    req.session=null
    req.logout()
    res.redirect("/")
})
module.exports=router