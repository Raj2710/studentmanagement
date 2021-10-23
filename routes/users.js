var express = require('express');
var router = express.Router();
const {dbUrl,mongodb,MongoClient} = require('../dbConfig');
const {hashing,hashCompare} = require('../library/auth')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//register
router.post('/register',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);
  try {
    const db = await client.db('studentManagement')
    let user = await db.collection('users').findOne({email:req.body.email})
    if(user)
    {
      res.json({
        message:"User already exxists"
      })
    }
    else{
      const hash = await hashing(req.body.password);
      req.body.password = hash;
      const document = await db.collection('users').insertOne(req.body);

      res.json({
        message:"Account Created"
      })
    }
  } catch (error) {
    console.log(error);
    res.send({messsage:"Failed to create user"})
  }
  finally{
    client.close();
  }
})



//login
router.post('/login',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);
  try {
    let db = await client.db('studentManagement');
    let user = await db.collection('users').findOne({email:req.body.email})
    if(user)
    {
        const compare = await hashCompare(req.body.password,user.password)
        if(compare===true)
        {
          res.json({
            message:"Login Successfull"
          })
        }
        else{
          res.json({
            message:"Invalid email or password"
          })
        }
    }
    else
    {
      res.json({
        message:"No user available"
      })
    }
  } catch (error) {
    
  }
  finally{
    client.close();
  }
})

module.exports = router;
