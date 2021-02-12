const passport = require('passport');
const { isLoggedIn, isAlreadyLoggedIn, isFormatGood,addBook } = require('../Authorization/MiddleWares');
const router=require('express').Router()
const queries=require('../DB/Queries')


router.get("/",(req,res)=>{
    res.send("Hello world")
})
router.get("/good",isLoggedIn,(req,res)=>{
  res.json({"req":req.user})
})


router.post("/auth/register", [isAlreadyLoggedIn, isFormatGood],(req,res)=>{
  queries.register(req.body.user.email,req.body.user.name,req.body.user.password).then((result)=>{
    res.json({"user":{"email":result.email,"name":result.name}})    //Client gets back the json, and has to make a login request
  },(error)=>{
    console.log(error)
    res.json({"error":error})
  })
})

router.post('/auth/login', isAlreadyLoggedIn,
  passport.authenticate('local', { failureFlash: true, failWithError:true,failureMessage:true }),
  function(req, res) {
    res.json({"user":{"email":req.user.email, "name":req.user.name}});
  });

  router.post('/login', isAlreadyLoggedIn,function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      console.log(err,user,info)
      if (err) { return res.json(err); }
      if (!user) { 
          res.status(401);
          res.json(info);
          return;
      }else{
        res.json(user)
      }
    })(req, res, next);
  });






router.get('/auth/google',isAlreadyLoggedIn,
passport.authenticate('google', { scope: ['profile','email'] })
);

router.get('/auth/google/callback', 
  passport.authenticate('google',{failureFlash: true, failWithError:true,failureMessage:true }),
  function(req, res) {
    res.json({"user":{"email":req.user.email, "name":req.user.name}})
  });
router.get("/logout",isLoggedIn,(req,res)=>{
    req.session=null
    req.logout()
    res.json({"message":"Logged out"})
})
router.post('/addBook',[isLoggedIn,addBook],(req,res)=>{
  terminateFunction(req,res,queries.addBook(req.body.book))
})

router.post('/searchBook',(req,res)=>{                          //no need to be logged in, hence no isLoggedIn
  terminateFunction(req,res,queries.searchBook(req.body.keyWord))
})
router.get('/getAllBooks',(req,res)=>{                          //no need to be logged in, hence no isLoggedIn
  terminateFunction(req,res,queries.getAllBooks())       //we may wanna give a range option in the future
})

const terminateFunction=(req,res,func)=>{       //function to terminate simple functions, where we send back the whole result from the query
  func.then((result)=>{
    res.json(result)
  },(err)=>{
    res.json({"error":err})
  })
}
module.exports=router