import { add_bus } from "../models/addbus.models.js"

export const add_bus_controller = async (req, res) => {
    const request = req.body
    const add_bus_obj = {
        Bus_number: request.Bus_number,
        Bus_name: request.Bus_name,
        Number_seat: request.Number_seat,
        Seat_price: request.Seat_price,
        Source: request.Source,
        Source_time: request.Source_time,
        Destination: request.Destination,
        Destination_time: request.Destination_time,
        Bus_type: request.Bus_type,
        Food_Facility:request.Food_Facility,
        Timing:request.Timing,
        Bus_Class:request.Bus_Class
    }


    try {
        const add_bus_create = await add_bus.create(add_bus_obj)
        res.status(201).send(add_bus_create)
    }
    catch (error) {
        console.log('Error occured ', error);

        res.status(501).send({
            message: 'Error occur while creating the new bus !'
        })
    }

}