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
module.exports={hashing,hashCompare,createJWT,authenticate}