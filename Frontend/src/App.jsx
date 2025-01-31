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
import PostSweet from './Pages/PostSweet'
import UpdateSweet from './Pages/UpdateSweets'
import DeliverySignUp from './Pages/DeliverySignUp'
import ShopSignUp from './Pages/ShopSignUp'
import Career from './Pages/Career'
import AddBlogs from './Pages/AddBlogs'
import BlogDetails from './Pages/BlogDetails'
import UpdateBlog from './Pages/UpdateBlog'
import Blogs from './Pages/Blogs'
import DesignCakeSuccess from './Pages/DesignCakeSuccess'
import BookingCakeSuccess from './Pages/BookingCakeSuccess'



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
        <Route path="/careers" element={<Career/>}/>
        <Route path="/signupdelivery" element={<DeliverySignUp/>}/>
        <Route path="/signupshops" element={<ShopSignUp/>}/>
        <Route path="/blogs/:slug" element={<BlogDetails />} />
        <Route path="/blogs" element={<Blogs/>} />
        


      <Route element={<PrivateRoute/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/order-summary" element={<OrderSummary/>}/>
        <Route path="/order-pay-success" element={<CheckoutSuccess/>}/>
        <Route path="/designform" element={<DesignForm/>}/>
        <Route path="/designcakesuccess" element={<DesignCakeSuccess/>}/>
        <Route path="/bookingcakesuccess" element={<BookingCakeSuccess/>}/>

      <Route/>

      <Route element={<OnlyAdminPrivateRoute/>}>
          <Route path="/addcake" element={<AddCakes/>} />
          <Route path="/cake/:cakeSlug" element={<PostCake/>} />
          <Route path="/sweet/:sweetSlug" element={<PostSweet/>} />
          <Route path="/update-cake/:productId" element={<UpdateCake/>}/>
          <Route path="/update-sweet/:productId" element={<UpdateSweet/>}/>
          <Route path="/addsweets" element={<AddSweets/>}/>
          <Route path="/addblogs" element={<AddBlogs/>}/>
          <Route path="/update-blog/:id" element={<UpdateBlog/>} />
      </Route>

     

      </Routes>

      <Footer/>
    </BrowserRouter>
  )
}
