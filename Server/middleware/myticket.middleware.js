import { Book_ticket } from "../models/myticket.model.js";

export const unique_ticket = async (req, res, next) => {
const pnr=req.body.PnrNumber
try{

if(!pnr){
   return res.status(400).send({"Message":"Pnr Number Not Found !"})
}
if(!req.body.BusName){
    return res.status(400).send({"Message":"Plese Enter the Bus Name !" })   
}
if(!req.body.BusNumber){
   return  res.status(400).send({"Message":"Plese Enter the Bus  Number !" })   
}


const busdata=await Book_ticket.findOne({PnrNumber:pnr})
if(busdata){
   return res.status(400).send({"Message":"Pnr already exist Plese Rebook Your Ticket !"})
}

    next()


}

catch(error){
   return  res.status(400).send({"Message":"Something went wrong !"})
}
}