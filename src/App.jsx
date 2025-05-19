import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { Routes,Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/home'
import About from './pages/about'
import Contact from './pages/contact'
import Rejister from './pages/rejister'
import Login from './pages/login'
import Singleuser from './pages/singleuser'
import Users from './pages/users'

function App() {


  return (
    <Routes>
           <Route path="/" element={<Layout />}>
           <Route index element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<Singleuser />} />
           <Route path="/about" element={<About />} />  
            <Route path="/contact" element={<Contact />} />
            <Route path="/rejister" element={<Rejister />} />
            <Route path="/login" element={<Login />} />
            </ Route>


 
    </ Routes>
  )
}

export default App
