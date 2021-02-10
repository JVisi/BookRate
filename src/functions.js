const bcrypt=require('bcrypt')
const uuid=require('uuid').v4

const encrypt=(plainPassword)=>new Promise((resolve)=>{
    bcrypt.hash(plainPassword, 10, (err, hash)=> {
        resolve(hash);
    });
})
const compare=(plainPassword,storedPassword)=>new Promise((resolve)=>{
    bcrypt.compare(plainPassword,storedPassword,(err,result)=> {
        resolve(result);
    });
})
const generateId=()=> uuid()


module.exports={
    encrypt,
    generateId,
    compare
}