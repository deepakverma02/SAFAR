import { add_bus } from "../models/addbus.models.js";

export const ModifyBus = async (req, res) => {

    const add_bus_obj = {
        Bus_number: req.body.Bus_number,
        Bus_name: req.body.Bus_name,
        Number_seat: req.body.Number_seat,
        Seat_price: req.body.Seat_price,
        Source: req.body.Source,
        Source_time: req.body.Source_time,
        Destination: req.body.Destination,
        Destination_time: req.body.Destination_time,
        Bus_type: req.body.Bus_type,
        Food_Facility:req.body.Food_Facility,
        Timing:req.body.Timing,
        Bus_Class:req.body.Bus_Class
    };

    try {
        const filter = { Bus_number: add_bus_obj.Bus_number };

        // Directly spread the fields of add_bus_obj into the $set operator
        const update = { $set: { ...add_bus_obj } };

        const data = await add_bus.updateOne(filter, update);

        if (data.modifiedCount > 0) {
            res.status(200).send({ "Message": "Bus details updated successfully.", data });
        } else {
            res.status(404).send({ "Message": "Bus not found or no changes made." });
        }
    } catch (err) {
        console.error("Error while updating data:", err);
        res.status(500).send({
            "Message": "Error while updating the data!",
            "Error": err.message || "Unknown error occurred",
            "Details": err.stack || "No stack available"
        });
    }
};
