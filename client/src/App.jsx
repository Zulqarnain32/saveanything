import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Secret from './components/Secret'
import Registration from './components/Registration'
import Login from './components/Login'
import { useCookies } from 'react-cookie'

import("./App.css")
const App = () => {
  const [cookie,setCookie] = useCookies(["access_token"])
  console.log("home page",cookie.access_token);
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
           <Route path='/' element = {<Home/>}/>
           <Route path='/secret' element = {cookie.access_token ? <Secret/>:<Registration/>}/>
           <Route path='/register' element = {<Registration/>}/>
           <Route path='/login' element = {<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
