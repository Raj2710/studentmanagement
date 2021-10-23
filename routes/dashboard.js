var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Raj2710:Raj2710@raj.x3e0h.mongodb.net/Dashboard?retryWrites=true&w=majority')
var Schema = mongoose.Schema;


userDataScheema = new Schema({
  title:{type:String,required:true},
  content:String,
  author:String,
  date: { type: Date, default: Date.now }
},
{collection:'user-data'})


var UserData = mongoose.model('UserData',userDataScheema);

router.get('/all', async function(req,res){
    const data = await UserData.find().exec();
    console.log(data);
    res.send(data)
})

router.post('/', async(req,res)=>{

  try {
    var data = new UserData(req.body)
  data.save((err)=>{
    if(err)
    {
      //handle err
    }
  });

  res.send({
    message:'Inserted'
  })
  } catch (error) {
    res.send({error})
  }
})

router.put('/:id',(req,res)=>{
  let id = req.params.id;
  UserData.findById(id,(err,doc)=>{
    if(err)
      console.log(err)
    console.log(doc)

    doc.title=req.body.title;
    doc.content=req.body.content;
    doc.author = req.body.author;
    doc.save();
  })
  res.send({
    message:'Updated'
  })
})



router.delete('/',(req,res)=>{
  var id = req.body.id;
  UserData.findByIdAndRemove(id).exec();
  res.send({
    message:'Deleted'
  })
})


module.exports = router;