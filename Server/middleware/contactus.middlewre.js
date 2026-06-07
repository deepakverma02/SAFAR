import { add_bus } from "../models/addbus.models.js";

export const Contact_us = async(req, res, next) => {
    try{
    const busnumber=req.body.Bus_number;
    const busnumberverify=await add_bus.findOne({Bus_number:busnumber})
    if(busnumberverify){
        next()
    }
    else{
        res.status(400).send({"Message":"Bus number not found !"})
    }
    }

    catch(error){
        res.status(400).send({"Message":"Error while fatching the data !"})
    }
}