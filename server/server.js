const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Gallery = require('./Schema/Gallery')
const User = require('./Schema/User')

const port =  process.env.PORT || 5500;

async function main() {
  await mongoose.connect('mongodb://localhost:27017/gallery');
}

main().catch(err => console.log(err));

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send("Server is running...");
})

app.get('/gallery/allVideos/:ownerId', async (req, res) => {
  let ownerId = req.params.ownerId
  let data = await Gallery.find({ownerId:ownerId});
  res.json(data);
})

app.post('/gallery/addVideo', async (req, res) => {
  let ownerId = req.body.ownerId;
  let videoId = req.body.videoId;
  let videoCategory = req.body.videoCategory;
    
  let data = await createData(videoId,videoCategory,ownerId)
  res.json({'result': 'success','data':data});
})

app.put('/gallery/updateVideo', async (req, res) => {
    let id = req.body.id;
    let videoCategory = req.body.videoCategory;
      
    let data = await updateData(id,videoCategory)
    res.json({'result': 'success'});
})

app.delete('/gallery/deleteVideo', async (req, res) => {
    let id = req.body.id;
    let ownerId = req.body.ownerId;
      
    let data = await deleteData(id,ownerId)
    res.json({'result': 'success'});
})

// authentication
app.post('/gallery/login', async (req, res) => {
  let ownerId = req.body.ownerId;
  let password = req.body.password;
    
  let data = await findUser(ownerId)

  if(data.length !== 0) {
    let userdata = data[0]
    let auth = await authenticateUser(ownerId,password,userdata)
    if(auth){
      res.json({'result': 'success','ownerId':userdata.ownerId});
    } else {
      res.json({'result': 'failed','message':"Invalid Credentials"});
    }
  } else {
    res.json({'result': 'failed','message':"User Does Not Exists"});
  }
})

app.post('/gallery/create-user', async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let ownerId = req.body.ownerId

  let users = await findUser(ownerId)
  if(users.length === 0) {
    let data = await createUser(username,password,ownerId)
    res.json({'result': 'success','message':"New User Created"});
  } else {
    res.json({'result': 'falied','message':"User Already Exists"});
  }
})


app.listen(port, () => {
  console.log(`Server listening at PORT : ${port}`)
})

// videos data
async function createData(videoId,videoCategory,ownerId) {
  const data = await Gallery.create({ videoId: videoId, videoCategory:videoCategory,ownerId:ownerId })
  return data
}

async function updateData(id,videoCategory) {
  let data = await Gallery.updateOne({_id:id}, {videoCategory:videoCategory})
  return data
}

async function deleteData(id,ownerId) {
    let data = await Gallery.deleteOne({_id:id,ownerId:ownerId})
    return data
}

// user data
async function createUser(username,password,ownerId) {
  const data = await User.create({ username: username, password:password,ownerId:ownerId })
  return data
}

async function findUser(ownerId) {
  const data = await User.find({ ownerId: ownerId })
  return data
}

async function authenticateUser(ownerId,password,userdata){
  if(password === userdata.password) {
    return true
  }
  return false
}