const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const Gallery = require('./Schema/Gallery')

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

app.get('/gallery/allVideos', async (req, res) => {
  let data = await Gallery.find();
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
      
    let data = await deleteData(id)
    res.json({'result': 'success'});
})


app.listen(port, () => {
  console.log(`Server listening at PORT : ${port}`)
})

async function createData(videoId,videoCategory,ownerId) {
  const data = await Gallery.create({ videoId: videoId, videoCategory:videoCategory,ownerId:ownerId })
  return data
}

async function updateData(id,videoCategory) {
  let data = await Gallery.updateOne({_id:id}, {videoCategory:videoCategory})
  return data
}

async function deleteData(id) {
    let data = await Gallery.deleteOne({_id:id})
    return data
}