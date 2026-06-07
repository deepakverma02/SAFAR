import { Book_ticket } from "../models/myticket.model.js"

export const Ticket_status=async(req,res)=>{
try{
const pnr=req.body.PnrNumber;
const response=await Book_ticket.findOne({PnrNumber:pnr})
if(response){
    res.status(200).send(response)
}
else{
    res.status(400).send({"Message":"PNR Number Not Found !"})
}





}
catch(error){
    res.status(404).send({"Message":"Error while Fataching the data !"})
}

}