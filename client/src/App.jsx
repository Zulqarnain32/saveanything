import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Secret from './components/Secret'
import Registration from './components/Registration'
import Login from './components/Login'
import("./App.css")
const App = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
           <Route path='/' element = {<Home/>}/>
           <Route path='/secret' element = {<Secret/>}/>
           <Route path='/register' element = {<Registration/>}/>
           <Route path='/login' element = {<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
