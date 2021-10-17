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

    console.log(e);
    res.send({
      message:"Error in connection"
    })

  }
  finally{
    client.close();
  }
})


router.post('/add-students',async(req,res)=>{
    const client = await MongoClient.connect(dbUrl);

    try{
      const db = client.db("studentManagement");
      let data = await db.collection('students').insertMany(req.body);

      res.send({
        message:"Success",
        details:data
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

router.put('/edit-student/:id',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);

  try{
    const db = client.db("studentManagement");
    let data = await db.collection('students').updateOne({_id:ObjectId(req.params.id)},{$set:{name:req.body.name,email:req.body.email,mobile:req.body.mobile,class:req.body.class}})

    res.send({
      message:"Success",
      details:data
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

router.delete('/delete-student/:id',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);

  try{
    const db = client.db("studentManagement");
    let data = await db.collection('students').deleteOne({_id:ObjectId(req.params.id)})

    res.send({
      message:"Success",
      details:data
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


router.delete('/delete-many',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);

  try{
    const db = client.db("studentManagement");

    let deleteArray = [];

    req.body.map(e=>{
      deleteArray.push(ObjectId(e.id))
    })
    let data = await db.collection('students').deleteMany({_id:{$in:deleteArray}});

    res.send({
      message:"Success"
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


router.patch('/add-student-details/:id',async(req,res)=>{
  const client = await MongoClient.connect(dbUrl);

  try{
    const db = client.db("studentManagement");
    let data = await db.collection('students').updateOne({_id:ObjectId(req.params.id)},{$set:{address:req.body.address}})

    res.send({
      message:"Success",
      details:data
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
