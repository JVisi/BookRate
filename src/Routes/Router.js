const passport = require('passport');
const { isLoggedIn, isAlreadyLoggedIn, isFormatGood,addBook } = require('../Authorization/MiddleWares');
const router=require('express').Router()
const queries=require('../DB/Queries')


router.get("/",(req,res)=>{
    res.send("Hello world")
})


router.post("/auth/register", [isAlreadyLoggedIn, isFormatGood],(req,res)=>{
  queries.register(req.body.user.email,req.body.user.name,req.body.user.password).then((result)=>{
    res.json({"user":{"email":result.email,"name":result.name}})    //Client gets back the json, and has to make a login request
  },(error)=>{
    console.log(error)
    res.json({"error":error})
  })
})

router.post('/auth/login',isAlreadyLoggedIn, function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(500).send(); }
    if (!user) { return res.json(info); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json({"user":{"email":user.email, "name":user.name}});
    });
  })(req, res, next);
});


router.get('/auth/google',isAlreadyLoggedIn,
passport.authenticate('google', { scope: ['profile','email'] })
);

router.get('/auth/google/callback', 
  passport.authenticate('google',{failureFlash: true }),
  function(req, res) {
    res.json({"user":{"email":req.user.email, "name":req.user.name}})
  });
router.get("/logout",isLoggedIn,(req,res)=>{
    req.session=null
    req.logout()
    res.json({"message":"Logged out"})
})
router.post('/addBook',[isLoggedIn,addBook],(req,res)=>{
  terminateFunction(res,queries.addBook(req.body.book))
})

router.post('/searchBook',(req,res)=>{                          //no need to be logged in, hence no isLoggedIn
  terminateFunction(res,queries.searchBook(req.body.keyWord))
})
router.get('/getAllBooks',(req,res)=>{                          //no need to be logged in, hence no isLoggedIn
  terminateFunction(res,queries.getAllBooks())       //we may wanna give a range option in the future
})

router.post("/rateBook",isLoggedIn,(req,res)=>{
  terminateFunction(res,queries.rateBook(req.user.id,req.body.ISBN,req.body.rate))
})
router.get("/rates",[isLoggedIn],(req,res)=>{
  terminateFunction(res,queries.getRatesOfUser(req.user.id))
})

const terminateFunction=(res,func)=>{       //function to terminate simple functions, where we send back the whole result from the query
  func.then((result)=>{
    res.json(result)
  },(err)=>{
    res.json({"error":err})
  })
}
module.exports=router