import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import App from './App'
import Login from './Login';
import './index.css'
import AdminPage from './AdminPage';

export default function DashBoard() {

const [isAdmin,setIsAdmin] = useState(false)

  return (
    <Router>
    <Routes>
      <Route path='/' element={<Login isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
      <Route path="/admin/:ownerId" element={<AdminPage isAdmin={isAdmin} />} />
      <Route path="/gallery/:ownerId" element={<App isAdmin={false} />} />
    </Routes>
  </Router>
  )
}
