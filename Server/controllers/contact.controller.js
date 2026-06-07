import { contact_us } from "../models/contact.module.js";

export const contact = async (req, res) => {
    const request = req.body
    const contact_obj = {
        name: request.name,
        email: request.email,
       contact_number: request.contact_number,
        message: request.message,
        Bus_number:request.Bus_number
    }

    try {
        const contact_create = await contact_us.create(contact_obj)
        res.status(201).send(contact_create)
    }
catch(error){
    console.log('Error occured ',error);
    
    res.status(501).send({
        message:'Error while sending the message !'
    })
}

}