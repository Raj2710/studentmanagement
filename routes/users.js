const { Router } = require('express');
var express = require('express');
var router = express.Router();
const {dbUrl,mongodb,MongoClient} = require('../dbConfig');
const {hashing,hashCompare,createJWT,authenticate} = require('../library/auth')

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


router.post('/reset-password/:token',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);
  const token = req.params.token;
  const mail = await authenticate(token);
  try {
    if(mail)
    { 
      const hash = await hashing(req.body.password);
      const db = await client.db('studentManagement')
      let user = await db.collection('users').updateOne({email:mail},{$set:{password:hash}})

      res.json({
        message:"Password Set Successfully"
      })
    }
    else{
      res.send({message:"Link Expired"})
    }


  } catch (error) {
    console.log(error)
  }
  finally{
    client.close();
  }
})


//forgot password
router.post('/forgot-password',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);
  let email = req.body.email;
  try {
    let db = await client.db('studentManagement');
    let user = await db.collection('users').findOne({email:req.body.email})
    if(user){
      const token = await createJWT(
        {
          userName:user.userName,
          email:user.email
        }
      )
      //send a mail with reset password link
      res.send({
        token,
        message:"Reset Link sent successfully"
      })
    }
    else
    {
      res.send({
        message:"No user Available"
      })
    }

  } catch (error) {
    console.log(error)
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
          //token
          const token = await createJWT(
            {
              userName:user.userName,
              email:user.email1
            }
          )
          res.json({
            token:token,
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
