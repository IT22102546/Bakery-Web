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
import OrderSummary from './Pages/OrderSummary'
import CheckoutSuccess from './Pages/CheckoutSuccess'
import DesignCake from './Pages/DesignCake'
import DesignForm from './Pages/DesignForm'
import Footer from './Components/Footer'
import AboutUs from './Pages/AboutUs'
import Booking from './Pages/Booking'
import Sweets from './Pages/Sweets'
import AddSweets from './Pages/AddSweets'



export default function App() {
  return (
    <BrowserRouter>

        <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/cakes" element={<CakePage/>}/>
        <Route path="/design" element={<DesignCake/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path="/sweets" element={<Sweets/>}/>
        


      <Route element={<PrivateRoute/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/order-summary" element={<OrderSummary/>}/>
        <Route path="/order-pay-success" element={<CheckoutSuccess/>}/>
        <Route path="/designform" element={<DesignForm/>}/>
      <Route/>

      <Route element={<OnlyAdminPrivateRoute/>}>
          <Route path="/addcake" element={<AddCakes/>} />
          <Route path="/cake/:cakeSlug" element={<PostCake/>} />
          <Route path="/cake/:cakeSlug" element={<PostCake/>} />
          <Route path="/update-cake/:productId" element={<UpdateCake/>}/>
          <Route path="/addsweets" element={<AddSweets/>}/>
      </Route>

     

      </Routes>

      <Footer/>
    </BrowserRouter>
  )
}
