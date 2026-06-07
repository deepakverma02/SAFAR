import React  from 'react';
import { useDispatch } from 'react-redux';
import logo from '../../../assets/logo.png'
import { FaBus, FaRoute, FaUsers, FaDollarSign, FaCalendarAlt, FaComments, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../Features/Slice';







function AdminHeader() {

  const dispatch = useDispatch()
const locUser = localStorage.getItem("username")
const navigate = useNavigate()

  const handleLogout = (e) =>{
    e.preventDefault()
   const Conformation=window.confirm("Are you sure you want to logout?")
   if(Conformation){
    dispatch(logout())
    localStorage.removeItem("role")
    localStorage.removeItem("Username")
    navigate("/")
   }
  }
    return (
      
        <header className="bg-white flex items-center justify-between p-4 shadow-lg">
        <div className="flex items-center space-x-4">
        <Link to="/admin">
          <img
            src={logo} // Replace with your company logo
            alt="Company Logo"
            className="h-12"
          />
          </Link>
        </div>
        <h1 className="text-2xl font-extrabold text-blue-800">Admin Dashboard</h1>

        { locUser ? 
           (
              <div className="flex items-center">
                
                <span className="text-blue-800 font-medium text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
                  
                  Welcome, {locUser}
                </span>
                <button
                  onClick={ handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-transform duration-300 flex items-center space-x-2"
                >
                  Logout
                </button>
              </div>
            ) : 
            (
              
              <Link
                to="/loginandreg"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
              >
  
                Login
              </Link>
              
            ) }

        {/* <button
          onClick={() => alert('Logged out!')} // Replace with actual logout logic
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-transform duration-300 flex items-center space-x-2"
        >
          <FaSignOutAlt className="text-xl" />
          <span>Logout</span>
        </button> */}
      </header>
    )
}

export default AdminHeader
