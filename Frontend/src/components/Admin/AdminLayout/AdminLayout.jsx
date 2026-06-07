import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminFooter from '../AdminFooter/AdminFooter';
import { Outlet } from 'react-router-dom';
import PageNotFound from '../../../../PageNotFound.jsx';

const AdminLayout = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the role from local storage to check if the user is admin
    const role = localStorage.getItem('role');
    
    if (role === 'ADMIN') {
      setIsAdmin(true);
      
      // Prevent back navigation to login page
      window.history.pushState(null, null, window.location.pathname);
      window.addEventListener('popstate', handleBackButton);

      return () => {
        window.removeEventListener('popstate', handleBackButton);
      };
    } else {
      setIsAdmin(false);
      return < PageNotFound/>;  // If not admin, redirect to login page
    }
  }, [navigate]);

  const handleBackButton = () => {
    // Prevent back navigation when the user is on admin pages
    window.history.pushState(null, null, window.location.pathname);
  };

  if (!isAdmin) {
    return <PageNotFound />;
  }

  return (
    <div>
      <AdminHeader />
      <Outlet />  {/* This will render nested routes if role is admin */}
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;
