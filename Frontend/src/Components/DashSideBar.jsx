import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArchive, HiArrowSmRight, HiBookmark, HiBookOpen, HiCake, HiGift, HiNewspaper, HiOutlineMail, HiOutlineMailOpen, HiOutlineUserGroup, HiUser} from 'react-icons/hi';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { signOut } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { FaDelicious, FaGift } from "react-icons/fa";

export default function DashSideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector(state => state.user);
  const location = useLocation();
  const [tab, setTab] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      await fetch('/api/user/signout');
      dispatch(signOut());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile' key="profile">
            <Sidebar.Item 
              active={tab === 'profile'} 
              icon={HiUser} 
              label={currentUser.isRider
                ? "Delivery"
                : currentUser.isAdmin && currentUser.isOwner
                ? "Owner"
                : currentUser.isAdmin
                ? "Shop"
                
                : "User"}
              labelColor='dark'
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard?tab=mybookings' key="mybookings">
                <Sidebar.Item
                  active={tab === 'mybookings'}
                  icon={HiBookmark}
                  as='div'
                >
                  My Bookings
                </Sidebar.Item>
            </Link>

            <Link to='/dashboard?tab=mydesignreq' key="mydesignreq">
                <Sidebar.Item
                  active={tab === 'mydesignreq'}
                  icon={HiBookmark}
                  as='div'
                >
                  My Design Req
                </Sidebar.Item>
            </Link>
            
          {currentUser?.isAdmin && currentUser?.isOwner && (
            <>
              <Link to='/dashboard?tab=users' key="users">
                <Sidebar.Item
                  active={tab === 'users'}
                  icon={HiOutlineUserGroup}
                  as='div'
                >
                  Users
                </Sidebar.Item>
              </Link>

              <Link to='/dashboard?tab=riderreq' key="riderreq">
                <Sidebar.Item
                  active={tab === 'riderreq'}
                  icon={HiOutlineMail}
                  as='div'
                >
                  Rider Requests
                </Sidebar.Item>
              </Link>

              <Link to='/dashboard?tab=shopreq' key="shopreq">
                <Sidebar.Item
                  active={tab === 'shopreq'}
                  icon={HiOutlineMailOpen}
                  as='div'
                >
                  Shop Requests
                </Sidebar.Item>
              </Link>

              <Link to='/dashboard?tab=blogs' key="blogs">
                <Sidebar.Item
                  active={tab === 'blogs'}
                  icon={HiNewspaper}
                  as='div'
                >
                  Blogs
                </Sidebar.Item>
              </Link>
              
             
          
              
            </>

)}

{currentUser?.isAdmin &&  (
            <>
              
              
              <Link to='/dashboard?tab=cakes' key="cakes">
                <Sidebar.Item
                  active={tab === 'cakes'}
                  icon={HiCake}
                  as='div'
                >
                  Cakes
                </Sidebar.Item>
              </Link>

              <Link to='/dashboard?tab=designs' key="designs">
                <Sidebar.Item
                  active={tab === 'designs'}
                  icon={FaDelicious}
                  as='div'
                >
                  Requested Designs
                </Sidebar.Item>
              </Link>

              <Link to='/dashboard?tab=bookings' key="bookings">
                <Sidebar.Item
                  active={tab === 'bookings'}
                  icon={HiBookOpen}
                  as='div'
                >
                  Bookings
                </Sidebar.Item>
              </Link>

              <Link to='/dashboard?tab=sweets' key="sweets">
                <Sidebar.Item
                  active={tab === 'cakes'}
                  icon={FaGift}
                  as='div'
                >
                  Sweets
                </Sidebar.Item>
              </Link>
               
              <Link to='/dashboard?tab=orders' key="orders">
                <Sidebar.Item
                  active={tab === 'orders'}
                  icon={HiArchive}
                  as='div'
                >
                  Orders
                </Sidebar.Item>
              </Link>
          
              
            </>

)}



          <Sidebar.Item 
            icon={HiArrowSmRight} 
            className="cursor-pointer" 
            onClick={handleSignOut}
            key="signout"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );

}