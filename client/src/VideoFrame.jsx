import React from 'react'
import './App.css';

export default function VideoFrame({videoId,setFrameId}) {
  return (
    <div className='video-frame'>
        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;  fullscreen" allowFullScreen>
        </iframe>
        <button onClick={()=>setFrameId("")} className='close-btn'>X</button>
    </div>
  )
}
