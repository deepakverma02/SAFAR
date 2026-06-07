import { Ticket_status } from "../controllers/TicketStatus.controller.js"

export const Ticket_status_Route=(app)=>{
    app.post('/Ticketstatus',Ticket_status)
}