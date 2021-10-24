const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const secret = "aoejkfcb038u3e912i3ui3415646bdsjhdqw"
const JWTD = require('jwt-decode');

const hashing = async(value)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(value,salt)
        return hash;

    }
    catch(err)
    {
        console.log("Bcrupt "+error)
        return error
    }
}

const hashCompare = async(password,hashValue)=>{
    try{
        return await bcrypt.compare(password,hashValue)
    }
    catch(e)
    {
        return e;
    }
}

const createJWT = async({userName,email})=>{

    return await JWT.sign(
        {
            userName,
            email
        },
        secret,
        {
            expiresIn:"3m"
        }
    )
}

const authenticate = async(token)=>{
    const decode = JWTD(token)
    console.log(decode)
    if(Math.round(new Date()/1000)<=decode.exp)
        return decode.email
    else
        return false
}

const role = async(req,res,next)=>{
    switch(req.body.role){
        case 1 : console.log( "admin")       
                 break;
        case 2 : console.log( "faculty")
                 break;
        case 3 : console.log( "student")
                 break;
        case 4 : console.log( "parents")
                 break;
    }
    next();
}

const adminRole = async(req,res,next)=>{
    if(req.body.role==1)
        next();
    else
    {
        res.send({message:"You are not an Admin"})
    }
}
module.exports={hashing,hashCompare,createJWT,authenticate,role,adminRole}