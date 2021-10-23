const bcrypt = require('bcryptjs');


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

module.exports={hashing,hashCompare}