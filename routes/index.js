const { ObjectId } = require('bson');
var express = require('express');
var router = express.Router();
const {dbUrl,mongodb,MongoClient} = require('../dbConfig');

router.get('/all-students', async(req,res)=> {

  const client = await MongoClient.connect(dbUrl);

  try{
    const db = client.db("studentManagement");
    let data = await db.collection('students').find().toArray();

    res.send({
      message:"Success",
      Data:data
    })

  }
  catch(e){

    console.log(error);
    res.send({
      message:"Error in connection"
    })

  }
  finally{
    client.close();
  }



});

router.get('/:id',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);

  try{
    const db = client.db("studentManagement");
    let data = await db.collection('students').findOne({_id:ObjectId(req.params.id)});

    res.send({
      message:"Success",
      Data:data
    })

  }
  catch(e){

    console.log(error);
    res.send({
      message:"Error in connection"
    })

  }
  finally{
    client.close();
  }
})


router.post('/add-one-student',async(req,res)=>{
    const client = await MongoClient.connect(dbUrl);

    try{
      const db = client.db("studentManagement");
      let data = await db.collection('students').insertOne(req.body);

      res.send({
        message:"Success",
        insertedData:data
      })

    }
    catch(e){

      console.log(error);
      res.send({
        message:"Error in connection"
      })

    }
    finally{
      client.close();
    }
})

router.post('/add-many-student',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);

  try{
    const db = client.db("studentManagement");
    let data = await db.collection('students').insertMany(req.body);

    res.send({
      message:"Success",
      insertedData:data
    })

  }
  catch(e){

    console.log(error);
    res.send({
      message:"Error in connection"
    })

  }
  finally{
    client.close();
  }
})



module.exports = router;
