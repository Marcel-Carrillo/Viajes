import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import {Home} from './dashboard/home/Home'
import {About} from './dashboard/about/About'
import {Error} from './dashboard/error/Error'
import {Register} from './Auth/register/Register'
import {Login} from './Auth/login/Login'
import { Services } from './dashboard/services/Services'
import { Allusers } from './dashboard/allusers/Allusers'
import { User } from './user/User'
import { EditUser } from './user/EditUser'
import { Admin } from './admin/Admin'
import { Container } from 'react-bootstrap'
import { AppNavBar } from '../components/appNavBar/AppNavBar'
import { TravelContext } from '../context/TravelsContext'
import { Travel } from './dashboard/travel/Travel'
import { AdminUsers } from './admin/AdminUsers'
import { AdminPictures } from './admin/AdminPictures'



export const AppRoutes = () => {

  const {token, user, logged} = useContext(TravelContext)

  return (
    <Container fluid>
    <BrowserRouter>
    <AppNavBar/>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/about' element={<About />}/>
      <Route path='*' element={<Error />}/>
      <Route path='/services' element={<Services />}/>

      {!token && !logged && <>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register />}/>
      </>}
      
      {token && user?.type === 0 && <><Route path='/allusers' element={<Allusers />}/>
      <Route path='/user' element={<User />}/>
      <Route path='/edituser/:id' element={<EditUser />}/>
      <Route path='/travel/:travel_id/:user_id' element={<Travel />}/>
      
      </>}

      {token && user?.type === 1 && <><Route path='/admin' element={<Admin />}/>
      <Route path='/adminUsers' element={<AdminUsers />}/>
      <Route path='/adminPictures' element={<AdminPictures />}/></>
      }
    </Routes>
    </BrowserRouter></Container>
    
  )
}
