import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {motion} from 'framer-motion'
import './App.css';
import VideoFrame from './VideoFrame';

const serverURL = "http://localhost:5500/";

const api = axios.create({
  baseURL: serverURL,
});

const username = "sarthik"
const ownerId = "5546165"
const isAdmin = true

function App() {
  const [allVideos, setAllVideos] = useState([]);
  const [videoId,setVideoId] = useState("");
  const [videoCategory,setVideoCategory] = useState("")
  const [frameId,setFrameId] = useState("")
  const [filterVal,setFilterVal] = useState("All")

  useEffect(()=>{
    fetchData()
  },[]);

  async function fetchData() {
    const res = await api.get("/gallery/allVideos");
    setAllVideos(res.data);
  }

  async function addVideo(e) {
    e.preventDefault()
    let tempId = await transformLink(videoId)
    const res = await api.post("/gallery/addVideo",{videoId:tempId,videoCategory:videoCategory,ownerId:ownerId});
    
    if(res.data.result === "success") {
      // setVideoId("");
      // setVideoCategory("")
      fetchData()
    } 
  }
  
  async function deleteVideo(id){
    const res = await api.delete("/gallery/deleteVideo",{data:{id:id}});
    if(res.data.result === "success") {
      fetchData()
    } 
  }

  async function updateVideo(id){
    if(videoCategory === "") return
    const res = await api.put("/gallery/updateVideo",{id:id,videoCategory:videoCategory});
    if(res.data.result === "success") {
      fetchData()
    } 
  }

  async function showVideo(id) {
    setFrameId(id)
  }

  async function transformLink(id) {
    let tempIds1 = id.split("/")
    // console.log(tempIds)

    let tempIds2 = []
    tempIds1.forEach(item=>{
        let tmp = item.split("=")
        tempIds2.push(tmp)
    })

    let idList = tempIds2.slice(-1)[0];
    let formattedId = idList.slice(-1);
    return formattedId[0];
  }

  return (
    <div>
      <header>
      <nav>
        <div className="nav-text">
          <h1>YouTube Video Gallery</h1>
        </div>
      </nav>
      </header>
      <section className="main">
        <div className='section-1'>

        <form onSubmit={addVideo}>
          <input type="text" value={videoId} onChange={(e)=>{setVideoId(e.target.value)}} placeholder="Enter YouTube Video Link" required></input>
          <input type="text" value={videoCategory} onChange={(e)=>{setVideoCategory(e.target.value)}} placeholder="Enter YouTube Category" required></input>
          <button className='add-video'>Add Video</button>
        </form>

        <div className='filters'>
          <h4>Filters</h4>
          <select onChange={(e)=>setFilterVal(e.target.value)}>
            {["All",...new Set(allVideos.map(i=>i.videoCategory))].map((val,index)=><option key={index}>{val}</option>)}
          </select>
        </div>
        </div>

        <div className="content">
          <motion.ul layout>
            {allVideos.length !==0 && allVideos.filter((item)=> {
              if(filterVal === "All") return true
              return item.videoCategory===filterVal
            }).map((item, index) => {
              return <motion.li animate={{opacity:1}} initial={{opacity:0}} exit={{opacity:0}} layout key={item._id}>
                <div onClick={()=>showVideo(item.videoId)} className='video-card'>
                  <img src={`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`}></img>
                </div>
                <div className="btns">
                  <button onClick={() => updateVideo(item._id)} className="btn remove"><i className="fa-solid fa-edit"></i></button>
                  <button onClick={() => deleteVideo(item._id)} className="btn update"><i className="fa-solid fa-trash-alt"></i></button>
                </div>
                <div className='category'>{item.videoCategory}</div>
              </motion.li>
            })}
          </motion.ul>
        </div>

      </section>

      {frameId.length !== 0 ? <VideoFrame videoId={frameId} setFrameId={setFrameId} /> : ""}
    </div>
  );
}

export default App;