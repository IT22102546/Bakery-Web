import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Header from './Components/Header'
import DashBoard from './Pages/DashBoard'
import PrivateRoute from './Components/PrivateRoute'
import AddCakes from './Pages/AddCakes'
import OnlyAdminPrivateRoute from './Components/OnlyAdminPrivateRoute'
import PostCake from './Pages/PostCake'
import Cart from './Pages/Cart'
import CakePage from './Pages/CakePage'
import UpdateCake from './Pages/UpdateCake'



export default function App() {
  return (
    <BrowserRouter>

        <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/cakes" element={<CakePage/>}/>

      <Route element={<PrivateRoute/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/cart" element={<Cart/>}/>
      <Route/>

      <Route element={<OnlyAdminPrivateRoute/>}>
          <Route path="/addcake" element={<AddCakes/>} />
          <Route path="/cake/:cakeSlug" element={<PostCake/>} />
          <Route path="/cake/:cakeSlug" element={<PostCake/>} />
          <Route path="/update-cake/:productId" element={<UpdateCake/>}/>
      </Route>

      </Routes>
    </BrowserRouter>
  )
}
