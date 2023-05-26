import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dealer from '../page/Dealer'
import Signup from '../page/Signup'
import Login from '../page/Login'
import Allproduct from '../page/allproduct'

export const Allroute = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Allproduct/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/dealer' element={<Dealer/>}/>
        </Routes>
    </div>
  )
}
