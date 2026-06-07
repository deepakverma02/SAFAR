import { Ticket_Book } from "../controllers/MyTicket.controllers.js"
import {verify_middleware} from "../middleware/verify_singnup.middleware.js"
import { unique_ticket } from "../middleware/myticket.middleware.js"
import { SeatData } from "../controllers/SeatData.controller.js"
export const Ticket_Conf= (app)=>{
    app.post('/bookticket',[verify_middleware,unique_ticket],Ticket_Book)
    app.post('/seatData',SeatData)



}