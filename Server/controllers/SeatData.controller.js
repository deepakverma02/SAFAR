import { Book_ticket } from "../models/myticket.model.js"

export const SeatData=async(req,res)=>{

const BusNumber=req.body.BusNumber
const Date=req.body.Date

try{

    const response=await Book_ticket.find({BusNumber:BusNumber,Date:Date})
    res.status(200).send(response)

}


catch(error){

res.status(400).send({"Message":"Something went wrong !"})



}



}