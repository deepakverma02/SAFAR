import { deleteAllBooking, my_Booking } from "../controllers/myBooking.controllers.js"
import { delete_booking } from "../controllers/myBooking.controllers.js"
export const myBookingRoute=(app)=>{
    app.post('/myBooking',my_Booking)
    app.post('/deletemybooking',delete_booking)
    app.post('/deleteAllticket',deleteAllBooking)
}