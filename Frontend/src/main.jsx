import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Form, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import SearchBusLayout from './components/SearchBus/SearchBusLayout.jsx'
import Home from './components/Home/Home.jsx'
import AdminHome from './components/Admin/Home/AdminHome.jsx'
import Status from './components/Status/Status.jsx'
import Help from './components/Help/Help.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import User from './components/User/User.jsx'
import MyBooking from './components/MyBooking/MyBooking.jsx'


import Register from './components/Register/register.jsx'
import AddBus from './components/Admin/AddBus/AddBus.jsx'
import AdminLayout from './components/Admin/AdminLayout/AdminLayout.jsx'
import ModifyBus from './components/Admin/ModifyBus/ModifyBus.jsx'
import DeleteBus from './components/Admin/DeleteBus/DeleteBus.jsx'
import ViewRevenue from './components/Admin/ViewRevenue/ViewRevenue.jsx'
import ViewBookings from './components/Admin/ViewBookings/ViewBookings.jsx'
import HandleComplaints from './components/Admin/HandleComplaints/HandleComplaints.jsx'
import ForgetPassword from './components/ForgetPassword/ForgetPassword.jsx'
import {Provider} from 'react-redux'
import Store from './App/Store.js'
import ViewSeats from '../src/components/ViewSeats/ViewSeats.jsx'
import PageNotFound from '../PageNotFound.jsx'
import SearchBus from "../src/components/SearchBus/SearchBus.jsx"
import FormPage from './components/FormPage/FormPage.jsx'
import Payment from './components/Payment/PaymentMethod.jsx'
import Receipt from './components/Receipt/Receipt.jsx'

const role = localStorage.getItem("role")

const router = createBrowserRouter(
 
  

  createRoutesFromElements(
    <>
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='status' element={<Status />} />
      <Route path='contact' element={<Contact />} />
      <Route path='help' element={<Help />} />
      <Route path='mybookings' element={<MyBooking/>} />
      </Route>

      <Route path='user/:userid' element={<User />} />
      <Route path='loginandreg' element={<Register/>} />
      <Route path='ForgetPassword' element={<ForgetPassword/>} />

      
    <Route path='searchBus' element={<SearchBusLayout />}>
      <Route path='' element={<SearchBus />} />
      <Route path='viewSeats' element={<ViewSeats />} />
      <Route path='viewSeats/Form' element={<FormPage/>} />
      <Route path='viewSeats/Form/payment' element={<Payment/>} />
      <Route path='viewSeats/Form/payment/receipt' element={<Receipt/>} />
      </Route>
    
    <Route path='admin' element={ <AdminLayout/>} >
      <Route path='' element={<AdminHome />} />
      <Route path='addbus' element={<AddBus />} />
      <Route path='deletebus' element={<DeleteBus />} />
      <Route path='viewrevenue' element={<ViewRevenue />} />
      <Route path='viewbookings' element={<ViewBookings />} />
      <Route path='handlecomplaints' element={<HandleComplaints />} />
      <Route path='modifybus' element={<ModifyBus />} />
      </Route>

      <Route path='*' element={<PageNotFound />} />
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <RouterProvider router={router} />
  </Provider>,
)
