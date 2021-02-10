const User = require("./Entities/User")
const {generateId, encrypt,compare}=require('../functions')

const register=(email,name,password)=>{
    return new Promise((resolve,reject)=>{
        encrypt(password).then((encrypted)=>{
            User.create({id:generateId(),googleId:null,email:email,name:name,password:encrypted}).then((user)=>{
                resolve(user)
            },(error)=>{
                console.log(error)
                reject("Email address already has a registered account")
            })
        })
    })
}
const login=(email,password)=>new Promise((resolve,reject)=>{
    User.findOne({where:{email:email}}).then((result)=>{
        
        console.log(result.dataValues);
        if(result===null){
            reject("No such email registered")
        }
        else{
           let user=result.dataValues
           if(user.googleId!==null){
               reject("This account is registered with google")
           }
           else{
               compare(password,user.password).then((result)=>{
                   if(result){
                       resolve(user)
                   }
                   else{
                       reject("Bad password for user")
                   }
               })
           }
        }
    })
})

module.exports={
    register,
    login
}