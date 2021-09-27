const passport = require('passport');
//const params=require('../params.json')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local')
const User =require('../DB/Entities/User')
const {generateId}=require('../functions')
const queries=require('../DB/Queries')

passport.serializeUser(function(user, done) {
    console.log(user)
     done(null, user.id);
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
        clientID: process.env.GOOGLE_TOKEN,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.CALLBACK_URL
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

passport.use('local',new LocalStrategy({
    usernameField:"user[email]",
    passwordField:"user[password]"
},
    function(username, password, done) {
        queries.login(username,password).then((result)=>{
            return done(null,result)
        },(err)=>{
            console.log(err)
            return done(null,null,{"error":err})
        })
    }
));
