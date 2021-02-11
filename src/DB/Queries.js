const User = require("./Entities/User")
const Book = require("./Entities/Book")
const {generateId, encrypt,compare}=require('../functions')
const { Op } = require("sequelize")

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
    },(error)=>{
        reject(error)
    })
})

const getAllBooks=()=>new Promise((resolve,reject)=>{          //actually first 50, we don't want to send all of them, because why
    Book.findAll({attributes:{exclude:"id"}, limit:50}).then((result)=>{
        resolve(result)
    },(err)=>{
        console.log(err)
        reject("DB Error")
    })
})
const searchBook=(keyWord)=>new Promise((resolve,reject)=>{
    let keywordLike='%'+keyWord+'%'
    Book.findAll({
        attributes:{exclude:"id"},
        where:{
            [Op.or]:[
                {
                    ISBN:keyWord
                },
                {
                    name:{[Op.like]: keywordLike}
                },
                {
                    author:{[Op.like]: keywordLike}
                }]
            },
        }).then((result)=>{
            resolve(result)
        },(err)=>{
            console.log(err);
            reject("DB error")
        })
})
const addBook=(book)=>{
    return new Promise((resolve,reject)=>{
        let date=new Date()
        console.log("asdfas"+date.getHours())
        let currentDate=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
        console.log(currentDate)
            Book.create({
                id:generateId(),
                ISBN:book.ISBN,
                name:book.name,
                author:book.author,
                year:book.year||null,
                languageCode:book.languageCode || null,
                added:book.added || currentDate,
                addedBy: book.addedBy || "admin"
            }).then((result)=>{
                console.log(result)
                book.year=result.year
                book.languageCode=result.languageCode
                book.added=result.added
                book.addedBy=result.addedBy
                resolve(book)
            },(error)=>{
                if(error.parent.code==="ER_DUP_ENTRY"){
                    reject("This book has already been added")
                }
                reject("Invalid, can't add")
            })
        })
}
module.exports={
    register,
    login,
    getAllBooks,
    searchBook,
    addBook
}