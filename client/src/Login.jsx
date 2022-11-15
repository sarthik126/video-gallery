import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const serverURL = "https://video-gallery-server.up.railway.app/";

const api = axios.create({
  baseURL: serverURL,
});

export default function Login({isAdmin,setIsAdmin}) {
    const [ownerId,setOwnerId] = useState("")
    const [userName,setUserName] = useState("")
    const [password,setPassword] = useState("")
    const [cpassword,setCPassword] = useState("")

    const navigate = useNavigate()

    async function login(e) {
        e.preventDefault()
        const res = await api.post("/gallery/login",{ownerId:ownerId,password:password});

        if(res.data.result === "success") {
            setIsAdmin(true)
            navigate(`/admin/${res.data.ownerId}`)
            localStorage.setItem("gallery",JSON.stringify({ownerId,password}))
        } else {
            toast("Please Enter Proper Credentials!")
        }
    }

    async function authenticate(userdata) {
        if(userdata) {
            const res = await api.post("/gallery/login",{ownerId:userdata.ownerId,password:userdata.password});

            if(res.data.result === "success") {
                setIsAdmin(true)
                navigate(`/admin/${res.data.ownerId}`)
            } else {
                localStorage.setItem("gallery",JSON.stringify({}))
            } 
        } else {
            console.log(userdata)
        }
    }

    async function SignUp(e){
        e.preventDefault()

        if(password !== cpassword) {
            toast("Confirm Password doesn't match!")
            return
        }

        const res = await api.post("/gallery/create-user",{username:userName,ownerId:ownerId,password:password});

        if(res.data.result === "success") {
            setIsAdmin(true)
            navigate(`/admin/${ownerId}`)
            localStorage.setItem("gallery",JSON.stringify({ownerId,password}))
        } else {
            toast("UserId already Exists")
        }
    }

    useEffect(()=>{
        let data = localStorage.getItem("gallery") || "{}"
        let userdata = JSON.parse(data)
        // console.log(userdata)
        authenticate(userdata)
    },[])
  return (
    <div>
        <ToastContainer position="top-center" />
        <header>
      <nav>
        <div className="nav-text">
          <h1>YouTube Video Gallery</h1>
        </div>
      </nav>
      </header>
        <div className="forms">
            <form onSubmit={login}>
                <h2>Login</h2>
                <label htmlFor='ownerId-l'>Enter UserId</label>
                <input id='ownerId-l' onChange={(e)=>setOwnerId(e.target.value)} value={ownerId} placeholder="Enter UserId" />
                <label htmlFor='password-l'>Enter Password</label>
                <input type="password" id='password-l' onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Enter Password" />
                <button>Login</button>
            </form>

            <form onSubmit={SignUp}>
            <h2>Sign Up</h2>
                <label htmlFor='username-s'>Enter Username</label>
                <input id='username-s' onChange={(e)=>setUserName(e.target.value)} value={userName} placeholder="Enter Username" />
                <label htmlFor='ownerId-s'>Enter UserId</label>
                <input id='ownerId-s' onChange={(e)=>setOwnerId(e.target.value)} value={ownerId} placeholder="Enter UserId" />
                <label htmlFor='password-s'>Enter Password</label>
                <input type="password" id='password-s' onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Enter Password" />
                <label htmlFor='cpassword-s'>Enter Password</label>
                <input type="password" id='cpassword-s' onChange={(e)=>setCPassword(e.target.value)} value={cpassword} placeholder="Enter Password" />
                <button>Sign Up</button>
            </form>

        </div>
    </div>
  )
}
