import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar } from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiShoppingBag, HiUser, HiMenu, HiSearch, HiX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { signOut } from "../redux/user/userSlice";
import  logo  from "../assets/Logo.jpg";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await fetch("/api/user/signout");
      dispatch(signOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    const encodedSearchTerm = encodeURIComponent(searchTerm.trim());

    try {
      const [cakeRes, sweetRes] = await Promise.all([
        fetch(`/api/cakes/getcakes?searchTerm=${encodedSearchTerm}`),
        fetch(`/api/sweets/getsweets?searchTerm=${encodedSearchTerm}`)
      ]);

      if (!cakeRes.ok || !sweetRes.ok) {
        throw new Error("Failed to fetch search results");
      }

      const [cakeData, sweetData] = await Promise.all([
        cakeRes.json(),
        sweetRes.json()
      ]);

      if (cakeData.products.length > 0) {
        navigate(`/cakes?search=${encodedSearchTerm}`);
      } else if (sweetData.products.length > 0) {
        navigate(`/sweets?search=${encodedSearchTerm}`);
      } else {
        alert("No results found for your search.");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-pink-200 border-b-2">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <NavLink to="/" className="text-3xl font-semibold text-gray-800 flex items-center">
          <img src={logo} alt="Logo" className="mr-2 w-16 h-16" />
        </NavLink>

        <div className="flex-grow mx-4 relative hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg border focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <HiSearch className="absolute top-3 right-4 text-gray-500 cursor-pointer" onClick={handleSearch} />
        </div>

        <div className="flex items-center space-x-4">
          {currentUser && (
            <Link to="/cart">
              <HiShoppingBag className="text-gray-800 text-2xl" />
            </Link>
          )}

          {currentUser ? (
            <Dropdown arrowIcon={false} inline label={<Avatar alt="user" img={currentUser.profilePicture} rounded className="h-10 w-10" />}>
              <DropdownHeader>
                <span className="block text-sm">{currentUser.username}</span>
                <span className="block text-sm font-medium truncate">{currentUser.email}</span>
              </DropdownHeader>
              <Link to="/dashboard?tab=profile">
                <DropdownItem>Profile</DropdownItem>
              </Link>
              <DropdownDivider />
              <DropdownItem onClick={handleSignOut}>Sign Out</DropdownItem>
            </Dropdown>
          ) : (
            <Link to="/sign-in">
              <HiUser className="text-gray-800 text-2xl" />
            </Link>
          )}

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX className="text-gray-800 text-2xl" /> : <HiMenu className="text-gray-800 text-2xl" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="container mx-auto px-4 py-2 md:hidden">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-full border focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
      )}

      <div className={`bg-pink-500 text-white text-lg py-3 px-6 ${menuOpen ? "block" : "hidden"} md:block`}>
        <div className="container mx-auto flex flex-col md:flex-row justify-between px-6 space-y-2 md:space-y-0">
        <NavLink to="/" className={({ isActive }) => isActive ? "font-semibold text-black" : "font-semibold"}>Home</NavLink>
          <NavLink to="/cakes" className={({ isActive }) => isActive ? "font-semibold text-black" : "font-semibold"}>Cakes</NavLink>
          <NavLink to="/sweets" className={({ isActive }) => isActive ? "font-semibold text-black" : "font-semibold"}>Sweets</NavLink>
          <NavLink to="/booking" className={({ isActive }) => isActive ? "font-semibold text-black" : "font-semibold"}>Booking</NavLink>
          <NavLink to="/design" className={({ isActive }) => isActive ? "font-semibold text-black" : "font-semibold"}>Design Cake</NavLink>
          <NavLink to="/aboutus" className={({ isActive }) => isActive ? "font-semibold text-black" : "font-semibold"}>About Us</NavLink>
          <NavLink to="/blogs" className={({ isActive }) => isActive ? "font-semibold text-black" : "font-semibold"}>Blogs</NavLink>
        </div>
      </div>
    </div>
  );
}
