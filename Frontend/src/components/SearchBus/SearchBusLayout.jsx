// Layout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { AuthProvider } from '../../authcontext'

function Layout() {
  const location = useLocation();

  // Determine if we are on the /admin route or the /searchBus/viewSeats/Form/payment route
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isPaymentRoute = location.pathname === '/searchBus/viewSeats/Form/payment';
  const isReceiptRoute = location.pathname === '/searchBus/viewSeats/Form/payment/receipt';


  return (
    <AuthProvider>
      {!isAdminRoute && !isPaymentRoute && !isReceiptRoute && <Header />} {/* Conditionally render Header */}
      <Outlet />
      {!isAdminRoute && !isPaymentRoute &&  !isReceiptRoute && <Footer />} {/* Conditionally render Footer */}
    </AuthProvider>
  );
}

export default Layout;
