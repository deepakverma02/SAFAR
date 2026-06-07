import { add_bus } from "../models/addbus.models.js";

export const unique_bus = async (req, res, next) => {
const busnumber=req.body.Bus_number;
try{


if(!busnumber){
  return  res.status(400).send({"Message":"Plese Enter the Bus Number !"})
}
if(!req.body.Bus_name){
    return res.status(400).send({"Message":"Plese Enter the Bus Name !"})   
}
if(!req.body.Number_seat){
    return res.status(400).send({"Message":"Plese Enter the Number of seat !"})   
}
if(!req.body.Seat_price){
    return res.status(400).send({"Message":"Plese Enter the  per seat price ! "})   
}
if(!req.body.Source){
    return res.status(400).send({"Message":"Plese Enter the Source ! "})   
}
if(!req.body.Source_time){
    return res.status(400).send({"Message":"Plese Enter the  Source time ! "})   
}
if(!req.body.Destination){
  return  res.status(400).send({"Message":"Plese Enter the Destination  ! "})   
}
if(!req.body.Destination_time){
   return res.status(400).send({"Message":"Plese Enter the Destination time !"})   
}
if(!req.body.Bus_type){
   return res.status(400).send({"Message":"Plese Enter the Bus type ! "})   
}
if(!req.body. Bus_Class){
   return res.status(400).send({"Message":"Plese Select the Bus Class ! "})   
}
if(!req.body.Timing){
   return res.status(400).send({"Message":"Plese Select the Bus timing ! "})   
}
if(!req.body. Food_Facility){
   return res.status(400).send({"Message":"Plese Select the Food Facility ! "})   
}

const busdata=await add_bus.findOne({Bus_number:busnumber})
if(busdata){
   return res.status(400).send({"Message":"Bus number already exist !"})
}
else{
    next()
}

}

catch(error){
    res.status(400).send({"Message":"Something went wrong !"})
}
}