import React from 'react'


function AdminFooter() {
    return (
        <footer className="bg-blue-800 text-white p-4 w-full text-center flex-shrink-0">
        <div className="space-y-2">
          <p className="text-lg font-bold">Bus Booking Application</p>
          <p className="text-sm">&copy; {new Date().getFullYear()} Safar - Bus Reservation Portal Co. All rights reserved.</p>
        </div>
      </footer>
    )
}

export default AdminFooter
