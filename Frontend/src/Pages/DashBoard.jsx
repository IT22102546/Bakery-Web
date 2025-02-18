import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSideBar from "../Components/DashSideBar";
import DashProfile from "../Components/DashProfile";
import DashUsers from "../Components/DashUsers";
import DashCake from "../Components/DashCakes";
import DashOrders from "../Components/DashOrders";
import DashSweets from "../Components/DashSweets";
import DashRiderRequests from "../Components/DashRiderRequests";
import DashShopRequests from "../Components/DashShopRequests";
import DashBookings from "../Components/DashBookings";
import DashMyBookings from "../Components/DashMyBookings";
import DashDesign from "../Components/DashDesign";
import MyDesignReq from "../Components/MyDesignReq";
import DashBlogs from "../Components/DashBlogs";


export default function DashBoard() {
  const location = useLocation();
  const[tab,setTab]= useState();

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search]);
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashSideBar/>
      </div>
      {tab==='profile' && <DashProfile/>}
      {tab === 'users' && <DashUsers/>}
      {tab === 'cakes' && <DashCake/>}
      {tab == 'orders' && <DashOrders/>}
      {tab == 'sweets' && <DashSweets/>}
      {tab == 'riderreq' && <DashRiderRequests/>}
      {tab == 'shopreq' && <DashShopRequests/>}
      {tab == 'bookings' && <DashBookings/>}
      {tab == 'mybookings' && <DashMyBookings/>}
      {tab == 'designs' && <DashDesign/>}
      {tab == 'mydesignreq' && <MyDesignReq/>}
      {tab == 'blogs' && <DashBlogs/>}

      {/*

        {tab === 'products' && <DashProduct/>}
        {tab === 'membership' && <DashMembership/>}
        {tab === 'photo' && <DashPhotos/>}
        {tab === 'achievements' && <DashAchievement/>}
        {tab === 'bearer' && <DashBearers/>}
        {tab === 'activities' && <DashActivities/>}
        
      
      */}
      
      

      {/*
     
      {tab === 'myorders' && <DashMyOrders/>}

       */}

   
     
    </div>
  )
}