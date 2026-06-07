
import { Book_ticket } from "../models/myticket.model.js"
export const Ticket_Book = async (req, res) => {
    const request = req.body
    const Ticket_Book_obj = {
        userid: request.userid,
        userName: request.userName,
        BusNumber: request.BusNumber,
        BusName: request.BusName,
        totalPrice: request.totalPrice,
        Bus_Type: request.Bus_Type,
        Bus_class: request.Bus_class,
        SourceTiming: request.SourceTiming,
        DestinationTiming: request.DestinationTiming,
        FoodFacility:request.FoodFacility,
        Source:request.Source,
        Date:request.Date,
        Destination:request.Destination,
        PassangerDetails:request.PassangerDetails,
        PnrNumber:request.PnrNumber,
        PaymentType:request.PaymentType,
        
    }


    try {
        const  Ticket_Book_Create = await Book_ticket.create(Ticket_Book_obj)
        res.status(201).send(Ticket_Book_Create)
    }
    catch (error) {
        console.log('Error occured ', error);

        res.status(501).send({
            message: 'Error occur while creating the new bus !'
        })
    }

}