const passport = require('passport');
const params=require('../params.json')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User =require('../DB/Entities/User')
const {generateId}=require('../functions')

passport.serializeUser(function(user, done) {
     done(null, user.dataValues.id);
  });
  
passport.deserializeUser(function(userId, done) {
    
    //console.log("Delta is alive")
    //console.log("Das userid:" ,userId)
    User.findOne({where:{id:userId}}).then((user)=>{
        console.log(user)
        return done(null,user)
    },(err)=>{
        console.log("faszomerrrro")
        return done(err,null)
    })
  });


passport.use(new GoogleStrategy({
        clientID: params.googleAuth.token,
        clientSecret: params.googleAuth.secret,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(token, tokenSecret, profile, done) {
        User.findOne({where:{googleId:profile.id}}).then((result)=>{
            if(result===null){
              //console.log("I'm null")
              
                User.create({id:generateId(),googleId:profile.id,email:profile.emails[0].value,name:profile.displayName,password:null}).then((user)=>{
                    return done(null,user)
                },(error)=>{
                    return done("Email address already has a registered account",null)
                })
            }
            else if(result!=null){
                console.log("Epsylon is alive")
                return done(null,result)
            }else{
                return done("unexcepted error",null)
            }
      },(err)=>{
          //DB error
          return done("err",null)
      })
    }
));