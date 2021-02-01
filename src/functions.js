const bcrypt=require('bcrypt')
const uuid=require('uuid').v4

const encrypt=(plainPassword)=>new Promise((resolve,reject)=>{
    bcrypt.hash(plainPassword, 10, (err, hash)=> {
        resolve(hash);
    });
})
const generateId=()=> uuid()


module.exports={
    encrypt,
    generateId
}