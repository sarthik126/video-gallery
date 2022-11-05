import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import App from './App'

export default function AdminPage({isAdmin}) {
    const {ownerId} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(!isAdmin) {
            console.log(`Access Denied --> ${ownerId}`)
            navigate('/')
        }
    },[isAdmin])

  return (
    <div>
        <App isAdmin={true} />
    </div>
  )
}
